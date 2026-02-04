// import React from "react";
import BtnComp from '../../../components/BtnComp';
import { useState, useEffect, useMemo } from 'react';
import { Link, Routes, Route } from 'react-router-dom';
import PageNatation from './../../../components/PageNatation';
import { getExerciseRecords } from '../../../api/TestHealthData';
import usePaginationStore from '../../../stores/paginationStore';
import Chart from '../../../components/ChartComp';
import HealthHistoryWrite from './HealthHistoryWrite';

function HealthHistoryMain() {
  // 정렬 상태 (UI용, 실제 정렬은 하지 않음)
  const [sort, setSort] = useState('latest');

  // 반응형 pageSize 상태
  const [pageSize, setPageSize] = useState(4);

  const storeKey = 'test-list2';

  // paginationStore에서 현재 페이지 가져오기
  const pagination = usePaginationStore((state) => state.paginations[storeKey]);
  const currentPage = pagination?.currentPage ?? 0;
  const setPageSizeStore = usePaginationStore((state) => state.setPageSize);

  // 화면 크기에 따라 pageSize 설정 (PC: 8개, 태블릿 이하: 4개)
  useEffect(() => {
    const handleResize = () => {
      const newPageSize = window.innerWidth >= 1024 ? 8 : 4;
      setPageSize(newPageSize);
    };

    // 초기 설정
    handleResize();

    // 리사이즈 이벤트 리스너 추가
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // pageSize 변경 시 paginationStore 업데이트
  useEffect(() => {
    setPageSizeStore(storeKey, pageSize);
  }, [pageSize, storeKey, setPageSizeStore]);

  // 오운완
  const days = [
    { label: '월', done: true },
    { label: '화', done: true },
    { label: '수', done: true },
    { label: '목', done: false },
    { label: '금', done: false },
    { label: '토', done: false },
    { label: '일', done: false },
  ];

  // 운동 기록 데이터 (추후 API로 받아올 예정이고 가짜 데이이이-타)
  const exerciseRecords = getExerciseRecords();

  // 차트 옵션 (Chart.js v2)
  const chartOptions = {
    title: {
      display: false,
    },
  };

  // 차트 데이터 생성 (요일별 총 소모 칼로리 - 이번주 vs 지난주)
  const weeklyCalorieData = useMemo(() => {
    const weekDays = ['일', '월', '화', '수', '목', '금', '토'];

    // 현재 날짜 기준으로 이번주와 지난주 범위 계산
    const today = new Date();
    const currentDay = today.getDay(); // 0(일요일) ~ 6(토요일)

    // 이번주 월요일 계산 (월요일 = 1)
    const thisWeekMonday = new Date(today);
    thisWeekMonday.setDate(
      today.getDate() - (currentDay === 0 ? 6 : currentDay - 1),
    );
    thisWeekMonday.setHours(0, 0, 0, 0);

    // 이번주 일요일 계산
    const thisWeekSunday = new Date(thisWeekMonday);
    thisWeekSunday.setDate(thisWeekMonday.getDate() + 6);
    thisWeekSunday.setHours(23, 59, 59, 999);

    // 지난주 월요일 계산
    const lastWeekMonday = new Date(thisWeekMonday);
    lastWeekMonday.setDate(thisWeekMonday.getDate() - 7);

    // 지난주 일요일 계산
    const lastWeekSunday = new Date(thisWeekMonday);
    lastWeekSunday.setDate(thisWeekMonday.getDate() - 1);
    lastWeekSunday.setHours(23, 59, 59, 999);

    // 이번주와 지난주 칼로리 초기화
    const thisWeekCalories = {
      일: 0,
      월: 0,
      화: 0,
      수: 0,
      목: 0,
      금: 0,
      토: 0,
    };

    const lastWeekCalories = {
      일: 0,
      월: 0,
      화: 0,
      수: 0,
      목: 0,
      금: 0,
      토: 0,
    };

    // 각 운동 기록을 순회하며 이번주/지난주 구분하여 요일별 칼로리 합산
    exerciseRecords.forEach((record) => {
      const recordDate = new Date(record.date);
      recordDate.setHours(0, 0, 0, 0);

      // 이번주 범위 확인
      if (recordDate >= thisWeekMonday && recordDate <= thisWeekSunday) {
        const dayIndex = recordDate.getDay();
        const dayName = weekDays[dayIndex];
        thisWeekCalories[dayName] += record.totalCalories;
      }
      // 지난주 범위 확인
      else if (recordDate >= lastWeekMonday && recordDate <= lastWeekSunday) {
        const dayIndex = recordDate.getDay();
        const dayName = weekDays[dayIndex];
        lastWeekCalories[dayName] += record.totalCalories;
      }
    });

    return {
      labels: ['월', '화', '수', '목', '금', '토', '일'],
      datasets: [
        {
          label: '지난주',
          data: [
            lastWeekCalories.월,
            lastWeekCalories.화,
            lastWeekCalories.수,
            lastWeekCalories.목,
            lastWeekCalories.금,
            lastWeekCalories.토,
            lastWeekCalories.일,
          ],
          backgroundColor: '#DFF0FF',
          borderColor: '#A7D6FF',
          borderWidth: 1,
        },
        {
          label: '이번주',
          data: [
            thisWeekCalories.월,
            thisWeekCalories.화,
            thisWeekCalories.수,
            thisWeekCalories.목,
            thisWeekCalories.금,
            thisWeekCalories.토,
            thisWeekCalories.일,
          ],
          backgroundColor: '#D9FFD5',
          borderColor: '#AFE1AA',
          borderWidth: 1,
        },
      ],
    };
  }, [exerciseRecords]);

  // 페이지네이션된 데이터 (정렬하지 않음)
  const paginatedRecords = useMemo(() => {
    const startIndex = currentPage * pageSize;
    const endIndex = startIndex + pageSize;
    return exerciseRecords.slice(startIndex, endIndex);
  }, [exerciseRecords, currentPage, pageSize]);

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
                        ? 'https://ynczwbybtbjftkatmcxg.supabase.co/storage/v1/object/sign/LB/ex_s.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV83MjY5YTJlMy0zNGQxLTRkNTMtYWYzMC0wOWM5OTZhMzE0ODMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJMQi9leF9zLnBuZyIsImlhdCI6MTc3MDEwNDM1NSwiZXhwIjoxODAxNjQwMzU1fQ.qhhg6-X00dSR8Her0jEXPmeRWSIqjEcywfS1qfmcuuo'
                        : 'https://ynczwbybtbjftkatmcxg.supabase.co/storage/v1/object/sign/LB/ex_f.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV83MjY5YTJlMy0zNGQxLTRkNTMtYWYzMC0wOWM5OTZhMzE0ODMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJMQi9leF9mLnBuZyIsImlhdCI6MTc3MDEwNDI4MSwiZXhwIjoxODAxNjQwMjgxfQ.jGc2SXJBtCtNqLfdYSF8yy-bj08VgcPmgmZVqm9S_50'
                    }
                    alt="stamp"
                    className="w-[30px] aspect-square sm:w-[60px] "
                  />
                </div>
              ))}
            </div>
          </section>

          <Link to="../healthhistoywrite">
            <div className="w-full sm:w-[50%] mx-auto flex items-center justify-center mb-[5%]  ">
              <BtnComp size="mid" variant="primary">
                오늘의 운동 입력하기
              </BtnComp>
            </div>
          </Link>

          {/* sect02 */}
          <div className=" bg-light-02 myBg py-[10%]">
            <section className="containers sect02 flex items-center flex-col justify-center text-gray-deep ">
              <h4 className="tit">
                <span class="material-icons ">directions_run</span>
                운동 기록 리스트
              </h4>
              <div className="filters w-full flex items-center justify-start sm:justify-end gap-2 mt-4">
                <span className="material-icons !text-[30px]">sort</span>

                {/* 최신순 */}
                <button
                  type="button"
                  onClick={() => setSort('latest')}
                  className={`border rounded-[4px] transition-colors ${sort === 'latest' ? 'bg-deep text-white border-1 border-deep' : 'bg-white hover:bg-light-01'}`}
                >
                  <p className="px-3 py-1 text-center !text-[14px] md:!text-[18px]">
                    최신순
                  </p>
                </button>

                {/* 오래된 순 */}
                <button
                  type="button"
                  onClick={() => setSort('oldest')}
                  className={`border rounded-[4px] transition-colors ${sort === 'oldest' ? 'bg-deep text-white border-1  border-deep' : 'bg-white hover:bg-light-01'}`}
                >
                  <p className="px-3 py-1 text-center !text-[14px] md:!text-[18px]">
                    오래된 순
                  </p>
                </button>
              </div>
              {/* 리스트 */}
              <div className="hel_list w-full mt-6">
                <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                  {paginatedRecords.map((record) => (
                    <li
                      key={record.id}
                      className="bg-white border-[0.5px] border-main-02 rounded-lg p-4 md:p-5 flex flex-col gap-4 lg:min-w-[230px]"
                    >
                      {/* 날짜 */}
                      <div className="text-base md:text-lg font-semibold text-gray-deep border-b border-gray-light pb-2">
                        {record.date}
                      </div>

                      {/* 운동 종류별 그룹 */}
                      <div className="flex flex-col gap-3 grow">
                        {Object.entries(record.exercises).map(
                          ([category, exercises]) => (
                            <div key={category} className="flex flex-col gap-1">
                              <div className="text-lg md:text-xlg font-semibold text-deep">
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
                      <div className="text-xl md:text-lg font-semibold text-main-02 border-t border-gray-light pt-3">
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
                  storeKey={storeKey}
                  totalElements={exerciseRecords.length}
                  pageSize={pageSize}
                />
              </div>
            </section>
          </div>

          {/* sect03 */}
          <section className="sect03">
            <div className="min-tit flex flex-row justify-center items-center bg-main-02 w-[200px] mx-auto text-white py-[5px] border rounded-[20px] mt-[5%]">
              <span className="material-icons mr-1.5">calendar_today</span>
              <span>주간 운동 기록 비교</span>
            </div>

            <div className="w-full mt-8 xl:w-[70%] flex  justify-center items-center mx-auto ">
              <Chart
                type="bar"
                data={weeklyCalorieData}
                options={{
                  plugins: {
                    title: {
                      display: false,
                    },
                  },
                }}
              />
            </div>
          </section>
        </div>
      </div>
    </>
  );
}

function HealthHistory() {
  return (
    <Routes>
      <Route path="/" element={<HealthHistoryMain />} />
      <Route path="healthhistoywrite" element={<HealthHistoryWrite />} />
    </Routes>
  );
}

export default HealthHistory;
