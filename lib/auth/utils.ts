import { type OAuth2ProviderAuth } from '@lucia-auth/oauth'
import { DiscordUserAuth, GithubUserAuth, PatreonUserAuth } from '@lucia-auth/oauth/providers'
import { authProviders } from './lucia'
import { OAuthProviderId } from './types'

type ProviderData =
  | {
      provider: OAuth2ProviderAuth<GithubUserAuth<any>>
      providerId: OAuthProviderId.GITHUB
      cookieName: string
    }
  | {
      provider: OAuth2ProviderAuth<PatreonUserAuth<any>>
      providerId: OAuthProviderId.PATREON
      cookieName: string
    }
  | {
      provider: OAuth2ProviderAuth<DiscordUserAuth<any>>
      providerId: OAuthProviderId.DISCORD
      cookieName: string
    }

export function resolveOAuthProvider<C extends ProviderData['providerId']>(
  providerId: C,
): Extract<ProviderData, { providerId: C }> | undefined {
  const provider = authProviders[providerId]

  if (!provider) {
    return undefined
  }

  return {
    provider: provider as OAuth2ProviderAuth<any>,
    providerId,
    cookieName: `${providerId}_oauth_state`,
  } as Extract<ProviderData, { providerId: C }>
}
