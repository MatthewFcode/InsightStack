import express from 'express'
import * as Path from 'node:path'
import skillRoutes from './routes/skills.ts'
import newPostRoutes from './routes/posts.ts'
import userRoutes from './routes/users.ts'

const server = express()

server.use(express.json())

server.use(express.static(Path.resolve('public')))

server.use('/api/v1/posts', newPostRoutes)
server.use('/api/v1/skills', skillRoutes)
server.use('/api/v1/users', userRoutes)
server.use('/api/v1/fav-languages')
server.use('/api/v1/least-fav-languages')

if (process.env.NODE_ENV === 'production') {
  server.use(express.static(Path.resolve('public')))
  server.use('/assets', express.static(Path.resolve('./dist/assets')))
  server.get('*', (req, res) => {
    res.sendFile(Path.resolve('./dist/index.html'))
  })
}

export default server
