import { Router } from 'express'
import checkJwt, { JwtRequest } from '../auth0'
import * as db from '../db/users.ts'
import multer from 'multer'
import path from 'path'
const router = Router()

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.resolve('public/images'))
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)
    cb(
      null,
      file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname),
    )
  },
})

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    // Only allow image files
    if (file.mimetype.startsWith('image/')) {
      cb(null, true)
    }
  },
})

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
        profilePhotoUrl = `/images/${req.file.filename}`
      }

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
      res.json({ user: addedUser })
    } catch (err) {
      console.log('Error creating user:', err)
      res.status(500).json({ error: 'Failed to create user' })
    }
  },
)

export default router
