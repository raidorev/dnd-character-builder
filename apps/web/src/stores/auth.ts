import { provideApolloClient } from '@vue/apollo-composable'
import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'

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

  // TODO
  const isSignedIn = ref(false)

  const tokens = reactive({
    accessToken: '',
    refreshToken: '',
  })

  const { signIn } = useSignIn(
    (data) => {
      error.clearError()

      tokens.accessToken = data.accessToken
      tokens.refreshToken = data.refreshToken
    },
    (message) => {
      error.message.value = message
    },
  )

  const { signUp } = useSignUp(
    (data) => {
      error.clearError()

      tokens.accessToken = data.accessToken
      tokens.refreshToken = data.refreshToken
    },
    (message) => {
      error.message.value = message
    },
  )

  return { isSignedIn, signUp, signIn, error, tokens }
})
