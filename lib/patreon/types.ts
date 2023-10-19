export type PatreonCampaign = {
  campaignId: string
  creatorId: string
  tierIds: {
    none: '-1' // non-patrons
    free: `${number}` // former patrons
    basic: `${number}`
    advanced: `${number}`
  }
}

export type PatreonTier = {
  rewardId: string
  name: string
  description: string
  tierWeight: number
  perks: {
    dexLimit: number
    boxLimit?: number
    allowedDexes?: string[] | undefined
  }
}

export type PatreonTierTable = {
  [tierId: string]: PatreonTier
}
