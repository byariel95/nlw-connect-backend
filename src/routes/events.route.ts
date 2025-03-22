import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import z from 'zod'
import { subscribeToEvent } from '../functions/subscribe-to-events'

export const subscribeEventsRoute: FastifyPluginAsyncZod = async app => {
    app.post(
        '/subcriptions',
        {
            schema: {
                summary: 'Subscribe to events',
                tags: ['Subscriptions'],
                description: 'Subscribes a user to events',
                //params: {},
                //headers: {},
                //querystring: {},
                //preValidation: [],
                body: z.object({
                    name: z.string().min(3),
                    email: z.string().email(),
                }),
                response: {
                    201: z.object({
                        subcriberId: z.string(),
                    }),
                    500: z.object({
                        message: z.string(),
                    }),
                },
            },
        },
        async (request, reply) => {
            const { name, email } = request.body
            const { subcriberId } = await subscribeToEvent({ name, email })
            reply.status(201).send({ subcriberId })
        }
    )
}
