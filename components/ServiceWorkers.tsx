'use client'

import { useEffect } from 'react'

export function ServiceWorkers(): JSX.Element {
  useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }
    if ('serviceWorker' in navigator) {
      // navigator.serviceWorker
      //   .register('./service-worker.js', { scope: './' })
      //   .then(function () {
      //     console.debug('Service Worker Registered')
      //   })
      //   .catch(function (err) {
      //     console.error('Service Worker Failed to Register', err)
      //   })
    }
  }, [])

  return <></>
}
