'use client'

import { GraphQLEndpointForm } from "@/components/metrics/graphql-endpoint-form"
import { GraphiQLInterface } from "@/components/metrics/graphiql-interface"
import { ModelsChart } from "@/components/metrics/models-chart"
import { TransactionsChart } from "@/components/metrics/transactions-chart"
import { useGraphQLConnection } from "@/hooks/use-graphql-connection"
import { useToast } from "@/hooks/use-toast"

export default function MetricsPage() {
  const { toast } = useToast()

  const { connect, fetcher } = useGraphQLConnection((msg) => {
    toast({
      title: "Connection Error",
      description: msg,
      variant: "destructive",
    })
  })

  return (
    <main className="space-y-6 px-4">
      <GraphQLEndpointForm connect={connect} />

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
