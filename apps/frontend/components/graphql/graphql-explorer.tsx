'use client'

import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { GraphiQLProvider, QueryEditor } from '@graphiql/react'
import { AlertTriangle } from 'lucide-react'

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
import { useGraphQLConnection } from '@/hooks/use-graphql-connection'

import '@graphiql/react/dist/style.css'

const formSchema = z.object({
  endpoint: z.string().url('Must be a valid URL'),
})
type FormValues = z.infer<typeof formSchema>

export function GraphQLExplorer() {
  const {
    client,
    fetcher,
    error,
    result,
    setQuery,
    connect,
    runQuery,
  } = useGraphQLConnection()

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { endpoint: '' },
  })

  const onSubmit = (data: FormValues) => {
    connect(data.endpoint)
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
                <QueryEditor onEdit={setQuery} />
              </div>
            </GraphiQLProvider>

            <Button onClick={runQuery}>Run Query</Button>

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
