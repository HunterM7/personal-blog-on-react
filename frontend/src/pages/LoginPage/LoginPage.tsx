import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Typography, TextField, Paper, Button } from '@mui/material'

// Redux
import { useAppDispatch } from 'redux/store'
import { loginUser } from 'redux/slices'

// Utils
import { ILoginParams } from 'types'

// Styles
import styles from './LoginPage.module.scss'

const LoginPage: React.FC = () => {
  const dispatch = useAppDispatch()

  // Form validation
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isValid },
  } = useForm<ILoginParams>({
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onChange',
  })

  const onSubmit: SubmitHandler<ILoginParams> = data => {
    console.log(data)
  }

  return (
    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        Вход в аккаунт
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          className={styles.field}
          label="E-Mail"
          type="email"
          error={!!errors.email?.message}
          helperText={errors.email?.message}
          {...register('email', { required: 'Укажите почту' })}
          fullWidth
        />

        <TextField
          className={styles.field}
          label="Пароль"
          fullWidth
          error={!!errors.password?.message}
          helperText={errors.password?.message}
          {...register('password', { required: 'Укажите пароль' })}
        />

        <Button type="submit" size="large" variant="contained" fullWidth>
          Войти
        </Button>
      </form>
    </Paper>
  )
}

export default LoginPage
