import { provideApolloClient, useMutation } from '@vue/apollo-composable'
import { gql } from 'graphql-tag'
import { defineStore } from 'pinia'
import { computed, reactive, ref } from 'vue'

import { apolloClient } from '@/plugins/apollo'
import { extractErrorMessage } from '@/utils/graphql/error'

export interface Token {
  accessToken: string
  refreshToken: string
}

export const useAuth = defineStore('auth', () => {
  provideApolloClient(apolloClient)

  const error = ref('')
  const hasError = computed(() => error.value !== '')
  const clearError = () => {
    error.value = ''
  }

  // TODO
  const isSignedIn = ref(false)

  const tokens = reactive({
    accessToken: '',
    refreshToken: '',
  })

  const {
    mutate: signUp,
    onError,
    onDone,
  } = useMutation<{ signUp: Token }>(gql`
    mutation SignUp($email: String!, $password: String!) {
      signUp(input: { email: $email, password: $password }) {
        accessToken
        refreshToken
      }
    }
  `)

  onError((apolloError) => {
    error.value = extractErrorMessage(apolloError)
  })

  onDone((token) => {
    clearError()
    if (token.data) {
      tokens.accessToken = token.data.signUp.accessToken
      tokens.refreshToken = token.data.signUp.refreshToken
    }
  })

  return { isSignedIn, signUp, error, hasError, clearError }
})
