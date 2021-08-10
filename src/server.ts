import 'reflect-metadata'
import { ApolloServer } from "apollo-server";
import { createSchema } from './schema/schema';
import { createContext } from './context';

export async function createServer(): Promise<ApolloServer> {
  return new ApolloServer({
    schema: await createSchema(),
    context: createContext
  })
}