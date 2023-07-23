import {useEffect } from "react";
import { axiosAdmin } from "../config/axiosconfig";
import {useDispatch, useSelector} from "react-redux";
import { adminlogout } from "../Redux/adminStatus/adminAction";

const useAxiosAdmin = () => {
  const token = useSelector(state => state.adminStatus.akn)
  const dispatch=useDispatch()
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
          dispatch(adminlogout())
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