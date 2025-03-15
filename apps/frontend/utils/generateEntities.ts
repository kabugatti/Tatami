import type { EntityField } from "@/components/diagram/EntityCard";
import type { Model, Property } from "@/types/models";

export function generateEntities(
  models: Model[],
): { title: string; fields: EntityField[] }[] {
  return models.map((model) => ({
    title: model.name,
    fields: model.properties.map((prop: Property) => ({
      name: prop.name,
      type: prop.dataType,
      isPrimary: prop.isKey || false,
    })),
  }));
}
