import type { PatreonCampaign, PatreonTierTable } from '@/lib/subscribers/patreon/types'

export const patreonCampaign: PatreonCampaign = {
  campaignId: '9272063',
  creatorId: '79731045',
  tierIds: {
    // aka. reward Ids
    none: '-1', // non-patrons
    free: '10635626', // former patrons
    basic: '9094266',
    advanced: '9094285',
  },
}

export const patreonTiers: PatreonTierTable = {
  [patreonCampaign.tierIds.none]: {
    rewardId: patreonCampaign.tierIds.none,
    name: 'General Access',
    slug: 'none',
    description: 'Access to the default public tier.',
    tierWeight: -1,
    perks: {
      dexLimit: 2,
      boxLimit: 32,
      allowedDexes: ['home', 'go', 'sv-s', 'sv-v'],
    },
  },
  [patreonCampaign.tierIds.free]: {
    rewardId: patreonCampaign.tierIds.free,
    name: 'Former Patron',
    slug: 'free',
    description: 'Access to the special free tier.',
    tierWeight: 0,
    perks: {
      dexLimit: 3,
      boxLimit: 40,
      allowedDexes: undefined,
    },
  },
  [patreonCampaign.tierIds.basic]: {
    rewardId: patreonCampaign.tierIds.basic,
    name: 'Basic',
    slug: 'basic',
    description: 'Access to the basic tier.',
    tierWeight: 1,
    perks: {
      dexLimit: 25,
      boxLimit: 100,
      allowedDexes: undefined,
    },
  },
  [patreonCampaign.tierIds.advanced]: {
    rewardId: patreonCampaign.tierIds.advanced,
    name: 'Advanced',
    slug: 'advanced',
    description: 'Access to the advanced tier.',
    tierWeight: 2,
    perks: {
      dexLimit: 50,
      boxLimit: 200,
      allowedDexes: undefined,
    },
  },
}
