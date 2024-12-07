import { pgTable, text, varchar, timestamp, boolean } from 'drizzle-orm/pg-core'
import { createId } from '@paralleldrive/cuid2'

export const trips = pgTable('trips', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => createId()),
  destination: varchar('destination', { length: 255 }).notNull(),
  isConfirmed: boolean('is_confirmed').notNull().default(false),
  startAt: timestamp('start_at', { withTimezone: true }).notNull(),
  endAt: timestamp('end_at', { withTimezone: true }).notNull(),
  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
})

export const participants = pgTable('participants', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => createId()),
  name: varchar('name', { length: 255 }),
  email: varchar('email', { length: 255 }).notNull(),
  isConfirmed: boolean('is_confirmed').default(false).notNull(),
  isOwner: boolean('is_owner').default(false).notNull(),
  tripId: text('trip_id')
    .references(() => trips.id)
    .notNull(),
  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
})
