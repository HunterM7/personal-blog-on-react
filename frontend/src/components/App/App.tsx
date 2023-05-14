import { Route, Routes } from 'react-router-dom'
import Container from '@mui/material/Container'

// Utils
import {
  BASE_URL,
  CREATE_POST_URL,
  LOGIN_URL,
  POST_BY_ID_URL,
  REGISTER_URL,
} from 'utils/routes'

// Components 'n Pages
import { Header } from 'components'
import { Home, PostPage, Registration, AddPost, LoginPage } from 'pages'

function App() {
  return (
    <>
      <Header />
      <Container maxWidth="lg">
        <Routes>
          <Route path={BASE_URL} element={<Home />} />
          <Route path={POST_BY_ID_URL} element={<PostPage />} />
          <Route path={CREATE_POST_URL} element={<AddPost />} />
          <Route path={LOGIN_URL} element={<LoginPage />} />
          <Route path={REGISTER_URL} element={<Registration />} />
        </Routes>
      </Container>
    </>
  )
}

export default App
