import { SignInForm } from '@/components/layout/signin-form'
import DialogInterceptedRoute from '@/components/ui/dialog-intercepted-route'
import { PageProps } from '@/lib/types'
export default async function Page({ searchParams }: PageProps) {
  const header = <div>Sign In</div>
  const footer = null

  return (
    <DialogInterceptedRoute header={header} footer={footer} className="max-w-auto md:max-w-[60vw]">
      <SignInForm callbackUrl={searchParams.callbackUrl} />
    </DialogInterceptedRoute>
  )
}
