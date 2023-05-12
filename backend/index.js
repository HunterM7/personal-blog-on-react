import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'

import multer from 'multer'

// Validation
import { loginValidation, registerValidation } from './validations/auth.js'
import { createPostValidation } from './validations/posts.js'

// Controllers
import { UserController, PostController } from './controllers/index.js'

// Utils
import { checkAuth, handleValidationErrors } from './utils/index.js'

// Connecting to DB
dotenv.config()

const connectLink = process.env.MONGO_DB_CONNECT_LINK

mongoose
  .connect(connectLink)
  .then(() => console.log('DB is ok.'))
  .catch((error) => console.log(error))

// Initializing the app
const app = express()

// Initializing the storage
const storage = multer.diskStorage({
  destination: (_, __, callback) => {
    callback(null, 'uploads')
  },
  filename: (_, file, callback) => {
    callback(null, file.originalname)
  },
})

const upload = multer({ storage })

// For using json
app.use(express.json())

// CORS
app.use(cors())

// Static route
app.use('/uploads', express.static('uploads'))

// === Endpoints ===

// Users
app.get('/auth/user', checkAuth, UserController.get)
app.post(
  '/auth/login',
  loginValidation,
  handleValidationErrors,
  UserController.login,
)
app.post(
  '/auth/register',
  registerValidation,
  handleValidationErrors,
  UserController.register,
)

// Posts
app.get('/posts/:id', PostController.getOne)
app.get('/posts', PostController.getAll)
app.post(
  '/posts',
  checkAuth,
  createPostValidation,
  handleValidationErrors,
  PostController.create,
)
app.patch(
  '/posts/:id',
  checkAuth,
  createPostValidation,
  handleValidationErrors,
  PostController.update,
)
app.delete('/posts/:id', checkAuth, PostController.remove)

// Upload
app.post('/uploads', checkAuth, upload.single('image'), function (req, res) {
  try {
    res.status(200).json({ url: `/uploads/${req.file.originalname}` })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Не удалось загрузить картинку' })
  }
})

// === === === ===

// Start server
const PORT = process.env.PORT

app.listen(PORT, function (err) {
  if (err) return console.log(err)

  console.log('Server is working!')
})
