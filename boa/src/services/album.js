import { apiRequest } from "../configs/apiMiddleware";

export default {
  getAll: (searchText) => apiRequest("GET", `/album`, { query: { search: searchText } }),
  getOne: (id) => apiRequest("GET", `/album/${id}`),
  create: (jsonData) => apiRequest("POST", `/album`, { jsonData }),
  update: (id, jsonData) => apiRequest("PUT", `/album/data/${id}`, { jsonData }),
  setCover: (id, formData) => apiRequest("PUT", `/album/cover/${id}`, { formData }),
  remove: (id) => apiRequest("DELETE", `/album/${id}`),
};
