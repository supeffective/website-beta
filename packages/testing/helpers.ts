export function waitForAllPromises() {
  return new Promise(process.nextTick)
}

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export type Mocked<T> = T extends (...args: any) => any
  ? jest.Mock<T>
  : {
      // biome-ignore lint/suspicious/noExplicitAny: <explanation>
      [P in keyof T]: T[P] extends (...args: any) => any ? jest.Mock<T[P]> : T[P]
    }

export function mocked<T>(item: T | Partial<T>): Mocked<T> & typeof item {
  return item as Mocked<T> & typeof item
}
