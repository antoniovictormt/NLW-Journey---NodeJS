import { db } from '../db'
import { trips } from '../db/schema'

interface CreateTripRequest {
  destination: string
  endAt: Date
  startAt: Date
}

export async function createTrip({
  destination,
  endAt,
  startAt,
}: CreateTripRequest) {
  const result = await db
    .insert(trips)
    .values({
      destination,
      endAt,
      startAt,
    })
    .returning()

  const trip = result[0]

  return {
    trip,
  }
}
