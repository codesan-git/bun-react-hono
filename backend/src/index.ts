import { Hono } from 'hono'
import { cors } from 'hono/cors'

// import type { AnyRouter } from '@trpc/server'
// import type { FetchHandlerRequestOptions } from '@trpc/server/adapters/fetch'
// import { fetchRequestHandler } from '@trpc/server/adapters/fetch'
// import type { MiddlewareHandler } from 'hono'

import { trpcServer } from '@hono/trpc-server' // Deno 'npm:@hono/trpc-server'
import { appRouter } from './router'
import books from './books'

// type tRPCOptions = Omit<FetchHandlerRequestOptions<AnyRouter>, 'req' | 'endpoint'> &
//   Partial<Pick<FetchHandlerRequestOptions<AnyRouter>, 'endpoint'>>

const app = new Hono()

app.use('/*', cors())
app.use(
  '/trpc/*',
  trpcServer({
    router: appRouter,
  })
)
app.route('/books', books)

// export const trpcServer = ({ endpoint = '/trpc', ...rest }: tRPCOptions): MiddlewareHandler => {
//   return async (c) => {
//     const res = fetchRequestHandler({
//       ...rest,
//       endpoint,
//       req: c.req.raw,
//     })
//     return res
//   }
// }

export default {
  port: process.env.PORT || 8080,
  fetch: app.fetch,
}
