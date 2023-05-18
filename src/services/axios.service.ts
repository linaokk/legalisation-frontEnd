import axios from "axios";

export const initAxios = () => {
  axios.defaults.baseURL = process.env.REACT_APP_WS_HOST;
  const token = localStorage.token;

  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }

  /*
  axios.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response.status === 401) {
        window.location.href = ROOT_LOGIN;
      }
    }
  );
  */
};
