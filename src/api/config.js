import axios from "axios";
import { useAuthStore } from "../stores/authStore";

export const BASE_URL = "http://localhost:8080/api/lastlayer";

// 1. 일반적인 데이터 요청용 (쿠키 X)
export const apiClient = axios.create({
  baseURL: BASE_URL,
  withCredentials: false,
});

// 2. 토큰 재발급(Refresh) 전용 (쿠키 O)
export const authClient = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

export default apiClient;

// 토큰 관리를 전담하는 객체
const tokenManager = {
  promise: null,

  async refreshToken() {
    // 이미 갱신 중인 Promise가 있다면 새로 만들지 않고 그것을 반환
    if (this.promise) {
      return this.promise;
    }

    const { setLogin, setLogout } = useAuthStore.getState();

    // 새로운 갱신 작업(Promise) 시작 및 저장
    this.promise = (async () => {
      try {
        console.log("Refreshing access token...");
        const res = await authClient.post("/auth/refresh");

        setLogin(res.data);
        console.log("Token refreshed successfully");
        return res.data.accessToken;
      } catch (refreshError) {
        console.error("Token refresh failed:", refreshError);
        setLogout();
        throw refreshError; // 에러를 던져서 대기 중인 다른 요청들도 실패 처리되게 함
      } finally {
        this.promise = null; // 작업 완료 후 초기화 (다음 만료 시를 대비)
      }
    })();

    return this.promise;
  },
};

// 요청 인터셉터: Authorization 헤더에 accessToken 추가
apiClient.interceptors.request.use(
  (config) => {
    const { accessToken } = useAuthStore.getState();
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    console.error("Request interceptor error:", error);
    return Promise.reject(error);
  },
);

// 응답 인터셉터: 401 에러 처리 및 토큰 갱신
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // 401 에러이고 재시도한 적이 없는 요청일 때
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // tokenManager를 통해 안전하게 토큰 갱신 대기
        const newAccessToken = await tokenManager.refreshToken();

        // 갱신된 토큰으로 헤더 교체 후 재시도
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return apiClient(originalRequest);
      } catch (err) {
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  },
);
