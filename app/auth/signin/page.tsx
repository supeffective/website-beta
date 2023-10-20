import { SignInForm } from '@/components/layout/signin-form'
import { PageProps } from '@/lib/types'

/**
 * The following errors are passed as error query parameters to the default or overridden sign-in page.
 *
 * [Documentation](https://next-auth.js.org/configuration/pages#sign-in-page) */
type SignInErrorTypes =
  | 'Signin'
  | 'OAuthSignin'
  | 'OAuthCallback'
  | 'OAuthCreateAccount'
  | 'EmailCreateAccount'
  | 'Callback'
  | 'OAuthAccountNotLinked'
  | 'EmailSignin'
  | 'CredentialsSignin'
  | 'SessionRequired'
  | 'default'

const errorMessages: Record<SignInErrorTypes, string> = {
  Signin: 'Try signing in with a different account.',
  OAuthSignin: 'Try signing in with a different account.',
  OAuthCallback: 'Try signing in with a different account.',
  OAuthCreateAccount: 'Try signing in with a different account.',
  EmailCreateAccount: 'Try signing in with a different account.',
  Callback: 'Try signing in with a different account.',
  OAuthAccountNotLinked: 'To confirm your identity, sign in with the same account you used originally.',
  EmailSignin: 'The e-mail could not be sent.',
  CredentialsSignin: 'Sign in failed. Check the details you provided are correct.',
  SessionRequired: 'Please sign in to access this page.',
  default: 'Unable to sign in.',
}

export default function SigninPage({ searchParams }: PageProps) {
  const errorType = searchParams.error as SignInErrorTypes | undefined
  const callbackUrl = searchParams.callbackUrl as string | undefined

  return (
    <div className="">
      <SignInForm callbackUrl={callbackUrl} />
      {errorType && (
        <div className="error">
          <p>
            {errorMessages[errorType as SignInErrorTypes] || errorMessages.default}
            {callbackUrl && (
              <>
                <br />
                <br />
                <a href={callbackUrl}>Return to application</a>
              </>
            )}
          </p>
        </div>
      )}
    </div>
  )
}
