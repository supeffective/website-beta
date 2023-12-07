export class BaseAuthError extends Error {}

export class InvalidOAuthProviderError extends BaseAuthError {
  constructor(provider: string) {
    super(`Invalid OAuth provider: ${provider}`)
  }
}
