import { api } from '@/plugins/api'
import { JwtTokens } from '@/stores/auth'
import { extractClientError } from '@/utils/api/error'

export const useSignIn = (
  onDone: (tokens: JwtTokens) => void,
  onError: (message: string) => void,
) => {
  const controller = new AbortController()

  const signIn = async (credentials: { email: string; password: string }) => {
    try {
      const tokens = await api
        .signal(controller)
        .url('/auth/sign-in')
        .post(credentials)
        .error(400, (error) => {
          onError(extractClientError(error))
        })
        .error(422, (error) => {
          onError(extractClientError(error))
        })
        .json<JwtTokens | undefined>()

      if (!tokens) {
        return
      }

      onDone(tokens)
    } catch {
      onError('Unknown error')
    }
  }

  return { signIn, abort: () => controller.abort() }
}
