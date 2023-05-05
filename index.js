import express from 'express'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import mongoose from 'mongoose'
import { validationResult } from 'express-validator'

// Validation
import { registerValidation } from './validations/auth.js'

// Models
import UserModel from './models/User.js'

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

// Endpoints
app.post('/auth/register', registerValidation, async function (req, res) {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.status(400).json(errors.array())
  }

  const password = req.body.password
  const salt = await bcrypt.genSalt(10)
  const passwordHash = await bcrypt.hash(password, salt)

  const doc = new UserModel({
    fullName: req.body.fullName,
    email: req.body.email,
    passwordHash,
    avatarUrl: req.body.avatarUrl,
  })

  const user = await doc.save()

  res.json(user)
})

// Start server
app.listen(4444, function (err) {
  if (err) return console.log(err)

  console.log('Server is working!')
})
