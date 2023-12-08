import { patreonCampaign, patreonTiers } from '@/config/patreon'
import { PatreonProfileResponse } from './oauth-types'
import { PatreonTier } from './types'

export function findHighestPatreonTier(profile?: PatreonProfileResponse): PatreonTier {
  if (!profile) {
    return patreonTiers[patreonCampaign.tierIds.none]
  }

  const included = profile.included ?? []

  const tier: PatreonTier | undefined = included
    .filter((item) => {
      return (
        item.type === 'pledge' &&
        // item.relationships?.campaign?.data.id === patreonCampaign.campaignId &&
        item.relationships?.creator?.data.id === patreonCampaign.creatorId &&
        item.relationships?.reward?.data.id !== undefined &&
        patreonTiers[item.relationships.reward.data.id] !== undefined
      )
    })
    .map((item) => {
      const tierId = item.relationships?.reward?.data.id as string
      return patreonTiers[tierId]
    })
    .sort((a, b) => a.tierWeight - b.tierWeight) // get the highest tier
    .at(0)

  if (!tier) {
    return patreonTiers[patreonCampaign.tierIds.none]
  }

  return tier
}
