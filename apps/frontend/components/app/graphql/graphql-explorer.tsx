'use client'

import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { GraphiQLProvider, QueryEditor } from '@graphiql/react'
import { AlertTriangle, Play } from 'lucide-react'

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
import { useGraphQLClient } from '@/hooks/use-graphql-client'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'

import '@graphiql/react/dist/style.css'

// Schema definition for endpoint form validation
const formSchema = z.object({
  endpoint: z
    .string()
    .url('Must be a valid URL')
    .refine((url) => url.startsWith('http://') || url.startsWith('https://'), {
      message: 'Endpoint must start with http:// or https://',
    }),
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
  } = useGraphQLClient()

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { endpoint: '' },
  })

  const onSubmit = (data: FormValues) => {
    connect(data.endpoint)
  }

  return (
    <Card>
      <CardContent className="flex flex-col gap-6 mt-0">
        {/* Endpoint connection form */}
        <div className="w-full space-y-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="endpoint"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-foreground font-semibold'>GraphQL Endpoint</FormLabel>
                    <FormControl>
                      <Input placeholder="https://api.example.com/graphql" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full bg-primary text-foreground font-semibold py-3 px-6 rounded-md hover:bg-primary/85">
                Connect
              </Button>
            </form>
          </Form>

          {/* Error display */}
          {error && (
            <Alert variant="destructive">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
        </div>

        {client && fetcher && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
            {/* Editor section */}
            <div className="min-w-0">
              {/* Title + Play button */}
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-muted-foreground">Query Editor</h3>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        onClick={runQuery}
                        size="icon"
                        variant="ghost"
                        className="bg-white hover:bg-gray-100"
                      >
                        <Play className="h-4 w-4" />
                        <span className="sr-only">Run Query</span>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Run Query</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>

              <GraphiQLProvider fetcher={fetcher}>
                <div className="graphiql-container h-[300px] md:h-[500px]">
                  <QueryEditor onEdit={setQuery} />
                </div>
              </GraphiQLProvider>
            </div>

            {/* Response section */}
            <div className="min-w-0">
              <h3 className="text-sm font-semibold text-muted-foreground py-2">Response</h3>
              {result && (
                <pre className="bg-muted p-4 rounded-md overflow-auto text-sm h-full max-h-[500px]">
                  {JSON.stringify(result, null, 2)}
                </pre>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
