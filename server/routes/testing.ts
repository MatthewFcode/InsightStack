import { Router } from 'express'
import { getTestingMessages } from '../db/testing.ts'
import checkJwt, { JwtRequest } from '../auth0'

const router = Router()

router.get('/', checkJwt, async (req: JwtRequest, res) => {
  try {
    const result = await getTestingMessages()
    res.status(200).json(result)
  } catch (err) {
    console.log(err)
    res.status(500).json('that was an internal server error')
  }
})

export default router
