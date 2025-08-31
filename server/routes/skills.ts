import { Router } from 'express'
import * as db from '../db/skills.ts'

const router = Router()

router.get('/', async (req, res) => {
  try {
    const result = await db.getAllSkills()
    res.json(result)
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: 'Something went wrong' })
  }
})

router.post('/', async (req, res) => {
  try {
    const { skillsTopic, skillsDetails } = req.body
    const convert = {
      skills_topic: skillsTopic,
      skills_details: skillsDetails,
    }
    const result = await db.createSkillsPost(convert)
    res.json(result)
  } catch (err) {
    console.log('WHoops', err)
  }
})

router.patch('/:id', async (req, res) => {
  try {
    const id = Number(req.params.id)
    const { skillsTopic, skillsDetails } = req.body
    const convert = {
      skills_topic: skillsTopic,
      skills_details: skillsDetails,
    }
    const result = await db.updatePost(id, convert)
    res.json(result)
  } catch (err) {
    console.log('Whoops', err)
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const id = req.params.id
    await db.deletePost(id)
    res.sendStatus(204)
  } catch (err) {
    console.log('Whoops', err)
  }
})

export default router
