import { Metadata } from 'next'
import { getBaseUrl } from '../lib/utils/urls'
import { clientEnvVars } from './clientEnvVars'

export const BASE_DATA_URL = clientEnvVars.NEXT_PUBLIC_APP_DATA_URL
export const BASE_ASSETS_URL = clientEnvVars.NEXT_PUBLIC_APP_ASSETS_URL

const config = {
  version: '5.0.0',
  texts: {
    siteName: 'SuperEffective',
    standaloneTitle: 'SuperEffective',
    defaultMetaTitle: 'SuperEffective - Your Pokémon Gaming Companion',
    defaultMetaDescription:
      'Supereffective, Pokémon fan website with multiple tools to assist you ' + 'in your journey as a trainer.',
  },
  links: {
    twitter: 'https://mobile.twitter.com/supereffectiv',
    patreon: 'https://www.patreon.com/supereffective',
    github_author: 'https://github.com/itsjavi',
    github_web: 'https://github.com/itsjavi/supereffective',
    github_sdk: 'https://github.com/itsjavi/supereffective-sdk',
    github_media: 'https://github.com/itsjavi/supereffective-media',
    issue_report: 'https://github.com/itsjavi/supereffective/issues',
    roadmap: 'https://github.com/users/itsjavi/projects/9',
    discord: 'https://discord.gg/3fRXQFtrkN',
    paypal_donate: 'https://www.paypal.me/itsjavidotcom/10',
  },
  apis: {
    patreon: {
      oauthRedirectUrl: `${getBaseUrl()}/api/callbacks/patreon`,
      webhookCallbackUrl: `${getBaseUrl()}/api/webhooks/patreon`,
    },
  },
  static: {
    dataUrl: BASE_DATA_URL,
    imagesUrl: `${BASE_ASSETS_URL}/images`,
    versions: {
      images: {
        stable: '20230809-01',
        newest: '20230924-01',
      },
    },
  },
  baseMetadata: {} as Metadata,
}

export function getPokeImgVersion(nid: string): string {
  if (nid.includes('paldea') || nid.includes('bloodmoon')) {
    return config.static.versions.images.newest
  }

  const dexNum = parseInt(nid.split('-')[0].replace(/^0+/, ''))

  if (dexNum > 1010) {
    return config.static.versions.images.newest
  }

  return config.static.versions.images.stable
}

config.baseMetadata = {
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
  themeColor: '#52CBE3',
  viewport: {
    // 'width=device-width, initial-scale=1, viewport-fit=cover',
    width: 'device-width',
    initialScale: 1,
    minimumScale: 1,
    maximumScale: 1,
    viewportFit: 'cover',
  },
}

export default config
