import { useState } from 'react'
import { ApolloClient, ApolloQueryResult, gql, NormalizedCacheObject } from '@apollo/client'
import { createGraphiQLFetcher, Fetcher } from '@graphiql/toolkit'
import { createApolloClient } from '@/lib/apollo-client'

type GenericGraphQLResult = Record<string, unknown>

export function useGraphQLConnection() {
  const [client, setClient] = useState<ApolloClient<NormalizedCacheObject> | null>(null)
  const [fetcher, setFetcher] = useState<Fetcher | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [result, setResult] = useState<GenericGraphQLResult | null>(null)
  const [query, setQuery] = useState<string>('')

  const connect = (endpoint: string) => {
    try {
      const apollo = createApolloClient(endpoint)
      const graphiqlFetcher = createGraphiQLFetcher({ url: endpoint })

      setClient(apollo)
      setFetcher(() => graphiqlFetcher)
      setError(null)
    } catch {
      setError('Failed to connect to the GraphQL endpoint.')
    }
  }

  const runQuery = async () => {
    if (!client || !query.trim()) {
      setError('Please enter a valid query.')
      return
    }

    try {
      const response: ApolloQueryResult<GenericGraphQLResult> = await client.query({
        query: gql(query),
        fetchPolicy: 'no-cache',
      })

      setResult(response.data)
      setError(null)
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error'
      setError(message)
      setResult(null)
    }
  }

  return {
    client,
    fetcher,
    error,
    result,
    query,
    setQuery,
    connect,
    runQuery,
  }
}
