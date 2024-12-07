import fastify from 'fastify'
import {
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from 'fastify-type-provider-zod'
import { createTripRoute } from './routes/create-trip'
import { getTripsRoute } from './routes/get-trips'
import { confirmTripRoute } from './routes/confirm-trip'
import cors from '@fastify/cors'

const app = fastify().withTypeProvider<ZodTypeProvider>()

app.register(cors, {
  origin: '*',
})

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

app.register(createTripRoute)

app.register(getTripsRoute)
app.register(confirmTripRoute)

app.listen({ port: 3333 }).then(() => {
  console.log('Server running!')
})
