import appConfig from '@/config/general'
import { GameList } from '@/features/games/components/game-list'
import { Heading } from '@/lib/components/typography/heading'
import { getAllGames } from '@supeffective/dataset'

export default async function Page() {
  const records = await getAllGames(appConfig.static.dataUrl)
  const reversedGameSets = records
    .filter((p) => p.type === 'set' || (p.type === 'game' && !p.gameSet) || p.type === 'dlc')
    .reverse()
  const gameVersions = reversedGameSets.flatMap((group) => {
    if (group.type === 'game' || group.type === 'dlc') {
      return [group]
    }

    return records.filter((p) => p.type === 'game' && p.gameSet === group.id)
  })

  return (
    <section className="w-full pb-24">
      <Heading className="text-center" level={1}>
        Games
      </Heading>
      <GameList records={gameVersions} />
    </section>
  )
}
