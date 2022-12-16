import {
  ApolloClient,
  ApolloLink,
  concat,
  HttpLink,
  InMemoryCache,
} from '@apollo/client/core'
import fetch from 'cross-fetch'

import { useAuth } from '@/stores/auth'

const httpLink = new HttpLink({ uri: 'http://localhost:3000/graphql', fetch })
const authMiddleware = new ApolloLink((operation, forward) => {
  const auth = useAuth()
  operation.setContext({
    headers: {
      authorization: auth.accessToken ? `Bearer ${auth.accessToken}` : '',
    },
  })

  return forward(operation)
})

const cache = new InMemoryCache()

export const apolloClient = new ApolloClient({
  link: concat(authMiddleware, httpLink),
  cache,
  defaultOptions: {
    query: {
      errorPolicy: import.meta.env.DEV ? 'all' : 'none',
    },
    mutate: {
      errorPolicy: import.meta.env.DEV ? 'all' : 'none',
    },
  },
})
