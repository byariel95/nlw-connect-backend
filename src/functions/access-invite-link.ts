import { redis } from '../redis/client'

interface AccesssInviteLinkParams {
    subscriberId: string
}
export async function accessInviteLink({
    subscriberId,
}: AccesssInviteLinkParams) {
    await redis.hincrby('referral:access-count', subscriberId, 1)
}
