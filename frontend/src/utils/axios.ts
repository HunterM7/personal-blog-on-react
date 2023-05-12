import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://personal-blog-on-react.vercel.app/',
})

export default instance
