import React from 'react'
import { Typography, TextField, Paper, Button, Avatar } from '@mui/material'

// Styles
import styles from './Login.module.scss'

const Registration: React.FC = () => {
  return (
    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        Создание аккаунта
      </Typography>

      <div className={styles.avatar}>
        <Avatar sx={{ width: 100, height: 100 }} />
      </div>

      <TextField className={styles.field} label="Полное имя" fullWidth />
      <TextField className={styles.field} label="E-Mail" fullWidth />
      <TextField className={styles.field} label="Пароль" fullWidth />

      <Button size="large" variant="contained" fullWidth>
        Зарегистрироваться
      </Button>
    </Paper>
  )
}

export default Registration
