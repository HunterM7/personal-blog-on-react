import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

// Models
import UserModel from '../models/User.js'

// Utils
import { encryptionKey } from '../utils/constants.js'

// Registration controller
export async function register(req, res) {
  try {
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
    res.status(500).json({ message: 'Не удалось зарегистрироваться.' })
  }
}

// Login controller
export async function login(req, res) {
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
    res.status(500).json({ message: 'Не удалось авторизоваться' })
  }
}

// Get User
export async function get(req, res) {
  try {
    const user = await UserModel.findById(req.userId)

    if (!user)
      return res.status(404).json({ message: 'Пользователь не найден' })

    res.status(200).json(user)
  } catch (error) {
    res.status(500).json({ message: 'Что-то пошло не так' })
  }
}
