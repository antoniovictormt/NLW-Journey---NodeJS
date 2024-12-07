import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { getTrips } from '../../functions/get-trips'

export const getTripsRoute: FastifyPluginAsyncZod = async app => {
  app.get('/', async () => {
    const { trips } = await getTrips()

    return trips
  })
}
