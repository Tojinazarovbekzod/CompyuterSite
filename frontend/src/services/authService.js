import api from './api.js'

function getErrorMessage(error, fallbackMessage) {
  const data = error?.response?.data

  if (!data) {
    return error?.message || fallbackMessage
  }

  if (typeof data.detail === 'string') {
    return data.detail
  }

  const fieldMessages = Object.values(data).flat().filter(Boolean)
  if (fieldMessages.length > 0) {
    return fieldMessages.join(' ')
  }

  return fallbackMessage
}

const authService = {
  async login(credentials) {
    try {
      const response = await api.post('auth/login/', credentials)
      return response.data
    } catch (error) {
      throw new Error(getErrorMessage(error, 'Login failed. Check your credentials.'))
    }
  },

  async register(attributes) {
    try {
      const response = await api.post('auth/register/', attributes)
      return response.data
    } catch (error) {
      throw new Error(getErrorMessage(error, 'Registration failed. Please try again.'))
    }
  },

  async getProfile() {
    const response = await api.get('auth/profile/')
    return response.data
  },
}

export default authService
