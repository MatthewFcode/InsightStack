// import { Router } from 'express'
// import checkJwt, { JwtRequest } from '../auth0'
// import * as db from '../db/users.ts'
// import multer from 'multer'
// import path from 'path'
// const router = Router()

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     //cb(null, path.resolve('uploads'))
//     const uploadDir =
//       process.env.NODE_ENV === 'production'
//         ? '/app/storage/uploads' // Dokku persistent storage
//         : path.resolve('uploads')
//     cb(null, uploadDir)
//   },
//   filename: (req, file, cb) => {
//     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)
//     cb(
//       null,
//       file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname),
//     )
//   },
// })

// const upload = multer({
//   storage: storage,
//   limits: {
//     fileSize: 5 * 1024 * 1024, // 5MB limit
//   },
//   fileFilter: (req, file, cb) => {
//     // Only allow image files
//     if (file.mimetype.startsWith('image/')) {
//       cb(null, true)
//     }
//   },
// })

// // post and get
// // checkJwt checks for a valid token from the api client (middleware function )
// // get their own user back when they login (Jwt token) -- need one from front end
// router.get('/', checkJwt, async (req: JwtRequest, res) => {
//   try {
//     const auth0Id = req.auth?.sub
//     const user = await db.getUserById(auth0Id as string)
//     res.json({ user })
//   } catch (err) {
//     console.log(err)
//     res.sendStatus(500)
//   }
// })

// router.post(
//   '/',
//   checkJwt,
//   upload.single('profile_photo_url'),
//   async (req: JwtRequest, res) => {
//     try {
//       const auth0Id = req.auth?.sub
//       const createdAt = new Date().toString()

//       // handling multer
//       let profilePhotoUrl = ''
//       if (req.file) {
//         // Store the relative path to the uploaded file
//         profilePhotoUrl = `/uploads/${req.file.filename}`
//       }

//       console.log(profilePhotoUrl)

//       const user = {
//         auth0Id: auth0Id as string,
//         username: req.body.username,
//         email: req.body.email,
//         current_position: req.body.current_position || '',
//         about_me: req.body.about_me || '',
//         profile_photo_url: profilePhotoUrl, // Use the uploaded file path
//         created_at: createdAt,
//         location: req.body.location || '',
//       }
//       const [addedUser] = await db.createUser(user)
//       res.status(201).json({ user: addedUser })
//     } catch (err) {
//       console.log('Error creating user:', err)
//       res.status(500).json({ error: 'Failed to create user' })
//     }
//   },
// )

// export default router
import { Router } from 'express'
import checkJwt, { JwtRequest } from '../auth0'
import * as db from '../db/users.ts'
import multer from 'multer'
import path from 'path'

const router = Router()

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Note: 'uploads' directory must be created and writable in the production environment.
    // WARNING: Storing files locally on ephemeral filesystems (like Dokku containers)
    // is highly discouraged as data will be lost on restart/redeploy.
    cb(null, path.resolve('uploads'))
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
    } else {
      cb(new Error('File type not supported. Must be an image.'), false)
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
    console.error('GET /api/v1/users failed:', err) // Changed console.log to console.error for visibility
    res.sendStatus(500)
  }
})

router.post(
  '/',
  checkJwt,
  upload.single('profile_photo_url'),
  async (req: JwtRequest, res) => {
    try {
      // --- START DEBUG LOGGING ---
      console.log('POST /api/v1/users received request.')
      console.log('Auth0 ID:', req.auth?.sub)
      console.log('Request Body:', req.body)
      console.log(
        'File Status (req.file):',
        req.file ? 'File received' : 'No file received',
      )
      if (req.file) {
        console.log('Uploaded File Details:', {
          originalname: req.file.originalname,
          filename: req.file.filename,
          path: req.file.path,
        })
      }
      // --- END DEBUG LOGGING ---

      const auth0Id = req.auth?.sub
      // Check if user is authenticated
      if (!auth0Id) {
        console.error('Auth0 ID missing. Authentication failed.')
        return res.status(401).json({ error: 'Authentication required' })
      }

      const createdAt = new Date().toString()
      // handling multer
      let profilePhotoUrl = ''
      if (req.file) {
        // Store the relative path to the uploaded file
        profilePhotoUrl = `/uploads/${req.file.filename}`
      }

      const { username, email, current_position, about_me, location } = req.body

      // Basic validation for required fields
      if (!username || !email) {
        return res
          .status(400)
          .json({ error: 'Username and email are required.' })
      }

      const user = {
        auth0Id: auth0Id as string,
        username: username,
        email: email,
        current_position: current_position || '',
        about_me: about_me || '',
        profile_photo_url: profilePhotoUrl, // Use the uploaded file path
        created_at: createdAt,
        location: location || '',
      }

      const [addedUser] = await db.createUser(user)
      res.status(201).json({ user: addedUser })
    } catch (err) {
      // Multer errors (like file size or type) also land here
      console.error('Error creating user/processing POST:', err)
      res
        .status(500)
        .json({ error: 'Failed to create user or process file upload.' })
    }
  },
)

export default router
