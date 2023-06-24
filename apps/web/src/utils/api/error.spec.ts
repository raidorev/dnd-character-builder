import { describe, it, expect } from 'vitest'
import { WretchError } from 'wretch/resolver'

import { extractClientError } from './error'

describe('error', () => {
  describe('extractClientError', () => {
    it('should return the error message if it is a string', () => {
      const error = {
        json: {
          message: 'error message',
        },
      } as WretchError
      expect(extractClientError(error)).toBe('error message')
    })

    it('should return the error message if it is a array', () => {
      const error = {
        json: {
          message: ['error message', 'another error message'],
        },
      } as WretchError
      expect(extractClientError(error)).toBe(
        'error message; another error message',
      )
    })

    it('should return the error message if there is no json', () => {
      const error = {
        message: 'error message',
      } as WretchError
      expect(extractClientError(error)).toBe('error message')
    })
  })
})
