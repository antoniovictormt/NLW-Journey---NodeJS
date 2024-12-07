import { client, db } from '.'
import { participants, trips } from './schema'

async function seed() {
  await db.delete(participants)
  await db.delete(trips)

  const result = await db
    .insert(trips)
    .values([
      {
        destination: 'Recife',
        endAt: new Date(),
        startAt: new Date(),
        isConfirmed: true,
      },
      {
        destination: 'São Paulo',
        endAt: new Date(),
        startAt: new Date(),
      },
    ])
    .returning()

  await db.insert(participants).values([
    {
      name: 'Antonio',
      email: 'test@email.io',
      tripId: result[0].id,
    },
    {
      name: 'Beca',
      email: 'test@email.io',
      tripId: result[1].id,
    },
    {
      name: 'Kiko',
      email: 'test@email.io',
      tripId: result[1].id,
    },
  ])
}

seed().finally(() => {
  client.end()
})
