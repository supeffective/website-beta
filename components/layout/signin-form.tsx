import { Button } from '../ui/button'

export function SignInForm() {
  return (
    <div className="flex flex-col gap-2">
      <Button asChild className="btn btn-default">
        <a href="/auth/github/authorize">Sign in with Github</a>
      </Button>
      <Button asChild className="btn btn-secondary">
        <a href="/auth/patreon/authorize">Sign in with Patreon</a>
      </Button>
      <Button asChild className="btn btn-tertiary">
        <a href="/auth/discord/authorize">Sign in with Discord</a>
      </Button>
    </div>
  )
}
