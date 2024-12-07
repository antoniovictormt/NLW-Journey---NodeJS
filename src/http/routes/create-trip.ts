import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { createTrip } from '../../functions/create-trip'
import z from 'zod'
import { getMailClient } from '../../lib/mail'
import nodemailer from 'nodemailer'
import { dayjs } from '../../lib/dayjs'

export const createTripRoute: FastifyPluginAsyncZod = async app => {
  app.post(
    '/create-trip',
    {
      schema: {
        body: z.object({
          destination: z.string(),
          endAt: z.coerce.date(),
          emailsToInvite: z.array(z.string().email()),
          ownerName: z.string(),
          ownerEmail: z.string().email(),
          startAt: z.coerce.date(),
        }),
      },
    },
    async request => {
      const {
        destination,
        endAt,
        emailsToInvite,
        ownerEmail,
        ownerName,
        startAt,
      } = request.body

      if (dayjs(startAt).isBefore(new Date())) {
        throw new Error('Invalid trip start date.')
      }

      if (dayjs(endAt).isBefore(startAt)) {
        throw new Error('Invalid trip end date.')
      }

      const { trip } = await createTrip({
        destination,
        endAt,
        startAt,
        createParticipantRequest: {
          email: ownerEmail,
          name: ownerName,
          invite: emailsToInvite,
        },
      })

      const formattedStartDate = dayjs(startAt).format('LL')
      const formattedEndDate = dayjs(endAt).format('LL')

      const confirmationLink = `http://localhost:3333/trips/${trip.id}/confirm`

      const mail = await getMailClient()

      const message = await mail.sendMail({
        from: {
          name: 'Equipe plann.er',
          address: 'oi@plann.er',
        },
        to: {
          name: ownerName,
          address: ownerEmail,
        },
        subject: `Confirme sua viagem para ${destination}`,
        html: `
        <div style="font-family: sans-serif; font-size: 16px; line-height: 1.6;">
          <p>Você solicitou a criação de uma viagem para <strong>${destination}</strong> nas datas de <strong>${formattedStartDate}</strong> até <strong>${formattedEndDate}</strong>.</p>
          <p></p>
          <p>Para confirmar sua viagem, clique no link abaixo:</p>
          <p></p>
          <p>
            <a href="${confirmationLink}">Confirmar viagem</a>
          </p>
          <p></p>
          <p>Caso você não saiba do que se trata esse e-mail, apenas ignore esse e-mail.</p>
        </div>
      `.trim(),
      })

      return {
        trip: trip.id,
        email: nodemailer.getTestMessageUrl(message),
      }
    }
  )
}
