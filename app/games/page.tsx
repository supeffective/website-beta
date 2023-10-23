import { GameList } from '@/components/pkm/lists/game-list'
import { Heading } from '@/components/typography/heading'
import appConfig from '@/config/general'
import { getAllGames } from '@supeffective/dataset'

export default async function Page() {
  const records = await getAllGames(appConfig.static.dataUrl)
  const reversedGameSets = records.filter((p) => p.type === 'set' || (p.type === 'game' && !p.gameSet)).reverse()
  const gameVersions = reversedGameSets.flatMap((group) => {
    if (group.type === 'game') {
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
