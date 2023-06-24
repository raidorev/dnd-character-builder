import { useLocalStorage } from '@vueuse/core'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

import { useSignIn } from '@/composables/auth/sign-in'
import { useSignUp } from '@/composables/auth/sign-up'
import { useError } from '@/composables/error'

export interface JwtTokens {
  accessToken: string
  refreshToken: string
}

export const useAuth = defineStore('auth', () => {
  const error = useError()

  const isLoading = ref(false)

  const accessToken = useLocalStorage('accessToken', '')
  const refreshToken = useLocalStorage('refreshToken', '')

  const isSignedIn = computed(() => !!accessToken.value)

  const { signIn: _singIn, abort: abortSignIn } = useSignIn(
    updateTokens,
    onError,
  )
  const { signUp: _signUp, abort: abortSignUp } = useSignUp(
    updateTokens,
    onError,
  )

  const signUp = (
    ...parameters: Parameters<typeof _signUp>
  ): ReturnType<typeof _signUp> => {
    isLoading.value = true
    error.clearError()

    return _signUp(...parameters)
  }

  const signIn = (
    ...parameters: Parameters<typeof _singIn>
  ): ReturnType<typeof _singIn> => {
    isLoading.value = true
    error.clearError()

    return _singIn(...parameters)
  }

  const signOut = () => {
    accessToken.value = ''
    refreshToken.value = ''
  }

  const reset = () => {
    isLoading.value = false
    error.clearError()
  }

  function updateTokens(data: JwtTokens) {
    reset()

    accessToken.value = data.accessToken
    refreshToken.value = data.refreshToken
  }

  function onError(message: string) {
    isLoading.value = false
    error.message.value = message
  }

  return {
    accessToken,
    refreshToken,
    isLoading,
    isSignedIn,
    signUp,
    abortSignUp,
    signIn,
    abortSignIn,
    signOut,
    reset,
    error,
  }
})
