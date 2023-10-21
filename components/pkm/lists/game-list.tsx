import { Game } from '@supeffective/dataset'
import Link from 'next/link'
import { GameImg } from '../images'

type GameListProps = {
  records: Game[]
}

type GameListItemProps = {
  record: Game
}

export function GameListItem({ record }: GameListItemProps) {
  return (
    <Link
      className="gb-cartridge content-visibility-auto flex select-none flex-col gap-2 rounded-2xl border-[3px] border-slate-900 bg-black/50 px-2 pb-5 pt-2 text-center no-underline shadow-md duration-150 hover:z-10 hover:scale-110 active:scale-100"
      href={`/games/${record.id}`}
      title={`Pokémon ${record.name}`}
      // scroll={false}
    >
      <GameImg
        className="pointer-events-none block aspect-square w-full"
        imgClassName="rounded-md border-2  border-slate-900 border-t-4 border-l-4 block w-full"
        title={`Pokémon ${record.name}`}
        assetId={record.id}
      />
    </Link>
  )
}

export function GameList({ records }: GameListProps) {
  return (
    <div className="grid w-full grid-cols-3 gap-4 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 2xl:grid-cols-10">
      {records.map((record) => {
        return <GameListItem key={record.id} record={record} />
      })}
    </div>
  )
}
