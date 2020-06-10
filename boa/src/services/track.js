import { apiRequest } from "../configs/apiMiddleware";

export default {
  getAll: (searchText) => apiRequest("GET", `/track`, { query: { search: searchText } }),
  getOne: (id) => apiRequest("GET", `/track/${id}`),
  create: (jsonData) => apiRequest("POST", `/track`, { jsonData }),
  update: (id, jsonData) => apiRequest("PUT", `/track/${id}`, { jsonData }),
//   setCover: (id, formData) => apiRequest("PUT", `/track/cover/${id}`, { formData }),
  remove: (id) => apiRequest("DELETE", `/track/${id}`),
};