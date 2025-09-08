import { Router } from 'express'
import * as db from '../db/posts.ts'
import * as connection from '../db/users.ts'
import checkJwt, { JwtRequest } from '../auth0'
const router = Router()

router.get('/', async (req, res) => {
  try {
    const posts = await db.getAllPosts()
    res.json(posts)
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: 'Something went wrong' })
  }
})

router.post('/', checkJwt, async (req: JwtRequest, res) => {
  try {
    const { topic, postDetails } = req.body
    const auth0Id = req.auth?.sub

    if (!auth0Id) {
      return res.status(401).json({ message: 'Unauthorized' })
    }
    const user = await connection.getUserById(auth0Id)
    const convert = {
      topic: topic as string,
      posts_details: postDetails as string,
      post_auth0Id: auth0Id as string,
      added_by_user: user?.username as string,
    }
    const newPost = await db.createPost(convert)
    res.json(newPost)
  } catch (err) {
    console.log(err)
    res.send(400).json({ message: 'something went wrong' })
  }
})

router.patch('/:id', checkJwt, async (req: JwtRequest, res) => {
  try {
    const id = Number(req.params.id)
    const { topic, postDetails } = req.body
    const auth0Id = req.auth?.sub

    if (!auth0Id) {
      return res.status(401).json({ message: 'Unauthorized' })
    }

    const convert = {
      topic: topic,
      posts_details: postDetails,
    }
    const updatedPost = await db.updatePost(id, auth0Id, convert)
    res.status(200).json(updatedPost)
  } catch (err) {
    console.log(err)
    res.status(400).json({ message: 'Something went wrong' })
  }
})

router.delete('/:id', checkJwt, async (req: JwtRequest, res) => {
  try {
    const id = req.params.id
    const auth0Id = req.auth?.sub

    if (!auth0Id) {
      return res.status(401).json({ message: 'Unauthorized' })
    }

    await db.deletePost(id, auth0Id)
    res.sendStatus(204)
  } catch (err) {
    console.log(err)
  }
})

export default router
