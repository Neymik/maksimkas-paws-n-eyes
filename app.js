
import Fastify from 'fastify'
import Funcs from './funcs.js'

const ACCESS_KEY = process.env.ACCESS_KEY;
if (!ACCESS_KEY) {
  console.error('ACCESS_KEY is not set')
  process.exit(1)
}

const fastify = Fastify({
  logger: true
})

fastify.get('/hello', async (request, reply) => {
  return Funcs.hello()
})

// DANGER ZONE
fastify.post('/execute/:key', async (request, reply) => {
  const key = request.params.key

  if (key !== ACCESS_KEY) {
    return 'Unauthorized'
  }

  const command = request.body.command
  return Funcs.execute(command)
})


const start = async () => {
  try {
    await fastify.listen({ port: 3000 })
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
start()