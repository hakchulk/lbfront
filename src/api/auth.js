import apiClient from "./config"; // 위에서 만든 파일 경로

export const checkEmailAvailability = async (email) => {
  try {
    // URL 파라미터(Query String)로 전달
    const response = await apiClient.get("/auth/check", {
      params: { email: email }, // 서버 파라미터명이 email인 경우
    });

    return response.data.isExist;
  } catch (error) {
    console.error("이메일 중복 체크 중 오류 발생:", error);
    throw error;
  }
};

export const callSignUp = async (requestData) => {
  try {
    const response = await apiClient.post("/auth/signup", requestData);

    return response.data;
  } catch (error) {
    console.error("callSignUp() 오류 발생:", error);
    throw error;
  }
};

export const callSignIn = async (requestData) => {
  const response = await apiClient.post("/auth/login", requestData);
  return response.data;
};
