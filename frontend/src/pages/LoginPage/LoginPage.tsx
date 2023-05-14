import React from 'react'
import { Typography, TextField, Paper, Button } from '@mui/material'

// Redux
import { useAppDispatch } from 'redux/store'
import { loginUser } from 'redux/slices'

// Styles
import styles from './LoginPage.module.scss'

const LoginPage: React.FC = () => {
  const dispatch = useAppDispatch()

  React.useEffect(() => {
    dispatch(
      loginUser({
        email: '',
        password: '',
      }),
    )
  }, [dispatch])

  return (
    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        Вход в аккаунт
      </Typography>

      <TextField
        className={styles.field}
        label="E-Mail"
        error
        helperText="Неверно указана почта"
        fullWidth
      />

      <TextField className={styles.field} label="Пароль" fullWidth />

      <Button size="large" variant="contained" fullWidth>
        Войти
      </Button>
    </Paper>
  )
}

export default LoginPage
