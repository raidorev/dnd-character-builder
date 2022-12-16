import { useMutation } from '@vue/apollo-composable'
import { gql } from 'graphql-tag'

import { Token } from '@/stores/auth'
import { extractErrorMessage } from '@/utils/graphql/error'

export const useSignIn = (
  onDone: (data: Token) => void,
  onError: (message: string) => void,
) => {
  const {
    mutate: signIn,
    onDone: onSignInDone,
    onError: onSignInError,
  } = useMutation<{
    signIn: Token
  }>(
    gql`
      mutation SignIn($email: String!, $password: String!) {
        signIn(input: { email: $email, password: $password }) {
          accessToken
          refreshToken
        }
      }
    `,
  )

  onSignInError((apolloError) => {
    onError(extractErrorMessage(apolloError))
  })

  onSignInDone(({ errors, data }) => {
    if (errors?.length && !data) {
      onError(errors[0].message)
      return
    }

    if (data) {
      onDone(data.signIn)
    }
  })

  return { signIn }
}
