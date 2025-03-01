import fastifyCors from '@fastify/cors'
import { fastifySwagger } from '@fastify/swagger'
import { fastifySwaggerUi } from '@fastify/swagger-ui'
import { fastify } from 'fastify'
import {
    type ZodTypeProvider,
    jsonSchemaTransform,
    serializerCompiler,
    validatorCompiler,
} from 'fastify-type-provider-zod'
import { env } from './config/env'
import { subscribeEventsRoute } from './routes/events.route'

const app = fastify({
    logger: {
        level: 'info',
    },
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

app.register(subscribeEventsRoute)

app.listen({
    port: env.PORT,
}).then(() => {
    console.log(`HTTP server is running on port ${env.PORT}`)
})
