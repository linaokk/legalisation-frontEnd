import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";
import { ErrorMessage } from "../models/web-service.model";

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

export const handleAxiosError = (err: AxiosError<ErrorMessage>) => {
  const response = err.response;
  if (!err.response?.data)
    return toast.error("An error occurs while calling the WS");

  toast.error(response?.data.message);
};
