import { Router } from 'express'
import checkJwt, { JwtRequest } from '../auth0'
import * as db from '../db/users.ts'
import multer from 'multer'
import cloudinary from '../cloudinary.js'
import { unlink } from 'node:fs/promises'

const router = Router()
const upload = multer({ dest: 'tmp/' })

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

router.post(
  '/',
  checkJwt,
  upload.single('profile_photo_url'),
  async (req: JwtRequest, res) => {
    try {
      const auth0Id = req.auth?.sub
      const createdAt = new Date().toString()

      // handling multer
      let profilePhotoUrl = ''

      if (req.file) {
        try {
          // Upload to Cloudinary
          const result = await cloudinary.uploader.upload(req.file.path, {
            folder: 'insightstack_profiles',
            transformation: [{ width: 300, height: 300, crop: 'fill' }],
          })
          profilePhotoUrl = result.secure_url

          // Clean up temp file
          await unlink(req.file.path)
        } catch (uploadErr) {
          console.error('Cloudinary upload error:', uploadErr)
          // Clean up temp file even if upload fails
          try {
            await unlink(req.file.path)
          } catch (unlinkErr) {
            console.error('Failed to delete temp file:', unlinkErr)
          }
          throw new Error('Failed to upload image')
        }
      }

      console.log(profilePhotoUrl)

      const user = {
        auth0Id: auth0Id as string,
        username: req.body.username,
        email: req.body.email,
        current_position: req.body.current_position || '',
        about_me: req.body.about_me || '',
        profile_photo_url: profilePhotoUrl, // Use the uploaded file path
        created_at: createdAt,
        location: req.body.location || '',
      }
      const [addedUser] = await db.createUser(user)
      res.status(201).json({ user: addedUser })
    } catch (err) {
      console.log('Error creating user:', err)
      res.status(500).json({ error: 'Failed to create user' })
    }
  },
)

export default router
