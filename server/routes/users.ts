import { Router } from 'express'
import checkJwt, { JwtRequest } from '../auth0'
import * as db from '../db/users.ts'
const router = Router()
// post and get
// checkJwt checks for a valid token from the api client (middleware function )
// get their own user back when they login (Jwt token) -- need one from front end
router.get('/', checkJwt, async (req: JwtRequest, res) => {
  try {
    const auth0Id = req.auth?.sub
    const user = await db.getUserById(auth0Id as string)
    res.json({ user })
  } catch (err) {
    console.log(err)
    res.sendStatus(500)
  }
})

router.post('/', checkJwt, async (req: JwtRequest, res) => {
  try {
    const auth0Id = req.auth?.sub
    const createdAt = new Date().toString()
    const user = { ...req.body, created_at: createdAt, auth0Id: auth0Id }
    const [addedUser] = await db.createUser(user)
    res.json({ user: addedUser })
  } catch (err) {
    console.log(err)
  }
})

export default router
