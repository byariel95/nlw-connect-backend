import { db } from '../drizzle/client'
import { subscriptions } from '../drizzle/schemas/subscriptions'

interface SubscribeToEventParams {
    name: string
    email: string
}
export async function subscribeToEvent({
    name,
    email,
}: SubscribeToEventParams) {
    try {
        const result = await db
            .insert(subscriptions)
            .values({ name, email })
            .returning()
        const subscriber = result[0]
        return {
            subcriberId: subscriber.id,
        }
    } catch (err) {
        console.error(err)
        throw new Error('Error subscribing to event')
    }
}
