import { db } from '../db'
import { participants, trips } from '../db/schema'

interface CreateParticipantRequest {
  email: string
  name: string
  invite: string[]
}

interface CreateTripRequest {
  destination: string
  endAt: Date
  startAt: Date
  createParticipantRequest: CreateParticipantRequest
}

export async function createTrip({
  destination,
  endAt,
  startAt,
  createParticipantRequest,
}: CreateTripRequest) {
  const trip = await db.transaction(async tx => {
    const [tripResult] = await tx
      .insert(trips)
      .values({
        destination,
        endAt,
        startAt,
      })
      .returning({
        id: trips.id,
        destination: trips.destination,
        startAt: trips.startAt,
        endAt: trips.endAt,
      })

    await tx.insert(participants).values([
      {
        email: createParticipantRequest.email,
        name: createParticipantRequest.name,
        tripId: tripResult.id,
        isConfirmed: true,
        isOwner: true,
      },
      ...createParticipantRequest.invite.map(email => {
        return {
          email,
          tripId: tripResult.id,
        }
      }),
    ])

    return tripResult
  })

  return {
    trip,
  }
}
