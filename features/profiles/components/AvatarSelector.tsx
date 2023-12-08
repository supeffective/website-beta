import { CharacterImg } from '@/lib/components/image/asset-img'
import { getCharacterCollection } from '@/lib/dataset/queries'

export async function AvatarSelector() {
  const characters = await getCharacterCollection()

  return (
    <div className="flex max-h-36 flex-wrap gap-2 overflow-auto rounded-lg border-2 bg-neutral-200 p-2">
      {characters.map((character) => {
        return (
          <div
            key={character.id}
            className="inline-block aspect-square h-20 w-20 overflow-hidden rounded-full border-2 border-black/25 bg-neutral-800"
          >
            <CharacterImg title={character.name} assetId={character.id} />
          </div>
        )
      })}
    </div>
  )
}
