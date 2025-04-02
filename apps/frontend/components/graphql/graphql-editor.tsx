'use client'

import { useState } from 'react'
import { ApolloClient, gql } from '@apollo/client'
import { GraphiQLProvider, QueryEditor } from '@graphiql/react'
import { createGraphiQLFetcher } from '@graphiql/toolkit';
import { AlertTriangle } from 'lucide-react'

import { createApolloClient } from '@/lib/apollo-client'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Label } from '@/components/ui/label'

import '@graphiql/react/dist/style.css'

export function GraphQLEditor() {
  const [endpoint, setEndpoint] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [query, setQuery] = useState<string>('')
  const [result, setResult] = useState<any>(null)

  const [client, setClient] = useState<ApolloClient<any> | null>(null)
  const [fetcher, setFetcher] = useState<any>(null)

  const handleConnect = () => {
    if (!endpoint.startsWith('http')) {
      setError('Please enter a valid URL that starts with http:// or https://')
      return
    }

    try {
      const newClient = createApolloClient(endpoint)

      const newFetcher = createGraphiQLFetcher({ url: endpoint })

      setClient(newClient)
      setFetcher(() => newFetcher)
      setError(null)
    } catch (err) {
      setError('Failed to connect to the GraphQL endpoint.')
    }
  }

  const handleRunQuery = async () => {
    if (!client || !query.trim()) {
      setError('Please enter a valid query.')
      return
    }

    try {
      const response = await client.query({
        query: gql(query),
        fetchPolicy: 'no-cache',
      })
      setResult(response.data)
      setError(null)
    } catch (err: any) {
      setError(err.message)
      setResult(null)
    }
  }

  return (
    <Card>
      <CardContent className="space-y-4 mt-0">
        <Label htmlFor="graphql-endpoint">GraphQL Endpoint</Label>
        <Input
          id="graphql-endpoint"
          placeholder="https://api.example.com/graphql"
          value={endpoint}
          onChange={(e) => setEndpoint(e.target.value)}
        />
        <Button onClick={handleConnect}>Connect</Button>

        {error && (
          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {client && fetcher && (
          <>
            <GraphiQLProvider fetcher={fetcher}>
              <div className="graphiql-container h-[220px]">
                <QueryEditor
                  onEdit={(val) => setQuery(val)}
                />
              </div>
            </GraphiQLProvider>

            <Button onClick={handleRunQuery}>Run Query</Button>

            {result && (
              <pre className="bg-muted p-4 rounded-md overflow-auto text-sm max-h-[220px]">
                {JSON.stringify(result, null, 2)}
              </pre>
            )}
          </>
        )}
      </CardContent>
    </Card>
  )
}
