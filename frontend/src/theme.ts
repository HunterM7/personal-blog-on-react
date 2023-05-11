import { createTheme } from '@mui/material/styles'

export const theme = createTheme({
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore: Very strange typing for shadows
  shadows: ['none'],
  palette: {
    primary: {
      main: '#4361ee',
    },
  },
  typography: {
    button: {
      textTransform: 'none',
      fontWeight: 400,
    },
  },
})
