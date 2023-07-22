import {useEffect } from "react";
import { axiosAdmin } from "../config/axiosconfig";
import {useSelector} from "react-redux";

const useAxiosAdmin = () => {
  const token = 'ghjgjhg'
  useEffect(() => {
    const requestInterceptor = axiosAdmin.interceptors.request.use(
      (config) => {
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      }
    );

    const responseInterceptor = axiosAdmin.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        if (error?.response?.status === 401) {
          
        }
        return Promise.reject(error);
      }
    );

    // Clean up the interceptors when the component unmounts
    return () => {
        axiosAdmin.interceptors.request.eject(requestInterceptor);
        axiosAdmin.interceptors.response.eject(responseInterceptor);
    };
  }, []);

  return axiosAdmin;
};

export default useAxiosAdmin;