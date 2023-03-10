import { buildSchema } from "type-graphql";
import { GraphQLSchema } from "graphql";
import { join } from "path";

import { resolverManager } from "./resolvers";

export async function buildGraphqlSchema(): Promise<GraphQLSchema> {
  const resolvers = resolverManager.getResolvers();
  if (!resolvers || resolvers.length === 0) {
    return;
  }

  return await buildSchema({
    resolvers,
    emitSchemaFile: { path: join(process.cwd(), "schema.gql") },
    validate: false,
  });
}
