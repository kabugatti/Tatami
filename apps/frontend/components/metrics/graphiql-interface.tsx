import { GraphiQL } from 'graphiql'
import { Fetcher } from '@graphiql/toolkit'

import 'graphiql/graphiql.min.css'

interface GraphiQLInterfaceProps {
  fetcher?: Fetcher | null
}

export function GraphiQLInterface({ fetcher }: GraphiQLInterfaceProps) {
  if (!fetcher) return null

  return (
    <div className="h-[600px] xl:h-full w-full">
      <GraphiQL fetcher={fetcher} />
    </div>
  )
}
