import { Hono } from 'hono'
import { logger } from 'hono/logger'

import { helloRouter } from './routes/hello.js'
import { webhookRouter } from './routes/webhook.js'

export const app = new Hono()
app.use(logger())

app.route('/hello', helloRouter)
app.route('/webhook', webhookRouter)
