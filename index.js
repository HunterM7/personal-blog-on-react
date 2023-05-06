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

// Login
app.post('/auth/login', async function (req, res) {
  try {
    const user = await UserModel.findOne({ email: req.body.email })

    if (!user) {
      return res.status(404).json({ message: 'Пользователь не найден' })
    }

    const isValidPass = await bcrypt.compare(
      req.body.password,
      user._doc.passwordHash,
    )

    if (!isValidPass) {
      return res.status(400).json({ message: 'Неверный логин или пароль' })
    }

    const token = jwt.sign(
      {
        _id: user._id,
      },
      'secretToken123',
      { expiresIn: '30d' },
    )

    res.status(200).json({ ...user._doc, token })
  } catch (error) {
    console.log(error.message)

    res.status(500).json({ message: 'Не удалось авторизоваться' })
  }
})

// Register
app.post('/auth/register', registerValidation, async function (req, res) {
  try {
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

    const token = jwt.sign(
      {
        _id: user._id,
      },
      'secretToken123',
      { expiresIn: '30d' },
    )

    res.json({ ...user._doc, token })
  } catch (error) {
    console.log(error)

    res.status(500).json({ message: 'Не удалось зарегистрироваться.' })
  }
})

// Start server
app.listen(4444, function (err) {
  if (err) return console.log(err)

  console.log('Server is working!')
})
