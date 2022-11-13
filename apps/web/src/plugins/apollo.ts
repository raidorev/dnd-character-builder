import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
} from '@apollo/client/core'
import fetch from 'cross-fetch'

const httpLink = createHttpLink({
  uri: 'http://localhost:3000/graphql',
  fetch,
})

const cache = new InMemoryCache()

export const apolloClient = new ApolloClient({
  link: httpLink,
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
