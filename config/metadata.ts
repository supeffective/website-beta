import { Metadata } from 'next'
import config from './config'

const baseMetadata: Metadata = {
  title: {
    template: '%s | ' + config.texts.siteName,
    absolute: config.texts.defaultMetaTitle,
    default: config.texts.siteName,
  },
  description: config.texts.defaultMetaDescription,
  applicationName: config.texts.standaloneTitle,
  appleWebApp: {
    title: config.texts.standaloneTitle,
    statusBarStyle: 'black-translucent',
    capable: true,
  },
  manifest: '/manifest.json',
  themeColor: config.themeColor,
  viewport: {
    // 'width=device-width, initial-scale=1, viewport-fit=cover',
    width: 'device-width',
    initialScale: 1,
    minimumScale: 1,
    maximumScale: 1,
    viewportFit: 'cover',
  },
}

export default baseMetadata
