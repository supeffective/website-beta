export function jsonStringifyRecords(records: Array<any>): string {
  return `[\n` + records.map((row) => '  ' + JSON.stringify(row)).join(',\n') + `\n]\n`
}

export function jsonParseCsvArray<T = any>(data: Array<Array<any>>): Array<T> {
  const [columns, ...rest] = data
  const rows: Array<T> = rest.map((row) => {
    const entries: any[] = []
    columns.forEach((col, i) => {
      entries.push([col, row[i]])
    })

    return Object.fromEntries(entries) as T
  })

  return rows
}
