import api from './api.js'

const authService = {
  async login(credentials) {
    const response = await api.post('auth/login/', credentials)
    return response.data
  },

  async register(attributes) {
    const response = await api.post('auth/register/', attributes)
    return response.data
  },

  async getProfile() {
    const response = await api.get('auth/profile/')
    return response.data
  },
}

export default authService
