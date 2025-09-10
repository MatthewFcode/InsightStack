import * as db from '../db/non-fav-votes.ts'
import { Router } from 'express'

const router = Router()
// get route
router.get('/', async (req, res) => {
  try {
    const result = await db.getLeastFavouriteLanguages()
    res.json(result)
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: 'Internal Server Error' })
  }
})

// get route with the votes and the names of the languages
router.get('/fav-votes', async (req, res) => {
  try {
    const result = await db.getLeastFavouriteLanguageVotes()
    res.json(result)
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: 'Internal Server Error' })
  }
})

// post route to post your least foavourtie laonguage
router.post('/:id', async (req, res) => {
  try {
    const id = req.params.id
    const result = await db.addLeastFavouriteLanguageVote(id)
    res.json({ result })
  } catch (err) {
    console.log(err)
    res.send(400).json({ message: 'bad post request' })
  }
})
export default router
