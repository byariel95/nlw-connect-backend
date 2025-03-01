import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import z from 'zod'
import { env } from '../config/env'
import { accessInviteLink } from '../functions/access-invite-link'

export const subscribeEventsRoute: FastifyPluginAsyncZod = async app => {
    app.post(
        '/invites/:subscriberId',
        {
            schema: {
                summary: 'Access the invite link',
                tags: ['Referal'],
                description: 'Subscribes a user to events',
                params: z.object({ subscriberId: z.string() }),
                //headers: {},
                //querystring: {},
                //preValidation: [],

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
            const { subscriberId } = request.params
            await accessInviteLink({ subscriberId })
            const redirectUrl = new URL(env.WEB_URL)
            redirectUrl.searchParams.set('referrer', subscriberId)

            return reply.redirect(redirectUrl.toString(), 302)
        }
    )
}
