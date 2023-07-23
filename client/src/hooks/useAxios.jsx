import {useEffect, useContext } from "react";
import { axiosPrivate } from "../config/axiosconfig";
import { useDispatch, useSelector } from "react-redux";
import { RemoveUserStatus } from "../Redux/userStatus/userAction";
import { CustomContext } from "../context/ExternalContext";

const useAxios = () => {
  const token = useSelector((state) => state.userStatus.accessToken);
  const dispatch = useDispatch();
  const {toast}=useContext(CustomContext)
  useEffect(() => {
    const requestInterceptor = axiosPrivate.interceptors.request.use(
      (config) => {
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      }
    );

    const responseInterceptor = axiosPrivate.interceptors.response.use(
      (response) => {
        return response;
      },
      (err) => {
        if (err.response.status==403) {
          dispatch(RemoveUserStatus())
        } 
        return Promise.reject(err);
      }
    );

    // Clean up the interceptors when the component unmounts
    return () => {
      axiosPrivate.interceptors.request.eject(requestInterceptor);
      axiosPrivate.interceptors.response.eject(responseInterceptor);
    };
  }, []);

  return axiosPrivate;
};

export default useAxios;
