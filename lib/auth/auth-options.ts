import { envVars } from '@/config/env-server'
import { patreonCampaign } from '@/config/patreon'
import { DrizzleAdapter } from '@auth/drizzle-adapter'
import { NextAuthOptions } from 'next-auth'
import GithubProvider from 'next-auth/providers/github'
import PatreonProvider from 'next-auth/providers/patreon'
import db from '../db/client'
import { findHighestPatreonTier } from '../patreon/utils'

// https://medium.com/@rohitkumarkhatri/next-auth-in-app-router-of-next-js-7df037f7a2ad
export const authOptions: NextAuthOptions = {
  // Secret for Next-auth, without this JWT encryption/decryption won't work
  secret: envVars.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    session: async ({ session, token }) => {
      if (!session.user) {
        return session
      }
      session.user.provider = token?.provider as string
      session.user.tier = token?.tier as string
      return session
    },
    jwt: async (params) => {
      const isLogin = params.trigger === 'signIn' || params.trigger === 'signUp'
      const { token, account, profile } = params
      if (isLogin && account) {
        token.provider = account.provider

        if (token.provider === 'patreon' && profile) {
          // TODO: save tier in db after signin if its different (but needs sync when pledges change)
          const highestTier = findHighestPatreonTier(profile as any)
          token.tier = highestTier.rewardId
        } else {
          // if login with other providers, set tier to 'everyone'
          token.tier = patreonCampaign.tierIds.none
        }
      }
      // console.log('jwt callback', params)
      return token
    },
  },

  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: envVars.GITHUB_APP_CLIENT_ID,
      clientSecret: envVars.GITHUB_APP_CLIENT_SECRET,
    }),
    PatreonProvider({
      clientId: envVars.PATREON_APP_CLIENT_ID,
      clientSecret: envVars.PATREON_APP_CLIENT_SECRET,
      token: 'https://www.patreon.com/api/oauth2/token',
      userinfo: 'https://www.patreon.com/api/oauth2/api/current_user',
      authorization: {
        url: 'https://www.patreon.com/oauth2/authorize?response_type=code',
        params: { scope: 'identity identity[email] identity.memberships', grant_type: 'authorization_code' },
      },
    }),
  ],

  adapter: {
    ...DrizzleAdapter(db),
  },

  debug: false, // envVars.APP_ENV === 'development',
}
