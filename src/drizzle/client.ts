import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import { env } from '../config/env'
import { subscriptions } from './schemas/subscriptions'

export const pg = postgres(env.POSTGRES_URL)
export const db = drizzle(pg, {
    schema: {
        subscriptions,
    },
})
