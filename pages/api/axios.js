import axios from "axios";
const Axios = () => {
  const token = localStorage.getItem("token");
  const defaultOptions = {
    baseURL: "https://api.apotheca.uz/api/v1",
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  };
  return {
    get: (url, options = {}) => axios.get(url, { ...defaultOptions, ...options }),
    post: (url, data, options = {}) =>
      axios.post(url, data, { ...defaultOptions, options }),
    delete: (url, options = {}) =>
      axios.delete(url, { ...defaultOptions, options }),
    put: (url, data, options = {}) =>
      axios.put(url, data, { ...defaultOptions, options }),
  };
};
export default Axios;
