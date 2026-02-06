import axios from "axios";
export const BASE_URL = "http://localhost:8080/api/lastlayer";

const apiClient = axios.create({
  baseURL: BASE_URL,
});

export default apiClient;

// 아래는 추후 완성
// apiClient.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;
//     const { accessToken, setAccessToken, setLogout } = useAuthStore.getState();

//     // 401 에러(토큰 만료) 발생 시
//     if (error.response?.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;

//       try {
//         // 방법 A: 쿠키에 있는 RefreshToken을 사용하여 새 AccessToken 요청
//         const res = await axios.post(`${BASE_URL}/auth/refresh`, {}, { withCredentials: true });
//         const newAccessToken = res.data.accessToken;

//         setAccessToken(newAccessToken);
//         originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

//         return apiClient(originalRequest); // 실패했던 요청 재시도
//       } catch (refreshError) {
//         setLogout();
//         return Promise.reject(refreshError);
//       }
//     }
//     return Promise.reject(error);
//   }
// );
