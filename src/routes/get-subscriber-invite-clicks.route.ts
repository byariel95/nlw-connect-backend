import z from 'zod'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { getSubscriberInviteClicks } from '../functions/get-subscribe-invite-clicks'

export const getSubscriberInviteClicksRoute: FastifyPluginAsyncZod = async app => {
    app.get(
        '/subscribers/:subscriberId/ranking/clicks',
        {
            schema: {
                summary: 'Access the invite link',
                tags: ['Referal'],
                description: 'Get subscribers ranking invite clicks count ',
                params: z.object({ subscriberId: z.string() }),
                response: {
                    200: z.object({
                        count: z.number(),
                    }),
                },
            },
        },
        async (request) => {
            const { subscriberId } = request.params
            const { count } = await getSubscriberInviteClicks({ subscriberId })
            return {
                count
            }
        }
    )
}
