import express from 'express'
import jwt from 'jsonwebtoken'
import mongoose from 'mongoose'
import { validationResult } from 'express-validator'

// Validation
import { registerValidation } from './validations/auth.js'

// Connecting to DB
mongoose
  .connect(
    'mongodb+srv://admin:1234567As@personal-blog.52bvf2n.mongodb.net/?retryWrites=true&w=majority',
  )
  .then(() => console.log('DB is ok.'))
  .catch((error) => console.log(error))

const app = express()

// For using json
app.use(express.json())

// Endpoints
app.post('/auth/register', registerValidation, function (req, res) {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.status(400).json(errors.array())
  }

  res.json({
    success: true,
  })
})

// Start server
app.listen(4444, function (err) {
  if (err) return console.log(err)

  console.log('Server is working!')
})
