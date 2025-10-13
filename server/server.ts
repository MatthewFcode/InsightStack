import express from 'express'
import * as Path from 'node:path'
import skillRoutes from './routes/skills.ts'
import newPostRoutes from './routes/posts.ts'
import userRoutes from './routes/users.ts'
import favRoutes from './routes/fav-votes.ts'
import leastFavRoutes from './routes/non-fav-votes.ts'
import path from 'path'

import { createServer } from 'http'
import { WebSocketServer } from 'ws'

const app = express()

const server = createServer(app)
const wss = new WebSocketServer({ server })

app.use(express.json())

app.use('/api/v1/posts', newPostRoutes)
app.use('/api/v1/skills', skillRoutes)
app.use('/api/v1/users', userRoutes)
app.use('/api/v1/fav-languages', favRoutes)
app.use('/api/v1/least-fav-languages', leastFavRoutes)
app.use('/images', express.static(path.resolve('public/images')))

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(Path.resolve('public')))
  app.use('/assets', express.static(Path.resolve('./dist/assets')))
  app.get('*', (req, res) => {
    res.sendFile(Path.resolve('./dist/index.html'))
  })
}
// WebSocket server setup

wss.on('connection', (ws) => {
  console.log('Client connected')

  ws.on('message', (message) => {
    console.log(`Received message: ${message}`)
  })

  ws.on('close', () => {
    console.log('Client disconnected')
  })
})

export { server, wss }
