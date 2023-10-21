import { Metadata } from 'next'
import config from './general'
import splashScreenConfig from './splash-screen'

const baseMetadata: Metadata = {
  applicationName: config.texts.standaloneTitle,
  description: config.texts.defaultMetaDescription,
  title: {
    template: '%s / ' + config.texts.siteName,
    absolute: config.texts.defaultMetaTitle,
    default: config.texts.siteName,
  },
  manifest: '/manifest.json',
  themeColor: config.colors.primary,
  viewport: {
    // 'width=device-width, initial-scale=1, viewport-fit=cover',
    width: 'device-width',
    height: 'device-height',
    initialScale: 1,
    minimumScale: 1,
    maximumScale: 1,
    viewportFit: 'cover',
  },
  appleWebApp: {
    title: config.texts.standaloneTitle,
    statusBarStyle: 'black-translucent',
    capable: true,
    startupImage: splashScreenConfig,
  },
  // icons: [
  //   {
  //     url: '/pwa-assets/favicon-196.png',
  //     rel: 'icon',
  //     type: 'image/png',
  //     sizes: '196x196',
  //   },
  //   {
  //     rel: 'apple-touch-icon',
  //     url: '/pwa-assets/apple-touch-icon-180.png',
  //   },
  // ],
}

export default baseMetadata
