import { ApolloError } from '@apollo/client'
import { isArray, isString } from 'lodash-es'

import { isRecord } from '../is-record'

export enum ErrorType {
  ClientError = 'ClientError',
  ServerError = 'ServerError',
  GraphQLError = 'GraphQLError',
  NetworkError = 'NetworkError',
  UnknownError = 'UnknownError',
}

export const defineErrorType = (error: ApolloError): ErrorType => {
  if (error.networkError) {
    return ErrorType.NetworkError
  }

  if (error.clientErrors.length > 0) {
    return ErrorType.GraphQLError
  }

  if (error.graphQLErrors.length > 0) {
    // Take only the first error
    const { code } = error.graphQLErrors[0].extensions
    if (typeof code !== 'number' && typeof code !== 'string') {
      return ErrorType.UnknownError
    }

    return defineHttpLikeErrorType(code)
  }

  return ErrorType.UnknownError
}

function defineHttpLikeErrorType(code: number | string): ErrorType {
  const serverErrorStringCodes = [
    'INTERNAL_SERVER_ERROR',
    'NOT_IMPLEMENTED',
    'BAD_GATEWAY',
    'SERVICE_UNAVAILABLE',
    'GATEWAY_TIMEOUT',
    'HTTP_VERSION_NOT_SUPPORTED',
  ]
  const clientErrorStringCodes = [
    'BAD_REQUEST',
    'BAD_USER_INPUT',
    'UNAUTHORIZED',
    'PAYMENT_REQUIRED',
    'FORBIDDEN',
    'NOT_FOUND',
    'METHOD_NOT_ALLOWED',
    'NOT_ACCEPTABLE',
    'PROXY_AUTHENTICATION_REQUIRED',
    'REQUEST_TIMEOUT',
    'CONFLICT',
    'GONE',
    'LENGTH_REQUIRED',
    'PRECONDITION_FAILED',
    'PAYLOAD_TOO_LARGE',
    'URI_TOO_LONG',
    'UNSUPPORTED_MEDIA_TYPE',
    'REQUESTED_RANGE_NOT_SATISFIABLE',
    'EXPECTATION_FAILED',
    'I_AM_A_TEAPOT',
    'MISDIRECTED',
    'UNPROCESSABLE_ENTITY',
    'FAILED_DEPENDENCY',
    'PRECONDITION_REQUIRED',
    'TOO_MANY_REQUESTS',
  ]

  if (typeof code === 'string') {
    if (serverErrorStringCodes.includes(code)) {
      return ErrorType.ServerError
    }

    if (clientErrorStringCodes.includes(code)) {
      return ErrorType.ClientError
    }
  }

  if (!Number.isFinite(Number(code))) {
    console.log(`Unknown code type: "${code}"`)

    return ErrorType.UnknownError
  }

  code = Number(code)

  if (code >= 600) {
    return ErrorType.UnknownError
  }

  if (code >= 500) {
    return ErrorType.ServerError
  }

  if (code >= 400) {
    return ErrorType.ClientError
  }

  return ErrorType.UnknownError
}

export const extractErrorMessage = (error: ApolloError): string => {
  const errorType = defineErrorType(error)

  if (errorType === ErrorType.UnknownError) {
    return 'Unknown error'
  }

  if (errorType === ErrorType.NetworkError) {
    return 'Network error'
  }

  if (errorType === ErrorType.GraphQLError) {
    return 'Unexpected GraphQL error'
  }

  if (errorType === ErrorType.ServerError) {
    return error.message
  }

  // Try to get message from response object
  if (isRecord(error.graphQLErrors[0].extensions.response)) {
    const { message } = error.graphQLErrors[0].extensions.response
    if (isString(message)) {
      return message
    }

    if (isArray(message)) {
      return message.join('; ')
    }
  }

  return error.graphQLErrors[0].message
}
