import { createServer } from './server'

async function bootstrap(): Promise<void> {
  const server = await createServer()

  server.listen().then(async ({ url }) => {
    console.log(`🚀 Server ready at: ${url}`)
  })
}

bootstrap()
