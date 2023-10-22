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
      className="content-visibility-auto flex select-none flex-col gap-2 overflow-visible rounded-2xl border-2 bg-slate-600 text-center no-underline shadow-md duration-150 hover:z-10 hover:scale-110 active:scale-100"
      href={`/games/${record.id}`}
      title={`Pokémon ${record.name}`}
      // scroll={false}
    >
      <GameImg
        className="block aspect-square w-full rounded-3xl bg-slate-700 p-2 hover:bg-slate-800"
        imgClassName="pointer-events-none block bg-black border-2 w-full rounded-xl"
        title={`Pokémon ${record.name}`}
        assetId={record.id}
      />
      {/* <span className="mb-2 flex flex-1 items-center justify-center text-center">
        <span className="inline-flex w-[80%] justify-center rounded-xl border-2 bg-black/60 p-1 px-2 text-xs text-slate-500">
          {record.name}
        </span>
      </span> */}
    </Link>
  )
}

export function GameList({ records }: GameListProps) {
  return (
    <div className="grid w-full grid-cols-3 gap-4 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 2xl:grid-cols-10">
      {records.map((record) => {
        return (
          <div key={record.id} className="flex flex-col gap-2 text-center text-sm text-black/80">
            <GameListItem record={record} />
            <span>{record.name}</span>
          </div>
        )
      })}
    </div>
  )
}
