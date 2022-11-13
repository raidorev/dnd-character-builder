import { ApolloError } from '@apollo/client/errors'
import { GraphQLError } from 'graphql'
import { describe, it, expect } from 'vitest'

import { defineErrorType, ErrorType, extractErrorMessage } from './error'

describe('error', () => {
  const errors: Record<
    ErrorType,
    { error: ApolloError; expectedMessage: string }[]
  > = {
    [ErrorType.UnknownError]: [
      new ApolloError({}),
      new ApolloError({ graphQLErrors: [] }),
      new ApolloError({
        graphQLErrors: [
          new GraphQLError('Unknown error', {
            extensions: { code: 'Some wrong code' },
          }),
        ],
      }),
      new ApolloError({
        graphQLErrors: [
          new GraphQLError('Unknown error with wrong code type', {
            extensions: { code: {} },
          }),
        ],
      }),
      new ApolloError({
        graphQLErrors: [
          new GraphQLError('Unknown error with wrong number code', {
            extensions: { code: 670 },
          }),
        ],
      }),
      new ApolloError({
        graphQLErrors: [
          new GraphQLError('Unknown error with wrong number code', {
            extensions: { code: 100 },
          }),
        ],
      }),
    ].map((error) => ({ error, expectedMessage: 'Unknown error' })),

    [ErrorType.NetworkError]: [
      new ApolloError({
        networkError: new Error('Network error'),
      }),
    ].map((error) => ({ error, expectedMessage: 'Network error' })),

    [ErrorType.GraphQLError]: [
      new ApolloError({
        clientErrors: [new Error('GraphQL error')],
      }),
    ].map((error) => ({ error, expectedMessage: 'Unexpected GraphQL error' })),

    [ErrorType.ServerError]: [
      {
        error: new ApolloError({
          graphQLErrors: [
            new GraphQLError('Server error', {
              extensions: {
                code: 'INTERNAL_SERVER_ERROR',
              },
            }),
          ],
        }),
        expectedMessage: 'Server error',
      },
      {
        error: new ApolloError({
          graphQLErrors: [
            new GraphQLError('Bad gateway', {
              extensions: {
                code: 'BAD_GATEWAY',
              },
            }),
          ],
        }),
        expectedMessage: 'Bad gateway',
      },
      {
        error: new ApolloError({
          graphQLErrors: [
            new GraphQLError('Server error (500)', {
              extensions: {
                code: 500,
              },
            }),
          ],
        }),
        expectedMessage: 'Server error (500)',
      },
    ],

    [ErrorType.ClientError]: [
      {
        error: new ApolloError({
          graphQLErrors: [
            new GraphQLError('Bad Request', {
              extensions: {
                code: 'BAD_REQUEST',
                response: {
                  message: ['Error 1', 'Error 2'],
                },
              },
            }),
          ],
        }),
        expectedMessage: 'Error 1; Error 2',
      },
      {
        error: new ApolloError({
          graphQLErrors: [
            new GraphQLError('Bad Request', {
              extensions: {
                code: 'BAD_REQUEST',
                response: {
                  message: ['Provide valid email'],
                },
              },
            }),
          ],
        }),
        expectedMessage: 'Provide valid email',
      },
      {
        error: new ApolloError({
          graphQLErrors: [
            new GraphQLError('Email is already taken', {
              extensions: {
                code: 'CONFLICT',
                response: {
                  message: 'Choose another email',
                },
              },
            }),
          ],
        }),
        expectedMessage: 'Choose another email',
      },
      {
        error: new ApolloError({
          graphQLErrors: [
            new GraphQLError('Username is already taken', {
              extensions: {
                code: 409,
              },
            }),
          ],
        }),
        expectedMessage: 'Username is already taken',
      },
    ],
  }

  describe.concurrent('defineErrorType', () => {
    it('should return ErrorType.UnknownError', () => {
      for (const { error } of errors.UnknownError) {
        expect(defineErrorType(error)).toBe(ErrorType.UnknownError)
      }
    })
    it('should return ErrorType.NetworkError', () => {
      for (const { error } of errors.NetworkError) {
        expect(defineErrorType(error)).toBe(ErrorType.NetworkError)
      }
    })
    it('should return ErrorType.GraphQLError', () => {
      for (const { error } of errors.GraphQLError) {
        expect(defineErrorType(error)).toBe(ErrorType.GraphQLError)
      }
    })
    it('should return ErrorType.ServerError', () => {
      for (const { error } of errors.ServerError) {
        expect(defineErrorType(error)).toBe(ErrorType.ServerError)
      }
    })
    it('should return ErrorType.ClientError', () => {
      for (const { error } of errors.ClientError) {
        expect(defineErrorType(error)).toBe(ErrorType.ClientError)
      }
    })
  })

  describe.concurrent('extractErrorMessage', () => {
    it('should return "Unknown error"', () => {
      for (const { error, expectedMessage } of errors.UnknownError) {
        expect(extractErrorMessage(error)).toBe(expectedMessage)
      }
    })

    it('should return "Network error"', () => {
      for (const { error, expectedMessage } of errors.NetworkError) {
        expect(extractErrorMessage(error)).toBe(expectedMessage)
      }
    })

    it('should return "Unexpected GraphQL error"', () => {
      for (const { error, expectedMessage } of errors.GraphQLError) {
        expect(extractErrorMessage(error)).toBe(expectedMessage)
      }
    })

    it('should return error message for server errors', () => {
      for (const { error, expectedMessage } of errors.ServerError) {
        expect(extractErrorMessage(error)).toBe(expectedMessage)
      }
    })

    it('should return error message for client errors', () => {
      for (const { error, expectedMessage } of errors.ClientError) {
        expect(extractErrorMessage(error)).toBe(expectedMessage)
      }
    })
  })
})
