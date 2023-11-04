export function jsonStringifyCompact(data: Array<any>): string {
  return `[\n` + data.map((row) => '  ' + JSON.stringify(row)).join(',\n') + `\n]\n`
}

export function csvJsonToCollection<T = any>(data: Array<Array<any>>): Array<T> {
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
