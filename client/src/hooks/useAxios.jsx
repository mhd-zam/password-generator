import { useState, useEffect } from "react";
import { axiosPrivate } from "../config/axiosconfig";
import { useDispatch, useSelector } from "react-redux";
import { RemoveUserStatus } from "../Redux/userStatus/userAction";

const useAxios = () => {
  const token = useSelector((state) => state.userStatus.accessToken);
  const dispatch = useDispatch();
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
      (error) => {
        if (error?.response?.status === 401) {
          // dispatch(RemoveUserStatus());
        }
        return Promise.reject(error);
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
