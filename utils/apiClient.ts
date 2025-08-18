import axios from 'axios';
import { BASE_URL, CONFIG } from '../config'
import Cookies from "js-cookie";

const apiClient = axios.create({
  baseURL: BASE_URL,
  // withCredentials:true,
});

let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach(prom => {
    if (token) {
      prom.resolve(token);
    } else {
      prom.reject(error);
    }
  });
  failedQueue = [];
};

apiClient.interceptors.request.use(async (config) => {
  let token = "";
  if (typeof window === "undefined") {
    // ✅ Server-side: Use dynamic import to avoid build issues
    const { cookies } = await import("next/headers");
    token = (await cookies()).get("accessToken")?.value || "";
  }
  else {
    // ✅ Client-side: Use js-cookie
    token = Cookies.get("accessToken") || "";
  }
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  
  response => response, // if response is OK, just return it
  async error => {
    console.log('interceptor for refresh token called')
    const originalRequest = error.config;

    // If access token expired and this is not a retry yet
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({
            resolve: (token: string) => {
              originalRequest.headers['Authorization'] = `Bearer ${token}`;
              resolve(apiClient(originalRequest));
            },
            reject: (err: any) => reject(err),
          });
        });
      }

      isRefreshing = true;

      try {
        let refreshToken = "";
        if (typeof window === "undefined") {
          // ✅ Server-side: Use dynamic import to avoid build issues
          console.log('server side running')
          const { cookies } = await import("next/headers");
          refreshToken = (await cookies()).get("refreshToken")?.value || "";
        }
        else {
          // ✅ Client-side: Use js-cookie
          console.log('client side running')
          refreshToken = Cookies.get("refreshToken") || "";
        }
        const res = await axios.post(
          CONFIG.refreshAccesToken,
          {refreshToken},
          { withCredentials: true }
        );

        const newAccessToken = res.data.accessToken;

        // Set Authorization header for all future requests
        apiClient.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
        processQueue(null, newAccessToken);

        // Retry the original failed request
        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
        return apiClient(originalRequest);

      } catch (refreshErr) {
        processQueue(refreshErr, null);
        // Optionally redirect to login
        if (typeof window !== 'undefined') {
          window.location.href = '/login';
        }
        return Promise.reject(refreshErr);

      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;
