'use client'

import { useRouter } from 'next/navigation'
import { ApiFormProps } from './types'

function ApiForm({ children, method = 'post', action, ...rest }: ApiFormProps) {
  const router = useRouter()
  return (
    <form
      {...rest}
      action={action}
      method={method}
      onSubmit={async (e) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        const response = await fetch(action, {
          method: method.toUpperCase(),
          body: formData,
          redirect: 'manual',
        })

        if (response.status === 0) {
          // redirected
          // when using `redirect: "manual"`, response status 0 is returned
          return router.refresh()
        }
      }}
    >
      {children}
    </form>
  )
}

export default ApiForm
