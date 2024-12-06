import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
// import { logout, logoutState } from "../../Redux/Store/Feature/authSlice";

const BASE_URL = `${import.meta.env.VITE_BASE_API}`;

const createHttpReq = async <T>(
  url: string,
  options?: AxiosRequestConfig
): Promise<AxiosResponse<T>> => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    // const { dispatch } = store;
    axios.interceptors.response.use(
      function (response) {
        return response;
      },
      async (error) => {
        if (!error.response) {
          return new Promise((_resolve, reject) => {
            reject(error);
          });
        }

        const isLoginPage = window.location.pathname === "/login";

        if (
          !isLoginPage &&
          ((error.response.status === 404 && error.response.data.data) ||
            error.response.status === 401 ||
            error.response.status === 403)
        ) {
          // dispatch(logout());
          // dispatch(logoutState());
          window.location.href = "/login";
        }
        return Promise.reject(error);
      }
    );
    const response = await axios({
      baseURL: BASE_URL,
      url,
      ...options,
    });

    return response;
  } catch (error) {
    // Handle errors , throw custom error
    console.error(`Error making request to ${url}:`, error);
    throw error;
  }
};

export default createHttpReq;
