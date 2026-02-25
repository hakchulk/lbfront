import { useMemo } from 'react';
import { Route, Routes, Link, Outlet } from 'react-router-dom';
import FoodHistory from './FoodHistory';
import HealthHistory from './HealthHistory';
import FoodManagement from './FoodManagement';
import MyInfo from './MyInfo';
import WeekHistory from './WeekHistory';
import CMHistory from './CMHistory';
import Food_HistoryWrite from './Food_HistoryWrite';
import MyInfoTitle from './MyInfoTitle';
import Chart from '../../../components/ChartComp';
import {
  getPieChartData2,
  WeightChart,
  getDonutChartData1,
  CmChart,
} from '../../../api/TestChartData';

// 마이페이지 메인 화면 컴포넌트
function MyPageMain() {
  return (
    <>
      <div className="wrap !bg-light-02 !mt-0  md:min-h-[calc(100vh-180px)] flex justify-center items-center">
        <header className="relative w-full h-[300px] overflow-hidden">
          {/* 배경 이미지 */}
          <img
            src="https://ynczwbybtbjftkatmcxg.supabase.co/storage/v1/object/sign/LB/sal.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV83MjY5YTJlMy0zNGQxLTRkNTMtYWYzMC0wOWM5OTZhMzE0ODMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJMQi9zYWwucG5nIiwiaWF0IjoxNzY5NzU2MjI0LCJleHAiOjE4MDEyOTIyMjR9.3TsRR1yE6Bncxz9AmLaxFi-6DQdqfu-0TE3lhtAvcdo"
            alt="img"
            className="absolute inset-0 w-full h-full object-cover object-center opacity-60"
          />

          {/* 어두운 오버레이(가독성 개선, 선택) */}
          <div className="absolute inset-0 bg-black/10"></div>

          {/* 텍스트 레이어 */}
          <div className="relative z-10 w-full h-full flex flex-col items-center justify-center">
            <h3 className="text-white text-2xl md:text-3xl font-semibold drop-shadow">
              이하늘 님을 위한 밸런스 체크 공간입니다
              <hr className="my-4 w-full border-t-4 border-main-02" />
            </h3>
            <p className="text-white">
              매일 작은 변화들을 쌓아가며, 건강한 습관을 만들어보세요!
            </p>
            <p className="text-white">
              조금씩달라지는 몸과 마음이 스스로에게 가장 큰 보상이 됩니다.
            </p>
          </div>
        </header>
        <div className="containers">
          <MyInfoTitle />

          {/* 나머지 */}
          <section className="helpme mt-[3%] pb-[10%]">
            <ul className="w-full flex flex-row gap-y-10 justify-between flex-wrap">
              <li className="w-full md:w-[45%] lg:w-[30%]">
                <Link
                  to="foodhistory"
                  className="flex flex-col justify-center items-center"
                >
                  <h4 className="text-deep mb-[3%]">오늘 식사 기록</h4>
                  <div className="border border-main-02 w-[100%] h-[100%] overflow-hidden rounded-[20px] flex justify-center items-center">
                    <div className="w-[70%]">
                      <Chart
                        type="pie"
                        data={getPieChartData2()}
                        options={{
                          responsive: true,
                          maintainAspectRatio: false,
                        }}
                      />
                    </div>
                  </div>
                </Link>
              </li>

              <li className="w-full md:w-[45%] lg:w-[30%]">
                <Link
                  to="healthhistory "
                  className="flex flex-col justify-center items-center"
                >
                  <h4 className="text-deep mb-[3%]">나의 운동 기록</h4>
                  <div className="border border-main-02 w-[100%] h-[100%] overflow-hidden rounded-[20px] flex justify-center items-center">
                    <div className="w-[70%]">
                      <Chart
                        type="pie"
                        data={getPieChartData2()}
                        options={{
                          responsive: true,
                          maintainAspectRatio: false,
                        }}
                      />
                    </div>
                  </div>
                </Link>
              </li>

              <li className="w-full md:w-[45%] lg:w-[30%]">
                <Link
                  to="weekhistory"
                  className="flex flex-col justify-center items-center"
                >
                  <h4 className="text-deep mb-[3%]">주간 체중 기록</h4>
                  <div className="border border-main-02 w-[100%] h-[100%] overflow-hidden rounded-[20px] flex justify-center items-center">
                    <div className="w-[70%]  ">
                      <Chart
                        type="line"
                        data={WeightChart()}
                        options={{
                          maintainAspectRatio: false,
                          plugins: {
                            title: {
                              display: false,
                            },
                          },
                        }}
                      />
                    </div>
                  </div>
                </Link>
              </li>

              <li className="w-full md:w-[45%] lg:w-[30%]">
                <Link
                  to="cmhistory"
                  className="flex flex-col justify-center items-center"
                >
                  <h4 className="text-deep mb-[3%]">나의 커뮤니티 활동</h4>
                  <div className="border border-main-02 w-[100%] h-[100%] overflow-hidden rounded-[20px] flex justify-center items-center">
                    <div className="w-[70%]">
                      <Chart
                        type="line"
                        data={CmChart()}
                        options={{
                          maintainAspectRatio: false,
                          plugins: {
                            title: {
                              display: false,
                            },
                          },
                        }}
                      />
                    </div>
                  </div>
                </Link>
              </li>

              <li className="w-full md:w-[45%] lg:w-[30%]">
                <Link
                  to="foodmanagement"
                  className="flex flex-col justify-center items-center"
                >
                  <h4 className="text-deep mb-[3%]">오늘의 식단 추천</h4>
                  <div className="border border-main-02 w-[100%] h-[100%] overflow-hidden rounded-[20px] flex justify-center items-center">
                    <div className="w-[70%]]">
                      <Chart
                        type="donut"
                        data={getDonutChartData1()}
                        options={{
                          responsive: true,
                          maintainAspectRatio: false,
                        }}
                      />
                    </div>
                  </div>
                </Link>
              </li>

              <li className="w-full md:w-[45%] lg:w-[30%]">
                <Link
                  to="myinfo"
                  className="flex flex-col justify-center items-center"
                >
                  <h4 className="text-deep mb-[3%]">내정보 수정</h4>
                  <div className="border border-main-02 w-[100%] h-[100%] overflow-hidden rounded-[20px] flex justify-center items-center">
                    <div className="w-[480px] h-[402px] flex">
                      <img
                        className="h-full object-contain"
                        src="https://tcrvvxreqanojyitggun.supabase.co/storage/v1/object/sign/LB/myinfo_icon.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8zMmQ3ZWQ0Ni0xYzhjLTQ1NzgtYjAyMC1hYmMxNGQyMTg1ZmUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJMQi9teWluZm9faWNvbi5wbmciLCJpYXQiOjE3NzAzNjUzODMsImV4cCI6MTgwMTkwMTM4M30.KoyaxRlICl6mfJoSlR9fksEvrxQdeDx067Atcyfy8GQ"
                        alt="img"
                      />
                    </div>
                  </div>
                </Link>
              </li>
            </ul>
          </section>
        </div>
      </div>
    </>
  );
}

function MyPage() {
  return (
    <Routes>
      <Route path="/" element={<MyPageMain />} />
      <Route path="foodhistory" element={<FoodHistory />} />
      <Route path="food_historywrite" element={<Food_HistoryWrite />} />
      <Route path="healthhistory/*" element={<HealthHistory />} />
      <Route path="foodmanagement" element={<FoodManagement />} />
      <Route path="myinfo" element={<MyInfo />} />
      <Route path="weekhistory" element={<WeekHistory />} />
      <Route path="cmhistory" element={<CMHistory />} />
    </Routes>
  );
}

export default MyPage;
