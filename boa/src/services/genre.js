import { apiRequest } from "../configs/apiMiddleware";

export default {
  getAll: (searchText) => apiRequest("GET", `/genre`, { query: { search: searchText } }),
  getOne: (id) => apiRequest("GET", `/genre/${id}`),
  create: (jsonData) => apiRequest("POST", `/genre`, { jsonData }),
  update: (id, jsonData) => apiRequest("PUT", `/genre/${id}`, { jsonData }),
//   setCover: (id, formData) => apiRequest("PUT", `/genre/cover/${id}`, { formData }),
  remove: (id) => apiRequest("DELETE", `/genre/${id}`),
};