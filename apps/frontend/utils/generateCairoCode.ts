import type { Model, Property } from "@/types/models";

export function generateCairoCode(models: Model[]): string {
  if (!models.length) return "// No models created yet";

  return models
    .map(
      (model) => `#[derive(Copy, Drop, Serde)]
#[dojo::model]
pub struct ${model.name} {${model.properties
        .map(
          (prop: Property) =>
            `    ${prop.isKey ? "\n    #[key]" : ""}\n    pub ${prop.name}: ${prop.dataType},`,
        )
        .join("")}
}
`,
    )
    .join("\n");
}
