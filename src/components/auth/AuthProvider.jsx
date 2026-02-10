import { useEffect } from "react";
import { callRefresh } from "../../api/auth";
import { useAuthStore } from "../../stores/authStore";

const AuthProvider = ({ children }) => {
  const { setLogin, setLogout } = useAuthStore();

  useEffect(() => {
    const initAuth = async () => {
      try {
        // 1. 서버에 인증 확인 요청 (쿠키가 자동으로 전송됨)
        const response = await callRefresh();
        console.log("AuthProvider() response:", response);

        // 2. 서버 응답이 성공(authentication: true)이면 스토어 복구
        if (response) {
          setLogin(response);
          console.log("AuthProvider() response.data", response.data);
        } else {
          setLogout();
        }
      } catch (error) {
        // 401 에러 등이 발생하면 로그아웃 상태로 초기화
        console.error("AuthProvider() 인증 복구 실패", error.response.data);
        setLogout();
      }
    };
    initAuth();
  }, [setLogin, setLogout]);

  return children;
};

export default AuthProvider;
