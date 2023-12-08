import os from 'node:os'

function padCap(num: string, size: number) {
  return ('000000000' + num).slice(-size)
}

export function getMachineFootprintFor(pid: number, hostname: string, padding = 2) {
  const pidStr = padCap(pid.toString(36), padding)
  const hostId = padCap(
    hostname
      .split('')
      .reduce((prev, char) => +prev + char.charCodeAt(0), +hostname.length + 36)
      .toString(36),
    padding,
  )
  return pidStr + hostId
}

export function getMachineFootprint(padding = 2) {
  return getMachineFootprintFor(process.pid, os.hostname(), padding)
}
