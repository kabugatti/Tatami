'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  ApolloClient,
  gql,
  NormalizedCacheObject,
  ApolloQueryResult,
} from '@apollo/client'
import { createGraphiQLFetcher, Fetcher } from '@graphiql/toolkit'
import { GraphiQLProvider, QueryEditor } from '@graphiql/react'

import { createApolloClient } from '@/lib/apollo-client'
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { AlertTriangle } from 'lucide-react'

import '@graphiql/react/dist/style.css'

const formSchema = z.object({
  endpoint: z.string().url('Must be a valid URL'),
})

type FormValues = z.infer<typeof formSchema>

type GenericGraphQLResult = Record<string, unknown>

export function GraphQLExplorer() {
  const [query, setQuery] = useState<string>('')
  const [result, setResult] = useState<GenericGraphQLResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  const [client, setClient] = useState<ApolloClient<NormalizedCacheObject> | null>(null)
  const [fetcher, setFetcher] = useState<Fetcher | null>(null)

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { endpoint: '' },
  })

  const onSubmit = (data: FormValues) => {
    try {
      const newClient = createApolloClient(data.endpoint)
      const newFetcher = createGraphiQLFetcher({ url: data.endpoint })

      setClient(newClient)
      setFetcher(() => newFetcher)
      setError(null)
    } catch {
      setError('Failed to connect to the GraphQL endpoint.')
    }
  }

  const handleRunQuery = async () => {
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

  return (
    <Card>
      <CardContent className="space-y-6 mt-0">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="endpoint"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>GraphQL Endpoint</FormLabel>
                  <FormControl>
                    <Input placeholder="https://api.example.com/graphql" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Connect</Button>
          </form>
        </Form>

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
                <QueryEditor onEdit={(val) => setQuery(val)} />
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
