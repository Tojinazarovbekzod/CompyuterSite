import api from './api.js'

const shopService = {
  async getProducts(params = {}) {
    const response = await api.get('products/', { params })
    return response.data
  },

  async getProduct(id) {
    const response = await api.get(`products/${id}/`)
    return response.data
  },

  async getCategories() {
    const response = await api.get('categories/')
    return response.data
  },

  async getBrands() {
    const response = await api.get('brands/')
    return response.data
  },

  async updateCart(cartPayload) {
    const response = await api.post('cart/', cartPayload)
    return response.data
  },

  async createOrder(orderPayload) {
    const response = await api.post('orders/', orderPayload)
    return response.data
  },
}

export default shopService
