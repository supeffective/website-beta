import { getBaseUrl } from '../lib/utils/urls'
import { clientEnvVars } from './env/client-vars'

const appConfig = {
  version: '5.0.0',
  colors: {
    primary: '#906bc7',
    purple: '#906bc7',
    cyan: '#52CBE3',
    gold: '#FFB804',
  },
  texts: {
    siteName: 'SuperEffective',
    standaloneTitle: 'SuperEffective',
    defaultMetaTitle: 'The most complete Pokédex and Living Dex tracker / SuperEffective',
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
    dataUrl: clientEnvVars.NEXT_PUBLIC_PKM_DATA_URL,
    assetsUrl: `${clientEnvVars.NEXT_PUBLIC_PKM_ASSETS_URL}`,
    imagesUrl: `${clientEnvVars.NEXT_PUBLIC_PKM_ASSETS_URL}/images`,
    versions: {
      images: {
        stable: '20230809-01',
        newest: '20230924-01',
      },
    },
  },
}

export default appConfig
