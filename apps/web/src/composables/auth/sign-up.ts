import { useMutation } from '@vue/apollo-composable'
import { gql } from 'graphql-tag'

import { Token } from '@/stores/auth'
import { extractErrorMessage } from '@/utils/graphql/error'

export const useSignUp = (
  onDone: (data: Token) => void,
  onError: (message: string) => void,
) => {
  const {
    mutate: signUp,
    onError: onSignUpError,
    onDone: onSignUpDone,
  } = useMutation<{
    signUp: Token
  }>(
    gql`
      mutation SignUp($email: String!, $password: String!) {
        signUp(input: { email: $email, password: $password }) {
          accessToken
          refreshToken
        }
      }
    `,
  )

  onSignUpError((apolloError) => {
    onError(extractErrorMessage(apolloError))
  })

  onSignUpDone(({ errors, data }) => {
    if (errors?.length && !data) {
      onError(errors[0].message)
      return
    }

    if (data) {
      onDone(data.signUp)
    }
  })

  return { signUp }
}
