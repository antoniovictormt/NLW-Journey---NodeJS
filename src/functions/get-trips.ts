import { db } from '../db'
import { trips } from '../db/schema'

export async function getTrips() {
  const data = await db.select().from(trips)

  return {
    trips: data,
  }
}
