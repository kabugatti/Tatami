import { GraphiQL } from 'graphiql'
import { Fetcher } from '@graphiql/toolkit'

import 'graphiql/graphiql.min.css'

export function GraphiQLInterface({ fetcher }: { fetcher?: Fetcher | null }) {
  if (!fetcher) return null

  return (
    <div className="h-[600px] xl:h-full w-full">
      <GraphiQL fetcher={fetcher} />
    </div>
  )
}
