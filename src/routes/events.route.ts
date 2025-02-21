import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import z from 'zod'

export const subscribeEventsRoute: FastifyPluginAsyncZod = async app => {
    app.post(
        '/subcriptions',
        {
            schema: {
                summary: 'Subscribe to events',
                tags: ['subscriptions'],
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
                        name: z.string(),
                        email: z.string().email(),
                    }),
                },
            },
        },
        async (request, reply) => {
            const { name, email } = request.body
            reply.status(201).send({ name, email })
        }
    )
}
