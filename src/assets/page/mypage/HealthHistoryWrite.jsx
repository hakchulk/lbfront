import React from "react";
import { useNavigate } from "react-router-dom";
import BtnComp from "../../../components/BtnComp";

function HealthHistoryWrite() {
  const navigate = useNavigate();

  // 오늘 날짜를 YYYY-MM-DD 형식으로 가져오기
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  const todayString = `${year}-${month}-${day}`;

  const handleSave = () => {
    navigate("/mypage/healthhistory");
  };

  // 입력함수
  function InputRow({ label, placeholder = "" }) {
    return (
      <div className="flex flex-col sm:grid sm:grid-cols-[90px_1fr] items-start sm:items-center gap-2 sm:gap-x-4 min-w-0">
        <span className="!text-sm text-gray-700 whitespace-nowrap">
          {label}
        </span>
        <input
          placeholder={placeholder}
          className="w-full min-w-0 h-9 rounded-md border border-deep bg-white px-3 text-sm placeholder:text-gray-mid focus:outline-none focus:ring-1 focus:ring-main-02"
        />
      </div>
    );
  }

  return (
    <>
      <div className="wrap !mt-0 !bg-light-02">
        <div className="containers">
          {/* sect_tit */}
          <section className="sect_tit flex items-center justify-center mx-0 mt-[50px] border-b-[5px] border-main-02">
            <h3 className=" !text-main-02 mb-[20px] ">
              <span class="material-icons ">directions_run</span>
              나의 운동 기록 하기
            </h3>
          </section>

          <div className="min-tit flex flex-row justify-center items-center bg-main-02 w-[200px] mx-auto text-white py-[5px] border rounded-[20px] mt-[3%]">
            <span className="material-icons mr-1.5">calendar_today</span>
            <span>{todayString}</span>
          </div>

          {/* 입력구간 */}
          <section className="sect1 w-full md:w-[90%] lg:w-[70%] xl:w-[45%] bg-white rounded-[20px] border border-green-800 shadow-[0_4px_4px_rgba(0,0,0,0.15)] mx-auto my-[3%] mb-[5%]">
            <div className="max-w-[920px] mx-auto px-4 sm:px-6 py-6 sm:py-10">
              {/* 코어 */}
              <div className="flex flex-col md:grid md:grid-cols-[150px_1fr] gap-4 md:gap-x-6 mb-6 md:mb-8">
                <h3 className="text-green-800 font-bold !text-2xl leading-10">
                  코어
                </h3>
                <div className="flex flex-col gap-3">
                  <InputRow
                    label="플랭크"
                    placeholder="분 단위로 입력해주세요"
                  />
                </div>
              </div>

              {/* 유산소 */}
              <div className="flex flex-col md:grid md:grid-cols-[150px_1fr] gap-4 md:gap-x-6 mb-6 md:mb-8">
                <h3 className="text-green-800 font-bold !text-2xl leading-10">
                  유산소
                </h3>
                <div className="flex flex-col gap-3">
                  <InputRow label="걷기" placeholder="분 단위로 입력해주세요" />
                  <InputRow
                    label="달리기"
                    placeholder="분 단위로 입력해주세요"
                  />
                  <InputRow
                    label="자전거 타기"
                    placeholder="분 단위로 입력해주세요"
                  />
                  <InputRow
                    label="줄넘기"
                    placeholder="분 단위로 입력해주세요"
                  />
                </div>
              </div>

              {/* 근력 */}
              <div className="flex flex-col md:grid md:grid-cols-[150px_1fr] gap-4 md:gap-x-6 mb-6 md:mb-8">
                <h3 className="text-green-800 font-bold !text-2xl leading-10">
                  근력
                </h3>
                <div className="flex flex-col gap-3">
                  <InputRow
                    label="푸시업/런지"
                    placeholder="분 단위로 입력해주세요"
                  />
                  <InputRow
                    label="웨이트 트레이닝"
                    placeholder="분 단위로 입력해주세요"
                  />
                </div>
              </div>

              {/* 유연성 */}
              <div className="flex flex-col md:grid md:grid-cols-[150px_1fr] gap-4 md:gap-x-6 mb-6 md:mb-8">
                <h3 className="text-green-800 font-bold !text-2xl leading-10">
                  유연성
                </h3>
                <div className="flex flex-col gap-3">
                  <InputRow
                    label="요가/스트레칭"
                    placeholder="분 단위로 입력해주세요"
                  />
                </div>
              </div>

              {/* 종합/HIIT */}
              <div className="flex flex-col md:grid md:grid-cols-[150px_1fr] gap-4 md:gap-x-6 mb-8 md:mb-10">
                <h3 className="text-green-800 font-bold !text-2xl leading-10">
                  종합/HIIT
                </h3>
                <div className="flex flex-col gap-3">
                  <InputRow
                    label="버피 테스트"
                    placeholder="분 단위로 입력해주세요"
                  />
                  <InputRow
                    label="계단 오르기"
                    placeholder="분 단위로 입력해주세요"
                  />
                </div>
              </div>

              {/* 입력 버튼 */}
              <div className="flex justify-center w-[50%] mx-auto">
                <BtnComp
                  variant="primary"
                  size="short"
                  className="!w-[48%] !mt-0 !h-[35px] !text-xs md:!text-sm"
                >
                  계산
                </BtnComp>
              </div>

              {/* 결과 */}
              <p className="text-center mt-6 md:mt-8 text-sm sm:text-base px-6">
                오늘 하신 운동의 칼로리 소모량은{" "}
                <span className="text-red-500 font-bold">10,000Kcal</span>{" "}
                입니다.
              </p>

              {/* 하단 버튼 */}
              <div className="flex gap-2 mt-2 w-[50%] mx-auto py-[5%]">
                <BtnComp
                  variant="primary"
                  size="short"
                  className="!w-[48%] !mt-0 !h-[35px] !text-xs md:!text-sm btn_save  "
                  onClick={handleSave}
                >
                  저장
                </BtnComp>

                <BtnComp
                  variant="point"
                  size="short"
                  className="!w-[48%] !mt-0 !h-[35px] !text-xs md:!text-sm btn_can"
                >
                  취소
                </BtnComp>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}

export default HealthHistoryWrite;
