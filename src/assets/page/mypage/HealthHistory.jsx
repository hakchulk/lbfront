import React from "react";
import BtnComp from "../../../components/BtnComp";
import { useState } from "react";
import PageNatation from "./../../../components/PageNatation";

function HealthHistory() {
  // 정렬 상태 (기본: 최신순)
  const [sort, setSort] = useState("latest");

  // 오운완
  const days = [
    { label: "월", done: true },
    { label: "화", done: true },
    { label: "수", done: true },
    { label: "목", done: false },
    { label: "금", done: false },
    { label: "토", done: false },
    { label: "일", done: false },
  ];

  // 운동 기록 데이터 (추후 API로 받아올 예정)
  const exerciseRecords = [
    {
      id: 1,
      date: "2025-01-01",
      exercises: {
        코어: [{ name: "플랭크", value: "10분" }],
        근력: [{ name: "웨이트 트레이닝", value: "20분" }],
        "종합/HIT": [
          { name: "버피테스트", value: "20분" },
          { name: "계단 오르기", value: "30분" },
        ],
      },
      totalCalories: 500,
    },
    {
      id: 2,
      date: "2024-12-31",
      exercises: {
        코어: [{ name: "플랭크", value: "15분" }],
        근력: [{ name: "웨이트 트레이닝", value: "30분" }],
        "종합/HIT": [{ name: "버피테스트", value: "25분" }],
      },
      totalCalories: 600,
    },
    {
      id: 3,
      date: "2024-12-30",
      exercises: {
        코어: [{ name: "플랭크", value: "12분" }],
        근력: [{ name: "웨이트 트레이닝", value: "25분" }],
        "종합/HIT": [{ name: "계단 오르기", value: "40분" }],
      },
      totalCalories: 550,
    },
    {
      id: 4,
      date: "2024-12-29",
      exercises: {
        코어: [{ name: "플랭크", value: "8분" }],
        근력: [{ name: "웨이트 트레이닝", value: "15분" }],
        "종합/HIT": [
          { name: "버피테스트", value: "15분" },
          { name: "계단 오르기", value: "20분" },
        ],
      },
      totalCalories: 450,
    },
    {
      id: 4,
      date: "2024-12-29",
      exercises: {
        코어: [{ name: "플랭크", value: "8분" }],
        근력: [{ name: "웨이트 트레이닝", value: "15분" }],
        "종합/HIT": [
          { name: "버피테스트", value: "15분" },
          { name: "계단 오르기", value: "20분" },
        ],
      },
      totalCalories: 450,
    },
    {
      id: 4,
      date: "2024-12-29",
      exercises: {
        코어: [{ name: "플랭크", value: "8분" }],
        근력: [{ name: "웨이트 트레이닝", value: "15분" }],
        "종합/HIT": [
          { name: "버피테스트", value: "15분" },
          { name: "계단 오르기", value: "20분" },
        ],
      },
      totalCalories: 450,
    },
    {
      id: 4,
      date: "2024-12-29",
      exercises: {
        코어: [{ name: "플랭크", value: "8분" }],
        근력: [{ name: "웨이트 트레이닝", value: "15분" }],
        "종합/HIT": [
          { name: "버피테스트", value: "15분" },
          { name: "계단 오르기", value: "20분" },
        ],
      },
      totalCalories: 450,
    },
    {
      id: 4,
      date: "2024-12-29",
      exercises: {
        코어: [{ name: "플랭크", value: "8분" }],
        근력: [{ name: "웨이트 트레이닝", value: "15분" }],
        "종합/HIT": [
          { name: "버피테스트", value: "15분" },
          { name: "계단 오르기", value: "20분" },
        ],
      },
      totalCalories: 450,
    },
  ];

  return (
    <>
      <div className="w-full">
        <div className="containers">
          {/* sect_tit */}
          <section className="sect_tit flex items-center justify-center mx-0 mt-[20px] border-b-[5px] border-main-02">
            <h3 className=" !text-main-02 mb-[20px] ">
              <span class="material-icons ">directions_run</span>
              나의 운동 기록
            </h3>
          </section>

          {/* sect01 */}
          <section className="sect01  flex items-center justify-center mt-[20px]">
            <h4 className="tit">
              <span class="material-icons">fitness_center</span>
              오늘은 운동을 하셨나요?
            </h4>
          </section>

          {/* 오운완 */}
          <section className="w-full max-w-[900px] mx-auto">
            <div className="grid grid-cols-7 bg-white rounded-2xl shadow-md my-[2%] border-1 border-gray-mid">
              {days.map((day, idx) => (
                <div
                  key={idx}
                  className="flex flex-col items-center justify-center py-6 border-r last:border-r-0  border-gray-mid"
                >
                  {/* 요일 */}
                  <span className="text-sm font-semibold text-green-700 mb-[10px]">
                    {day.label}
                  </span>

                  {/* 스탬프 */}
                  <img
                    src={
                      day.done
                        ? "https://ynczwbybtbjftkatmcxg.supabase.co/storage/v1/object/sign/LB/ex_s.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV83MjY5YTJlMy0zNGQxLTRkNTMtYWYzMC0wOWM5OTZhMzE0ODMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJMQi9leF9zLnBuZyIsImlhdCI6MTc3MDEwNDM1NSwiZXhwIjoxODAxNjQwMzU1fQ.qhhg6-X00dSR8Her0jEXPmeRWSIqjEcywfS1qfmcuuo"
                        : "https://ynczwbybtbjftkatmcxg.supabase.co/storage/v1/object/sign/LB/ex_f.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV83MjY5YTJlMy0zNGQxLTRkNTMtYWYzMC0wOWM5OTZhMzE0ODMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJMQi9leF9mLnBuZyIsImlhdCI6MTc3MDEwNDI4MSwiZXhwIjoxODAxNjQwMjgxfQ.jGc2SXJBtCtNqLfdYSF8yy-bj08VgcPmgmZVqm9S_50"
                    }
                    alt="stamp"
                    className="w-[30px] aspect-square sm:w-[60px] "
                  />
                </div>
              ))}
            </div>
          </section>

          {/* 나중에 라우터 운동라이트로! */}

          <div className="w-full sm:w-[50%] mx-auto flex items-center justify-center mb-[10%]  ">
            <BtnComp size="mid" variant="primary">
              오늘의 운동 입력하기
            </BtnComp>
          </div>

          {/* sect02 */}
          <section className="sect02 flex items-center flex-col justify-center text-gray-deep">
            <h4 className="tit">
              <span class="material-icons ">directions_run</span>
              운동 기록 리스트
            </h4>
            <div className="filters w-full flex items-center justify-start sm:justify-end gap-2 mt-4">
              <span className="material-icons !text-[30px]">sort</span>

              {/* 최신순 */}
              <button
                type="button"
                onClick={() => setSort("latest")}
                className={`border rounded-[4px] transition-colors ${sort === "latest" ? "bg-deep text-white border-1 border-deep" : "bg-white hover:bg-light-01"}`}
              >
                <p className="px-3 py-1 text-center !text-[14px] md:!text-[18px]">
                  최신순
                </p>
              </button>

              {/* 오래된 순 */}
              <button
                type="button"
                onClick={() => setSort("oldest")}
                className={`border rounded-[4px] transition-colors ${sort === "oldest" ? "bg-deep text-white border-1  border-deep" : "bg-white hover:bg-light-01"}`}
              >
                <p className="px-3 py-1 text-center !text-[14px] md:!text-[18px]">
                  오래된 순
                </p>
              </button>
            </div>
            {/* 리스트 */}
            <div className="hel_list w-full mt-6">
              <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                {exerciseRecords.map((record) => (
                  <li
                    key={record.id}
                    className="bg-white border-[0.5px] border-main-02 rounded-lg p-4 md:p-5 flex flex-col gap-4 lg:min-w-[230px]"
                  >
                    {/* 날짜 */}
                    <div className="text-base md:text-lg font-semibold text-deep border-b border-gray-light pb-2">
                      {record.date}
                    </div>

                    {/* 운동 종류별 그룹 */}
                    <div className="flex flex-col gap-3 grow">
                      {Object.entries(record.exercises).map(
                        ([category, exercises]) => (
                          <div key={category} className="flex flex-col gap-1">
                            <div className="text-sm md:text-base font-semibold text-deep">
                              {category}
                            </div>
                            <div className="flex flex-col gap-1 ml-2">
                              {exercises.map((exercise, idx) => (
                                <div
                                  key={idx}
                                  className="text-xs md:text-sm text-gray-deep flex items-center"
                                >
                                  <span className="mr-1">·</span>
                                  <span>
                                    {exercise.name} : {exercise.value}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>
                        ),
                      )}
                    </div>

                    {/* 총 소모 칼로리 */}
                    <div className="text-base md:text-lg font-semibold text-main-02 border-t border-gray-light pt-3">
                      총 소모 칼로리 {record.totalCalories}kcal
                    </div>

                    {/* 수정, 삭제 버튼 */}
                    <div className="flex gap-2 mt-2">
                      <BtnComp
                        variant="primary"
                        size="short"
                        className="!w-[48%] !mt-0 !h-[35px] !text-xs md:!text-sm"
                      >
                        수정
                      </BtnComp>
                      <BtnComp
                        variant="primary"
                        size="short"
                        className="!w-[48%] !mt-0 !h-[35px] !text-xs md:!text-sm"
                      >
                        삭제
                      </BtnComp>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="w-full mt-[50px]">
              <PageNatation
                storeKey="test-list2"
                totalElements={100}
                pageSize={10}
              />
            </div>
          </section>
        </div>
      </div>
    </>
  );
}

export default HealthHistory;
