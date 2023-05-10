import jwt from 'jsonwebtoken'
import { encryptionKey } from './constants.js'

export default function (req, res, next) {
  const token = req.headers.authorization?.replace(/Bearer\s/, '') || ''

  if (token) {
    try {
      const decoded = jwt.verify(token, encryptionKey)

      req.userId = decoded._id

      next()
    } catch (error) {
      res.status(403).json({ message: 'Нет доступа' })
    }
  } else {
    res.status(403).json({ message: 'Нет доступа' })
  }
}
