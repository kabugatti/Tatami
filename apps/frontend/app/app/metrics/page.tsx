'use client'

import { GraphQLEndpointForm } from "@/components/metrics/graphql-endpoint-form"
import { GraphiQLInterface } from "@/components/metrics/graphiql-interface"
import { ModelsChart } from "@/components/metrics/models-chart"
import { TransactionsChart } from "@/components/metrics/transactions-chart"
import { useGraphQLConnection } from "@/hooks/use-graphql-connection"
import { useToast } from "@/hooks/use-toast"
import { createApolloClient } from "@/lib/apollo-client"
import {
  GET_BABY_BEASTS_PLAYERS,
  GET_BEAST_STATUS_TOTAL_COUNT,
  GET_BEASTS_TOTAL_COUNT,
  GET_BEASTS_TOTAL_DATA,
  GET_ENTITIES_TOTAL_COUNT,
  GET_FOOD_TOTAL_COUNT,
  GET_MODELS_TOTAL_COUNT,
  GET_PLAYERS_TOTAL_COUNT,
  GET_TRANSACTIONS,
  GET_TRANSACTIONS_TOTAL_COUNT
} from "@/lib/graphql/metrics.queries"

export default function MetricsPage() {
  const { toast } = useToast()

  const { connect, fetcher } = useGraphQLConnection((msg) => {
    toast({
      title: "Connection Error",
      description: msg,
      variant: "destructive",
    })
  })

  const onLoadMetrics = async () => {
    const client = createApolloClient("https://api.cartridge.gg/x/hhbbb/torii/graphql")

    try {
      const results = await Promise.all([
        client.query({ query: GET_BABY_BEASTS_PLAYERS }),
        client.query({ query: GET_PLAYERS_TOTAL_COUNT }),
        client.query({ query: GET_TRANSACTIONS_TOTAL_COUNT }),
        client.query({ query: GET_BEASTS_TOTAL_DATA }),
        client.query({ query: GET_BEASTS_TOTAL_COUNT }),
        client.query({ query: GET_ENTITIES_TOTAL_COUNT }),
        client.query({ query: GET_MODELS_TOTAL_COUNT }),
        client.query({ query: GET_FOOD_TOTAL_COUNT }),
        client.query({ query: GET_BEAST_STATUS_TOTAL_COUNT }),
        client.query({ query: GET_TRANSACTIONS }),
      ])

      console.log("✅ All metrics loaded")
      results.forEach((r, i) => {
        console.log(`📊 Query ${i + 1}`, r.data)
      })
    } catch (error) {
      toast({
        title: "Error loading metrics",
        description: "Something went wrong while fetching metrics.",
        variant: "destructive",
      })
    }
  }

  return (
    <main className="space-y-6 px-4">
      <GraphQLEndpointForm connect={connect} onLoadMetrics={onLoadMetrics} />

      <div className="grid grid-cols-1 xl:grid-cols-3 pb-4 xl:pb-0 gap-6">
        <div className="col-span-1 xl:col-span-2 row-span-2">
          <GraphiQLInterface fetcher={fetcher} />
        </div>

        <ModelsChart />
        <TransactionsChart />
      </div>
    </main>
  )
}
