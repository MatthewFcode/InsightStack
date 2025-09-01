import { auth0 } from '@auth0/auth0-react'
import Router from 'express'
import * as db from '../db/users.ts'

// ... existing imports
import { Router } from 'express'
import { auth0 } from '@auth0/auth0-react'
import { checkJwt } from '../auth-middleware' // Middleware to check JWT authentication
import * as db from '../db/users.ts' // A new db file for user-related functions

const router = Router()

//route to check if a user exists
router.get('/user', checkJwt, async (req, res) => {
  try {
    const auth0Id = req.auth.sub
    if (!auth0Id) {
      return res.status(401).json({ message: 'Not authenticated' })
    }
    const user = await db.getUserById(auth0Id)

    if (user) {
      res.json(user)
    } else {
      res.status(404).json({ message: 'User not registered' })
    }
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Something went wrong' })
  }
})
