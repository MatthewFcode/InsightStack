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
    const {skillsTopic, skillsDetails} = req.body
    const convert = {
      sk
    }
    const result = await db.createSkillsPost()
  }
})
