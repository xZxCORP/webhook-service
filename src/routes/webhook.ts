import { zValidator } from '@hono/zod-validator'
import { Hono } from 'hono'
import z from 'zod'

import { config } from '../config.js'
import { DockerService } from '../services/docker.js'
const dockerService = new DockerService()
export const webhookRouter = new Hono()

const dockerServiceBodySchema = z.object({
  service: z.string(),
  secret: z.string(),
})

webhookRouter.put('/docker-service', zValidator('json', dockerServiceBodySchema), async (c) => {
  const validated = c.req.valid('json')

  if (validated.secret !== config.WEBHOOK_SECRET) {
    return c.json({ status: 'error', message: 'Invalid secret' }, 403)
  }
  try {
    await dockerService.updateService(validated.secret)
    return c.json({ status: 'success' })
  } catch {
    return c.json({ status: 'error', message: 'Service update failed' }, 500)
  }
})
