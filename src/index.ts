import { createServer } from './server'

async function bootstrap(): Promise<void> {
  const server = await createServer()

  server.listen({ port: process.env.PORT || 4000 }).then(async ({ url }) => {
    console.log(`
      🚀 Server ready at: ${url}
      📭  Query at https://studio.apollographql.com/dev
    `)
  })
}

bootstrap()
