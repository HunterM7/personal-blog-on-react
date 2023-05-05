import { body } from 'express-validator'

export const registerValidation = [
  body('email', 'Неверный формат почты e-mail').isEmail(),
  body('password', 'Пароль должен содержать от 6 до 20 символов').isLength({
    min: 6,
    max: 20,
  }),
  body('fullName', 'Необходимо указать полное имя').isLength({ min: 3 }),
  body('avatarUrl', 'Неверная ссылка на фото').optional().isURL(),
]
