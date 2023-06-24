import { isArray, isString } from 'lodash-es'
import { type WretchError } from 'wretch'

import { isRecord } from '@/utils/is-record'

export const extractClientError = (error: WretchError): string => {
  if (isRecord(error.json)) {
    const { message } = error.json

    if (isString(message)) {
      return message
    }

    if (isArray(message)) {
      return message.join('; ')
    }
  }

  return error.message
}
