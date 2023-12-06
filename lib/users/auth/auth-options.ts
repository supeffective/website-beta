import { envVars } from '@/config/env/server-vars'
import db from '@/lib/db/client'
import { DrizzleAdapter } from '@auth/drizzle-adapter'
import { NextAuthOptions as NextAuthConfig } from 'next-auth'
import DiscordProvider from 'next-auth/providers/discord'
import GithubProvider from 'next-auth/providers/github'
import PatreonProvider, { type PatreonProfile } from 'next-auth/providers/patreon'

// https://medium.com/@rohitkumarkhatri/next-auth-in-app-router-of-next-js-7df037f7a2ad
export const authOptions: NextAuthConfig = {
  secret: envVars.NEXTAUTH_SECRET,
  callbacks: {
    session: async ({ session, user }) => {
      if (!session.user || !user) {
        return session
      }
      session.user.id = user.id
      return session
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
      profile(profile: PatreonProfile) {
        console.log('==-===== Patreon profile = ', profile)
        return {
          id: profile.data.id,
          name: profile.data.attributes.full_name,
          email: profile.data.attributes.email,
          image: profile.data.attributes.image_url,
        }
      },
    }),
    DiscordProvider({
      clientId: envVars.DISCORD_APP_CLIENT_ID,
      clientSecret: envVars.DISCORD_APP_CLIENT_SECRET,
      // authorization: 'https://discord.com/api/oauth2/authorize?scope=identify+email',
      // profile(profile: DiscordProfile) {
      //   console.log('==-===== Discord profile = ', profile)
      //   return {
      //     id: profile.id,
      //     name: profile.username,
      //     email: profile.email,
      //     image: profile.image_url,
      //   }
      // },
    }),
  ],

  adapter: {
    ...DrizzleAdapter(db),
  },

  // https://www.youtube.com/watch?v=g6S-XZxq9Ug
  pages: {
    signIn: '/auth/signin',
    signOut: '/auth/signout',
    error: '/auth/error', // Error code passed in query string as ?error=
    // verifyRequest: '/auth/verify-request', // (used for check email message)
  },

  debug: false, // envVars.APP_ENV === 'development',
}
