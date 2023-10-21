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
      className="content-visibility-auto flex select-none flex-col rounded-2xl border-4 bg-slate-800 px-1 pt-4 text-center no-underline shadow-md duration-150 hover:z-10 hover:scale-110 active:scale-100"
      href={`/games/${record.id}`}
      title={`Pokémon ${record.name}`}
      // scroll={false}
    >
      <GameImg
        className="pointer-events-none block aspect-square w-full"
        imgClassName="rounded-md block border-2 bg-black w-full"
        title={`Pokémon ${record.name}`}
        assetId={record.id}
      />
      <span className="flex flex-1 items-center justify-center py-2 text-sm text-slate-500">
        <span className="block flex-1 rounded-xl bg-slate-950 p-2">{record.name}</span>
      </span>
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
