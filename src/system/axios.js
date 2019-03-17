import axiosOriginal from 'axios'

export const axios = axiosOriginal.create({
  baseURL: 'https://api.github.com'
})
