import { Router } from 'express'
import checkJwt, { JwtRequest } from '../auth0'
import * as db from '../db/users.ts'
import multer from 'multer'
// import { CloudinaryStorage } from 'multer-storage-cloudinary'
import {v2 as cloudinary} from 'cloudinary'
import path from 'path'
import fs from 'fs'

const router = Router()
const upload = multer({ dest: 'tmp/' })

  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
    api_key: process.env.CLOUDINARY_API_KEY!,
    api_secret: process.env.CLOUDINARY_API_SECRET!
  })

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, path.resolve('public/images'))
//   },
//   filename: (req, file, cb) => {
//     cb(null, `${Date.now()}-${file.originalname}`)
//   },
// })


//const upload = multer({ storage: storage })
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
        // Store the relative path to the uploaded file
       // profilePhotoUrl = req.file?.path || '' // `/images/${req.file.filename}`
       const result = await cloudinary.uploader.upload(req.file.path, {
        folder: 'insightstack_profiles',
        transformation: [{ width: 300, height: 300, crop: 'fill' }],
      })
      profilePhotoUrl = result.secure_url
      fs.unlinkSync(req.file.path)
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
