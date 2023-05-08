/* eslint-disable */

export function serialize(obj: any): string {
  return Object.keys(obj)
    .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`)
    .join('&')
}

export function copy(toBeCloned: any): any {
  return toBeCloned ? JSON.parse(JSON.stringify(toBeCloned)) : toBeCloned
}

export const isUndef = (value: any): boolean => value === undefined || value === null
