import express from 'express'
import jwt from 'jsonwebtoken'
import mongoose from 'mongoose'

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
app.get('/', function (req, res) {
  res.send('Hello world!')
})

app.post('/auth/login', function (req, res) {
  const token = jwt.sign(
    {
      email: req.body.email,
      firstName: 'Anton',
      lastName: 'Meshchaninov',
    },
    'secretKey',
  )

  res.json({
    success: true,
    token,
  })
})

// Start server
app.listen(4444, function (err) {
  if (err) return console.log(err)

  console.log('Server is working!')
})
