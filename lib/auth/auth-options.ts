import { envVars } from '@/config/env-server'
import { DrizzleAdapter } from '@auth/drizzle-adapter'
import { NextAuthOptions } from 'next-auth'
import GithubProvider from 'next-auth/providers/github'
import PatreonProvider from 'next-auth/providers/patreon'
import db from '../db/client'

// https://medium.com/@rohitkumarkhatri/next-auth-in-app-router-of-next-js-7df037f7a2ad
export const authOptions: NextAuthOptions = {
  // Secret for Next-auth, without this JWT encryption/decryption won't work
  secret: envVars.NEXTAUTH_SECRET,
  callbacks: {
    // session: async ({ session, user }) => {
    //   session.user = user
    //   return session
    // },
    // jwt: async ({ token, user, account, profile }) => {
    //   if (user) {
    //     token = { id: user.id, provider: account?.provider, accountId: account?.id }
    //   }
    //   return token
    // },
  },

  // Configure one or more authentication providers
  providers: [
    {
      ...GithubProvider({
        clientId: envVars.GITHUB_APP_CLIENT_ID,
        clientSecret: envVars.GITHUB_APP_CLIENT_SECRET,
      }),
      profile: (profile) => {
        return {
          id: profile.id.toString(),
          name: profile.name ?? profile.login,
          email: profile.email,
          image: profile.avatar_url,
          provider: 'github',
        }
      },
    },
    {
      ...PatreonProvider({
        clientId: envVars.PATREON_APP_CLIENT_ID,
        clientSecret: envVars.PATREON_APP_CLIENT_SECRET,
      }),
      version: '2.0',
      token: 'https://www.patreon.com/api/oauth2/token',
      userinfo: 'https://www.patreon.com/api/oauth2/api/current_user',
      authorization: {
        url: 'https://www.patreon.com/oauth2/authorize?response_type=code',
        params: { scope: 'identity identity[email] identity.memberships', grant_type: 'authorization_code' },
      },
      profile: (profile) => {
        return {
          id: profile.data.id,
          name: profile.data.attributes.full_name,
          email: profile.data.attributes.email,
          image: profile.data.attributes.image_url,
          provider: 'patreon',
          attributes: profile.data.attributes,
        }
      },
    },
  ],

  adapter: DrizzleAdapter(db),
}
