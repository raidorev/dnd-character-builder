import { isObject } from 'lodash-es'

export const isRecord = (value: unknown): value is Record<string, unknown> =>
  isObject(value)
