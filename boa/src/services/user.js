import { apiRequest } from "../configs/apiMiddleware";

export default {
  register: (jsonData) => apiRequest("POST", "/user/register", { jsonData }),
  login: (jsonData) => apiRequest("POST", "/user/login", { jsonData }),
  getAll: (searchText) => apiRequest("GET", `/user`, { query: { search: searchText } }),
  getOne: (id) => apiRequest("GET", `/user/${id}`),
  update: (id, jsonData) => apiRequest("PUT", `/user/${id}`, { jsonData }),
//   setCover: (id, formData) => apiRequest("PUT", `/user/cover/${id}`, { formData }),
  remove: (id) => apiRequest("DELETE", `/user/${id}`),
};