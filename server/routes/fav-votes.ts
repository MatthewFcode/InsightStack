import { Router } from 'express'

import * as db from '../db/fav-votes.ts'

const router = Router()

// get route for all of the fav languages
router.get('/', async (req, res) => {
  try {
    const getLanguages = await db.getFavouriteLanguages()
    res.json(getLanguages)
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: 'Internal Server Error' })
  }
})

// get route for the votes
router.get('/fav-votes', async (req, res) => {
  try {
    const getVotes = await db.getFavouriteLanguageVotes()
    res.json(getVotes)
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: 'Internal Server Error' })
  }
})

// post route

router.post('/:id', async (req, res) => {
  try {
    const id = Number(req.params.id)
    const postedVote = await db.addFavouriteLanguageVote(id)
    res.json({ postedVote })
  } catch (err) {
    console.log(err)
    res.status(400).json({ message: 'Bad Post Request' })
  }
})

export default router
