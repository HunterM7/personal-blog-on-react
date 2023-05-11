import express from 'express'
import mongoose from 'mongoose'

import multer from 'multer'

// Validation
import { loginValidation, registerValidation } from './validations/auth.js'
import { createPostValidation } from './validations/posts.js'

// Controllers
import { UserController, PostController } from './controllers/index.js'

// Utils
import { checkAuth, handleValidationErrors } from './utils/index.js'

// Connecting to DB
mongoose
  .connect(
    'mongodb+srv://admin:1234567As@personal-blog.52bvf2n.mongodb.net/blog?retryWrites=true&w=majority',
  )
  .then(() => console.log('DB is ok.'))
  .catch((error) => console.log(error))

const PORT = process.env.PORT || 4444

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
app.listen(PORT, function (err) {
  if (err) return console.log(err)

  console.log('Server is working!')
})
