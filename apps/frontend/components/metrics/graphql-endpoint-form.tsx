'use client'

import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

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

const formSchema = z.object({
  endpoint: z.string().url('Must be a valid URL').refine((url) =>
    url.startsWith('http://') || url.startsWith('https://'), {
    message: 'Endpoint must start with http:// or https://',
  })
})

type FormValues = z.infer<typeof formSchema>

interface GraphQLEndpointFormProps {
  connect: (endpoint: string) => void
}

export function GraphQLEndpointForm({ connect }: GraphQLEndpointFormProps) {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { endpoint: '' },
  })

  const onSubmit = (data: FormValues) => {
    connect(data.endpoint)
  }

  return (
    <div className="w-full space-y-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="endpoint"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-foreground font-semibold">GraphQL Endpoint</FormLabel>
                <FormControl>
                  <Input placeholder="https://api.example.com/graphql" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="w-full bg-primary text-foreground font-semibold py-3 px-6 rounded-md hover:bg-primary/85"
          >
            Connect
          </Button>
        </form>
      </Form>
    </div>
  )
}
