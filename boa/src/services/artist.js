import { apiRequest } from "../configs/apiMiddleware";

export default {
  getAll: (searchText) => apiRequest("GET", `/artist`, { query: { search: searchText } }),
  getOne: (id) => apiRequest("GET", `/artist/${id}`),
  create: (jsonData) => apiRequest("POST", `/artist`, { jsonData }),
  update: (id, jsonData) => apiRequest("PUT", `/artist/${id}`, { jsonData }),
//   setCover: (id, formData) => apiRequest("PUT", `/artist/cover/${id}`, { formData }),
  remove: (id) => apiRequest("DELETE", `/artist/${id}`),
};
