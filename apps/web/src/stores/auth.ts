import { provideApolloClient } from '@vue/apollo-composable'
import { useLocalStorage } from '@vueuse/core'
import { defineStore } from 'pinia'
import { computed } from 'vue'

import { useSignIn } from '@/composables/auth/sign-in'
import { useSignUp } from '@/composables/auth/sign-up'
import { useError } from '@/composables/error'
import { apolloClient } from '@/plugins/apollo'

export interface Token {
  accessToken: string
  refreshToken: string
}

export const useAuth = defineStore('auth', () => {
  provideApolloClient(apolloClient)

  const error = useError()

  const accessToken = useLocalStorage('accessToken', '')
  const refreshToken = useLocalStorage('refreshToken', '')

  const isSignedIn = computed(() => !!accessToken.value)

  const { signIn } = useSignIn(updateTokens, onError)
  const { signUp } = useSignUp(updateTokens, onError)
  const signOut = () => {
    accessToken.value = ''
    refreshToken.value = ''
  }

  function updateTokens(data: Token) {
    error.clearError()

    accessToken.value = data.accessToken
    refreshToken.value = data.refreshToken
  }

  function onError(message: string) {
    error.message.value = message
  }

  return {
    accessToken,
    refreshToken,
    isSignedIn,
    signUp,
    signIn,
    signOut,
    error,
  }
})
