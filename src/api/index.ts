import axios from 'axios'
import BrowserStorage from '../assets/utils/browser-storage'

const WEB = 'WEB'
const baseURL = process.env.VUE_APP_OM30_PATIENTS_API
const responseType = 'json'
const instance = axios.create({ baseURL, responseType })

instance.interceptors.request.use((config) => {
  const authToken = BrowserStorage.get('token', undefined)

  config.headers.client = WEB
  if (authToken && typeof authToken === 'string') {
    config.headers.Authorization = `Bearer ${authToken}`
  }
  return config
}, (error) => Promise.reject(error))

export default instance
