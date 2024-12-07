import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import z from 'zod'

export const confirmTripRoute: FastifyPluginAsyncZod = async app => {
  app.get(
    '/trips/:tripId/confirm',
    {
      schema: {
        params: z.object({
          tripId: z.string(),
        }),
      },
    },
    async request => {
      return {
        tripId: request.params.tripId,
      }
    }
  )
}
