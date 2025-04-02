import { GraphQLEditor } from "@/components/graphql/graphql-editor";

export default function GraphQLPage() {
  return (
    <main className="max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-white">GraphQL Explorer</h1>
      <GraphQLEditor />
    </main>
  )
}
