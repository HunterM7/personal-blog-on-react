import React from 'react'
import { Link } from 'react-router-dom'
import { Button, Container } from '@mui/material'

// Utils
import {
  BASE_URL,
  LOGIN_URL,
  REGISTER_URL,
  CREATE_POST_URL,
} from 'utils/routes'

// Styles
import styles from './Header.module.scss'

const Header: React.FC = () => {
  const isAuth = false

  const onClickLogout = () => {
    console.log('click logout')
  }

  return (
    <div className={styles.root}>
      <Container maxWidth="lg">
        <div className={styles.inner}>
          <Link className={styles.logo} to={BASE_URL}>
            <div>FULLSTACK BLOG</div>
          </Link>

          <div className={styles.buttons}>
            {isAuth ? (
              <>
                <Link to={CREATE_POST_URL}>
                  <Button variant="contained">Написать статью</Button>
                </Link>

                <Button
                  onClick={onClickLogout}
                  variant="contained"
                  color="error"
                >
                  Выйти
                </Button>
              </>
            ) : (
              <>
                <Link to={LOGIN_URL}>
                  <Button variant="outlined">Войти</Button>
                </Link>

                <Link to={REGISTER_URL}>
                  <Button variant="contained">Создать аккаунт</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </Container>
    </div>
  )
}

export default Header
