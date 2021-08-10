import { GraphQLSchema } from 'graphql'
import { buildSchema } from 'type-graphql'
import { rules } from '../rules'
import { HelloWorldResolver } from './resolvers/HelloWorldResolver'
import { UserResolver } from './resolvers/UserResolver'

export async function createSchema(): Promise<GraphQLSchema> {
  return buildSchema({
    resolvers: [HelloWorldResolver, UserResolver],
    authChecker: rules,
    emitSchemaFile: __dirname + '/../../schema.graphql',
  })
}
