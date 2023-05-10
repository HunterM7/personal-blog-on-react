import express from 'express'
import mongoose from 'mongoose'

// Validation
import { loginValidation, registerValidation } from './validations/auth.js'
import { createPostValidation } from './validations/posts.js'

// Controllers
import * as UserController from './controllers/UserController.js'
import * as PostController from './controllers/PostController.js'

// Utils
import checkAuth from './utils/checkAuth.js'

// Connecting to DB
mongoose
  .connect(
    'mongodb+srv://admin:1234567As@personal-blog.52bvf2n.mongodb.net/blog?retryWrites=true&w=majority',
  )
  .then(() => console.log('DB is ok.'))
  .catch((error) => console.log(error))

const app = express()

// For using json
app.use(express.json())

// === Endpoints ===

// Users
app.get('/auth/user', checkAuth, UserController.get)
app.post('/auth/login', loginValidation, UserController.login)
app.post('/auth/register', registerValidation, UserController.register)

// Posts
app.get('/posts/:id', PostController.getOne)
app.get('/posts', PostController.getAll)
app.post('/posts', checkAuth, createPostValidation, PostController.create)
// app.patch('/posts/:id', PostController.update)
app.delete('/posts/:id', checkAuth, PostController.remove)

// === === === ===

// Start server
app.listen(4444, function (err) {
  if (err) return console.log(err)

  console.log('Server is working!')
})
