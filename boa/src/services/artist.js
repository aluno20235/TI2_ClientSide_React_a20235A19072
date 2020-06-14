import { apiRequest } from "../configs/apiMiddleware";

export default {
  getAll: (searchText) => apiRequest("GET", `/artist`, { query: { search: searchText } }),
  getOne: (id) => apiRequest("GET", `/artist/${id}`),
  create: (jsonData) => apiRequest("POST", `/artist`, { jsonData }),
  update: (id, jsonData) => apiRequest("PUT", `/artist/data/${id}`, { jsonData }),
  setPhoto: (id, formData) => apiRequest("PUT", `/artist/photo/${id}`, { formData }),
  remove: (id) => apiRequest("DELETE", `/artist/${id}`),
};
