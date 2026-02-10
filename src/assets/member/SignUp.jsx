import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import BtnComp from "../../components/BtnComp";
import { checkEmailAvailability, callSignUp } from "../../api/auth";

const GOAL_OPTIONS = [
  "체중감량",
  "건강유지",
  "근육량증가",
  "혈당관리",
  "콜레스테롤",
];
const ALLERGY_OPTIONS = [
  "우유",
  "달걀",
  "생선",
  "갑각류",
  "견과류",
  "땅콩",
  "밀",
  "기타",
];

function SignUp() {
  const navigate = useNavigate();
  const emailCheckBtnRef = useRef(null); // 중복 체크 버튼 ref
  const [isEmailChecked, setIsEmailChecked] = useState(false); // 중복 체크 여부 상태
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    passwordConfirm: "",
    name: "",
    phone: "",
    gender: "M",
    birthYear: "",
    birthMonth: "",
    birthDay: "",
    height: "",
    weight: "",
    target_date: "30",
    goal: "체중감량",
    goal_weight: "",
    selectedAllergies: [],
    special_notes: "",
  });

  // 중복 확인 버튼 핸들러
  const handleEmailCheck = async () => {
    if (!formData.email) {
      alert("이메일을 입력해 주세요.");
      return;
    }
    try {
      const isExist = await checkEmailAvailability(formData.email);
      if (isExist) {
        alert("이미 사용 중인 이메일입니다.");
        setIsEmailChecked(false);
      } else {
        alert("사용 가능한 이메일입니다.");
        setIsEmailChecked(true);
      }
    } catch (error) {
      alert("중복 체크에 실패했습니다. 다시 시도해 주세요.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (name === "email") setIsEmailChecked(false); // 이메일 수정 시 중복체크 다시 하도록 초기화
  };

  const handleAllergyClick = (allergy) => {
    setFormData((prev) => ({
      ...prev,
      selectedAllergies: prev.selectedAllergies.includes(allergy)
        ? prev.selectedAllergies.filter((a) => a !== allergy)
        : [...prev.selectedAllergies, allergy],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 이메일 중복 체크 확인
    if (!isEmailChecked) {
      alert("이메일 중복 체크를 완료해주세요.");
      emailCheckBtnRef.current?.focus();
      return;
    }

    if (formData.password !== formData.passwordConfirm) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    const requestData = {
      email: formData.email,
      password: formData.password,
      name: formData.name,
      phone: formData.phone,
      gender: formData.gender,
      birthday: `${formData.birthYear}-${formData.birthMonth.padStart(2, "0")}-${formData.birthDay.padStart(2, "0")}`,
      height: parseFloat(formData.height),
      weight: parseFloat(formData.weight),
      target_date: parseInt(formData.target_date),
      goal: formData.goal,
      goal_weight: parseFloat(formData.goal_weight),
      allergies: formData.selectedAllergies.join(","),
      special_notes: formData.special_notes,
    };

    await callSignUp(requestData);
    alert("회원가입이 완료되었습니다.");
    navigate("/member/signin");
  };

  return (
    <div className="wrap !bg-light-03 min-h-screen !mt-0">
      <div className="containers">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-lg mx-auto py-10 space-y-5"
        >
          {/* 타이틀 및 아이콘 한 줄 정렬 (가운데 정렬) */}
          <div className="flex flex-row items-center justify-center gap-2 mb-10">
            <span className="material-icons text-5xl leading-none text-deep">
              account_circle
            </span>
            <h4 className="text-2xl font-bold leading-none text-deep !m-0">
              회원 가입
            </h4>
          </div>

          {/* 기본 입력 정보 */}
          <input
            type="text"
            name="name"
            placeholder="이름"
            onChange={handleChange}
            className="w-full p-3 border  border-main-02 rounded-md bg-white text-black"
            required
          />

          <div className="flex gap-2 items-end">
            <input
              type="email"
              name="email"
              placeholder="이메일"
              onChange={handleChange}
              className="flex-1 p-3 border  border-main-02 rounded-md bg-white text-black"
              required
            />
            <BtnComp
              ref={emailCheckBtnRef}
              size="short"
              variant="primary"
              type="button"
              className="mt-0 h-[48px]"
              onClick={handleEmailCheck}
            >
              중복확인
            </BtnComp>
          </div>

          <input
            type="password"
            name="password"
            placeholder="비밀번호"
            onChange={handleChange}
            className="w-full p-3 border  border-main-02 rounded-md bg-white text-black"
            required
          />
          <input
            type="password"
            name="passwordConfirm"
            placeholder="비밀번호 확인"
            onChange={handleChange}
            className="w-full p-3 border border-main-02 rounded-md bg-white text-black"
            required
          />

          <div className="flex gap-2">
            <input
              type="text"
              name="birthYear"
              placeholder="년(4자)"
              onChange={handleChange}
              className="flex-1 p-3 border  border-main-02 rounded-md bg-white"
            />
            <input
              type="text"
              name="birthMonth"
              placeholder="월"
              onChange={handleChange}
              className="w-24 p-3 border  border-main-02 rounded-md bg-white"
            />
            <input
              type="text"
              name="birthDay"
              placeholder="일"
              onChange={handleChange}
              className="w-24 p-3 border  border-main-02 rounded-md bg-white"
            />
          </div>

          <input
            type="text"
            name="phone"
            placeholder="휴대폰번호"
            onChange={handleChange}
            className="w-full p-3 border  border-main-02 rounded-md bg-white"
          />

          {/* 성별 선택 */}
          <div className="flex items-center gap-6 py-2 text-deep font-bold">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="gender"
                value="M"
                checked={formData.gender === "M"}
                onChange={handleChange}
                className="accent-main-02"
              />{" "}
              남
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="gender"
                value="W"
                checked={formData.gender === "W"}
                onChange={handleChange}
                className="accent-main-02"
              />{" "}
              여
            </label>
          </div>

          {/* 신체 스펙 */}
          <div className="grid grid-cols-3 gap-2">
            <input
              type="number"
              name="height"
              placeholder="키(cm)"
              onChange={handleChange}
              className="p-3 border  border-main-02 rounded-md bg-white"
            />
            <input
              type="number"
              name="weight"
              placeholder="몸무게(kg)"
              onChange={handleChange}
              className="p-3 border border-main-02 rounded-md bg-white"
            />
            <input
              type="number"
              name="goal_weight"
              placeholder="목표(kg)"
              onChange={handleChange}
              className="p-3 border border-main-02 rounded-md bg-white"
            />
          </div>

          {/* 가입 목적 (BtnComp로 교체) */}
          <div>
            <p className="font-bold text-deep mb-3 flex items-center gap-1">
              가입 목적 ✓
            </p>
            <div className="flex gap-2 flex-wrap">
              {GOAL_OPTIONS.map((g) => (
                <BtnComp
                  key={g}
                  type="button"
                  size="short"
                  variant={formData.goal === g ? "primary" : "line"}
                  className={`mt-0 h-[36px] w-auto px-2 sm:px-4 border-none text-xs sm:text-sm ${
                    formData.goal === g
                      ? "bg-deep"
                      : "bg-main-02 text-white  hover:bg-main-01"
                  }`}
                  onClick={() => setFormData((p) => ({ ...p, goal: g }))}
                >
                  {g}
                </BtnComp>
              ))}
            </div>
          </div>

          {/* 목표 기간 */}
          <div>
            <p className="font-bold text-deep mb-2 flex items-center gap-1">
              목표 기간{" "}
              <span className="material-icons text-sm">calendar_today</span>
            </p>
            <input
              min="30"
              type="number"
              name="target_date"
              placeholder="목표 기간을 입력해 주세요 (일)"
              onChange={handleChange}
              className="w-full p-3 border border-main-02 rounded-md bg-white"
            />
          </div>

          {/* 알러지 여부 체크 (BtnComp로 교체) */}
          <div>
            <p className="font-bold text-deep mb-3 flex items-center gap-1">
              알러지 여부 체크 ✓
            </p>
            <div className="grid grid-cols-4 gap-2">
              {ALLERGY_OPTIONS.map((a) => (
                <BtnComp
                  key={a}
                  type="button"
                  size="short"
                  variant={
                    formData.selectedAllergies.includes(a) ? "primary" : "line"
                  }
                  className={`mt-0 h-[36px] w-full border-none ${
                    formData.selectedAllergies.includes(a)
                      ? "bg-deep"
                      : "bg-main-02 text-white  hover:bg-main-01"
                  }`}
                  onClick={() => handleAllergyClick(a)}
                >
                  {a}
                </BtnComp>
              ))}
            </div>
          </div>

          <textarea
            name="special_notes"
            placeholder="특이사항"
            onChange={handleChange}
            className="w-full p-3 border border-main-02 rounded-md h-24 bg-white"
          />

          {/* 최종 가입 버튼 */}
          <div className="pt-1 sm:pt-4">
            <BtnComp size="long" variant="primary" type="submit">
              회원가입
            </BtnComp>
          </div>

          <div className="text-center ">
            <Link
              to="/member/signin"
              className="text-gray-mid text-sm hover:underline"
            >
              이미 계정이 있으신가요? 로그인
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
