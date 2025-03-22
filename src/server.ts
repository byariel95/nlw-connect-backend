import fastifyCors from '@fastify/cors'
import { fastifySwagger } from '@fastify/swagger'
import { fastifySwaggerUi } from '@fastify/swagger-ui'
import fastifyRequestLogger from '@mgcrea/fastify-request-logger'
import { fastify } from 'fastify'
import {
    type ZodTypeProvider,
    jsonSchemaTransform,
    serializerCompiler,
    validatorCompiler,
} from 'fastify-type-provider-zod'
import { env } from './config/env'
import { accessInviteLinkRoute, getSubscriberInviteClicksRoute, subscribeEventsRoute } from './routes'

const app = fastify({
    logger: {
        level: 'debug',
        transport: {
            target: '@mgcrea/pino-pretty-compact',
            options: { translateTime: 'HH:MM:ss Z', ignore: 'pid,hostname' },
        },
    },
    disableRequestLogging: true,
}).withTypeProvider<ZodTypeProvider>()

app.setSerializerCompiler(serializerCompiler)
app.setValidatorCompiler(validatorCompiler)

app.register(fastifyCors)

app.register(fastifySwagger, {
    openapi: {
        info: {
            title: 'NLW Connect',
            version: '0.0.1',
        },
    },
    transform: jsonSchemaTransform,
})

app.register(fastifySwaggerUi, {
    routePrefix: '/docs',
})

app.register(fastifyRequestLogger)

app.register(subscribeEventsRoute)
app.register(accessInviteLinkRoute)
app.register(getSubscriberInviteClicksRoute)

app.listen({
    port: env.PORT,
}).then(() => {
    console.log(`HTTP server is running on port ${env.PORT}`)
})
