import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import {DbConnect} from './db'
import flippers  from './routes/flippers'
import brands from './routes/brands'
import { Brands } from './models/brands'

// import creations    from './routes/creations'

const app = new Hono()
await DbConnect()

const port = 3000
console.log(`Server is running on port ${port}`)

// 3000/api/creations/
app.route('/flippers', flippers)
app.route('/brands', brands)


app.use("*",(c)=>{
  return c.json({msg:'404 oups ta mere'})
});

serve({
  fetch: app.fetch,
  port
})
