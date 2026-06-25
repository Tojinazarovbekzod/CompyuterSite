import api from './api.js'

const productService = {
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
}

export default productService
