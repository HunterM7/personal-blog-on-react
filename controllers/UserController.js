import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { validationResult } from 'express-validator'

// Models
import UserModel from '../models/User.js'

// Utils
import checkAuth from '../utils/checkAuth.js'
import { encryptionKey } from '../utils/constants.js'

// Registration controller
export async function userRegister(req, res) {
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
      encryptionKey,
      { expiresIn: '30d' },
    )

    res.json({ ...user._doc, token })
  } catch (error) {
    console.log(error)

    res.status(500).json({ message: 'Не удалось зарегистрироваться.' })
  }
}

// Login controller
export async function userLogin(req, res) {
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
      encryptionKey,
      { expiresIn: '30d' },
    )

    res.status(200).json({ ...user._doc, token })
  } catch (error) {
    console.log(error.message)

    res.status(500).json({ message: 'Не удалось авторизоваться' })
  }
}

// Get User
export async function getUser(req, res) {
  try {
    const user = await UserModel.findById(req.userId)

    if (!user)
      return res.status(404).json({ message: 'Пользователь не найден' })

    res.status(200).json(user)
  } catch (error) {
    res.status(500).json({ message: 'Что-то пошло не так' })
  }
}
