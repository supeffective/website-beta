import { SignOutForm } from '@/components/layout/signout-form'
import DialogInterceptedRoute from '@/components/ui/dialog-intercepted-route'
export default async function Page() {
  const header = <div>Sign Out</div>
  const footer = null

  return (
    <DialogInterceptedRoute header={header} footer={footer} className="max-w-auto md:max-w-[60vw]">
      <SignOutForm />
    </DialogInterceptedRoute>
  )
}
