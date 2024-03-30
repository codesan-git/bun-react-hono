import { Hono } from 'hono'
import { zValidator } from '@hono/zod-validator'
import { z } from 'zod'

const app = new Hono()

app.get('/', (c) => c.json('list books'))
const route = app.post('/',
  zValidator(
    'json',
    z.object({
      title: z.string(),
      body: z.string(),
    })
  ),
  (c) => {
    return c.json(
      {
        ok: true,
        message: 'Created!'
      },
      201
    )
  }
)
app.get('/:id', (c) => c.json(`get ${c.req.param('id')}`))

export type AppType = typeof route
export default app