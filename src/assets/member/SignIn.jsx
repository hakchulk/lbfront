import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { callSignIn } from "../../api/auth";
import BtnComp from "../../components/BtnComp";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // Zustand 스토어 액션
  // const setLogin = useAuthStore((state) => state.setLogin);

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      // 변경된 엔드포인트: /auth/login
      const response = await callSignIn({ email, password });

      // Zustand에 AuthUserDto 저장 (accessToken 포함)
      // setLogin(response.data);

      alert("로그인에 성공했습니다.");
      navigate("/");
    } catch (error) {
      console.error("SignIn 실패:", { email, password });
      alert("아이디 또는 비밀번호를 확인해주세요.");
    }
  };

  return (
    <div className="min-h-screen bg-[#F5E6D3] flex flex-col items-center justify-center p-6">
      {/* 로고 영역 */}
      <div className="mb-12 flex flex-col items-center">
        <div className="flex items-center gap-3">
          <div className="w-40 h-40">
            <img
              src="https://fvdyqzogufeurojwjqwt.supabase.co/storage/v1/object/sign/logo/logoColor2.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9jMDY3OTY1My1jNzIxLTRlMGMtYmY2Yy1iZWUwZjBhM2EyMWQiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJsb2dvL2xvZ29Db2xvcjIucG5nIiwiaWF0IjoxNzY5NDEyMzkwLCJleHAiOjE4MDA5NDgzOTB9.3Pz3GYQV0_tskdhOBd95hscuZAA8yao5D6hkHAGGvpQ"
              alt="Logo"
              className="w-full h-full object-contain"
            />
          </div>
        </div>
      </div>

      {/* 로그인 폼 */}
      <form onSubmit={handleSignIn} className="w-full max-w-[400px]">
        <div className="space-y-4">
          <input
            type="email"
            placeholder="아이디"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full h-[50px] px-4 rounded-md border border-gray-200 bg-[#FFEFEF] focus:outline-none focus:ring-1 focus:ring-main-02 placeholder:text-gray-400"
            required
          />
          <input
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full h-[50px] px-4 rounded-md border border-gray-200 bg-[#FFEFEF] focus:outline-none focus:ring-1 focus:ring-main-02 placeholder:text-gray-400"
            required
          />
        </div>

        {/* BtnComp 사용 */}
        <div className="flex flex-col">
          <BtnComp type="submit" size="long" variant="primary">
            로그인
          </BtnComp>

          <Link to="/member/signup" className="w-full">
            <BtnComp
              type="button"
              size="long"
              variant="primary"
              className="mt-4"
            >
              회원가입
            </BtnComp>
          </Link>
        </div>
      </form>
    </div>
  );
}

export default SignIn;
