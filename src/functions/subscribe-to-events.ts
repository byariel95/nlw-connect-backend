import { eq } from 'drizzle-orm'
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

        const subscribers = await db
            .select()
            .from(subscriptions)
            .where(eq(subscriptions.email, email));

        if (subscribers.length > 0) {
            return {
                subcriberId: subscribers[0].id,
            }
        }

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
