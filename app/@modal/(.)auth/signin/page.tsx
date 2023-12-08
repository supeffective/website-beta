import { SignInForm } from '@/features/signin/components/signin-form'
import DialogInterceptedRoute from '@/lib/components/ui/dialog-intercepted-route'
export default async function Page() {
  const header = <div>Sign In</div>
  const footer = null

  return (
    <DialogInterceptedRoute header={header} footer={footer} className="max-w-auto md:max-w-[60vw]">
      <SignInForm />
    </DialogInterceptedRoute>
  )
}
