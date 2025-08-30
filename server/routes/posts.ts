import { Router } from 'express'
import * as db from '../db/posts.ts'

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

router.post('/', async (req, res) => {
  try {
    const { topic, postDetails } = req.body
    const convert = {
      topic: topic,
      post_details: postDetails,
    }
    const newPost = await db.createPost(convert)
    res.json(newPost)
  } catch (err) {
    console.log(err)
    res.send(400).json({ message: 'something went wrong' })
  }
})

router.patch('/:id', async (req, res) => {
  try {
    const id = Number(req.params.id)
    const { topic, postDetails } = req.body

    const convert = {
      topic: topic,
      post_details: postDetails,
    }
    const updatedPost = await db.updatePost(id, convert)
    res.status(200).json(updatedPost)
  } catch (err) {
    console.log(err)
    res.status(400).json({ message: 'Something went wrong' })
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const id = req.params.id
    await db.deletePost(id)
    res.sendStatus(204)
  } catch (err) {
    console.log(err)
  }
})

export default router
