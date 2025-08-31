import express from 'express'
import * as Path from 'node:path'
import skillRoutes from './routes/skills.ts'
import newPostRoutes from './routes/posts.ts'

const server = express()

server.use(express.json())

server.use('/api/v1/posts', newPostRoutes)
server.use('/api/v1/skills', skillRoutes)

if (process.env.NODE_ENV === 'production') {
  server.use(express.static(Path.resolve('public')))
  server.use('/assets', express.static(Path.resolve('./dist/assets')))
  server.get('*', (req, res) => {
    res.sendFile(Path.resolve('./dist/index.html'))
  })
}

export default server
