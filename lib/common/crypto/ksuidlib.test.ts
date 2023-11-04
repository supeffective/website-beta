import { SimpleKSortableIDGenerator } from './ksuidlib'

const simpleGenerator = new SimpleKSortableIDGenerator()

export function generateUid(prefix: string = 'pk-', separator = ''): string {
  return simpleGenerator.nextId(prefix, separator)
}

function testSamples(samples = 100) {
  const ids = [...Array.from({ length: samples }, () => generateUid())]

  const areSequential = ids.every((id, i) => {
    if (i === 0) return true
    const isGreater = id > ids[i - 1]
    if (!isGreater) {
      console.error(`ID is not greater: '${id}' > '${ids[i - 1]}'`)
    }
    return isGreater
  })

  const areUnique = new Set(ids).size === ids.length
  const areSameLength = ids.every((id) => id.length === ids[0].length)

  if (!areUnique) {
    console.error('IDs NOT UNIQUE!!!')
  }
  if (!areSequential) {
    console.error('IDs NOT SEQUENTIAL / NOT SORTABLE!!!')
  }
  if (!areSameLength) {
    console.error('IDs NOT SAME LENGTH!!!')
  }

  return ids
}

describe('SimpleKSortableIDGenerator', () => {
  const consoleErrorSpy = jest.spyOn(console, 'error')

  it('generates 1_000 sequential IDs without errors', () => {
    console.log('ID examples: ', testSamples(1_000).slice(0, 10))
    expect(consoleErrorSpy).not.toHaveBeenCalled()
  })

  it('generates 10_000 sequential IDs without errors', () => {
    const ids = testSamples(10_000)
    expect(new Set(ids).size).toBe(ids.length)
    expect(consoleErrorSpy).not.toHaveBeenCalled()
  })

  it('generates 1_000_000 sequential IDs without errors', () => {
    const ids = testSamples(1_000_000)
    expect(new Set(ids).size).toBe(ids.length)
    expect(consoleErrorSpy).not.toHaveBeenCalled()
  })

  it.skip('generates 10_000_000 sequential IDs without errors', () => {
    const ids = testSamples(10_000_000)
    expect(new Set(ids).size).toBe(ids.length)
    expect(consoleErrorSpy).not.toHaveBeenCalled()
  })
})
