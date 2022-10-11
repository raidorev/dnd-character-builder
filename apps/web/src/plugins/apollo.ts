import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
} from '@apollo/client/core'

const httpLink = createHttpLink({
  uri: 'http://localhost:3000/graphql',
})

const cache = new InMemoryCache()

export const apolloClient = new ApolloClient({
  link: httpLink,
  cache,
  defaultOptions: {
    query: {
      errorPolicy: 'all',
    },
    mutate: {
      errorPolicy: 'all',
    },
  },
})
