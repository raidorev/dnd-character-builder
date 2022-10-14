import { createPinia, setActivePinia } from 'pinia'
import { beforeEach, describe, expect, it } from 'vitest'

import { useAuth } from './auth'

describe('auth', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('should not be logged in by default', () => {
    const auth = useAuth()

    expect(auth.isSignedIn).toBe(false)
  })
})
