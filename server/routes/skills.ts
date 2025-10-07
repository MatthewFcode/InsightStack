import { Router } from 'express'
import * as db from '../db/skills.ts'
import * as connection from '../db/users.ts'
import checkJwt, { JwtRequest } from '../auth0'
import { wss } from '../server.ts'
import ws from 'ws'

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

router.post('/', checkJwt, async (req: JwtRequest, res) => {
  try {
    const { skillsTopic, skillsDetails } = req.body
    const auth0Id = req.auth?.sub
    const user = await connection.getUserById(auth0Id as string)
    const convert = {
      skills_topic: skillsTopic as string,
      skills_details: skillsDetails as string,
      skills_auth0Id: auth0Id as string,
      skills_added_by_user: user?.username as string,
    }
    const result = await db.createSkillsPost(convert)

    wss.clients.forEach((client) => {
      if (client.readyState === ws.OPEN) {
        client.send(
          JSON.stringify({
            type: 'database_change',
            message: 'New skills post added',
          }),
        )
      }
    })

    res.status(201).json(result)
  } catch (err) {
    console.log('Whoops', err)
  }
})

router.patch('/:id', checkJwt, async (req: JwtRequest, res) => {
  try {
    const id = Number(req.params.id)
    const auth0Id = req.auth?.sub as string
    const { skillsTopic, skillsDetails } = req.body
    const convert = {
      skills_topic: skillsTopic,
      skills_details: skillsDetails,
    }
    const result = await db.updatePost(id, auth0Id, convert)

    wss.clients.forEach((client) => {
      if (client.readyState === ws.OPEN) {
        client.send(
          JSON.stringify({
            type: 'database_change',
            message: 'New skills post updated',
          }),
        )
      }
    })

    res.json(result)
  } catch (err) {
    console.log('Whoops', err)
  }
})

router.delete('/:id', checkJwt, async (req: JwtRequest, res) => {
  try {
    const auth0Id = req.auth?.sub as string
    const id = req.params.id
    await db.deletePost(id, auth0Id)

    wss.clients.forEach((client) => {
      if (client.readyState === ws.OPEN) {
        client.send(
          JSON.stringify({
            type: 'database_change',
            message: 'New skills post deleted',
          }),
        )
      }
    })

    res.sendStatus(204)
  } catch (err) {
    console.log('Whoops', err)
  }
})

export default router
