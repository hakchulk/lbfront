import React from 'react';
import { Route, Routes, Link, Outlet } from 'react-router-dom';
import FoodHistory from './FoodHistory';
import HealthHistory from './HealthHistory';
import FoodManagement from './FoodManagement';
import MyInfo from './MyInfo';
import WeekHistory from './WeekHistory';
import CMHistory from './CMHistory';
import Food_HistoryWrite from './Food_HistoryWrite';
import Chart from '../../../components/ChartComp';
import { getPieChartData2 } from '../../../api/TestChartData';

// 마이페이지 메인 화면 컴포넌트
function MyPageMain() {
  return (
    <div className="wrap bg-[#FFF3F3] py-10">
      <section className="containers mx-auto px-4">
        <h2 className="text-2xl font-bold text-center mb-10">
          마이페이지 대시보드
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* 오늘 식사 기록 */}
          <Link to="foodhistory" className="block">
            <div className="bg-white rounded-xl border border-main-02 p-6 text-center hover:shadow-lg transition">
              <h3 className="font-semibold mb-4">오늘 식사 기록</h3>
              <div className=" mx-auto">
                <Chart type="pie" data={getPieChartData2()} />
              </div>
            </div>
          </Link>

          {/* 나의 운동 기록 */}
          <Link to="healthhistory" className="block">
            <div className="bg-white rounded-xl border border-main-02 p-6 text-center hover:shadow-lg transition">
              <h3 className="font-semibold mb-4">나의 운동 기록</h3>
              <div className="h-[200px]">
                {/* <Chart type="bar" data={getExerciseChartData()} /> */}
              </div>
            </div>
          </Link>

          {/* 주간 체중 기록 */}
          <Link to="weekhistory" className="block">
            <div className="bg-white rounded-xl border border-main-02 p-6 text-center hover:shadow-lg transition">
              <h3 className="font-semibold mb-4">주간 체중 기록</h3>
              <div className="h-[200px]">
                {/* <Chart type="line" data={getWeeklyWeightData()} /> */}
              </div>
            </div>
          </Link>

          {/* 나의 커뮤니티 활동 */}
          <Link to="cmhistory" className="block">
            <div className="bg-white rounded-xl border border-main-02 p-6 text-center hover:shadow-lg transition">
              <h3 className="font-semibold mb-4">나의 커뮤니티 활동</h3>
              <div className="h-[200px]">
                {/* <Chart type="line" data={getCommunityChartData()} /> */}
              </div>
            </div>
          </Link>

          {/* 오늘 식단 추천 */}
          <Link to="foodmanagement" className="block">
            <div className="bg-white rounded-xl border border-main-02 p-6 text-center hover:shadow-lg transition">
              <h3 className="font-semibold mb-4">오늘 식단 추천</h3>
              <div className="w-[200px] h-[200px] mx-auto">
                {/* <Chart type="doughnut" data={getRecommendChartData()} /> */}
              </div>
            </div>
          </Link>

          {/* 내 정보 수정 */}
          <Link to="myinfo" className="block">
            <div className="bg-white rounded-xl border border-main-02 p-6 text-center hover:shadow-lg transition flex flex-col items-center justify-center">
              <h3 className="font-semibold mb-4">내 정보 수정</h3>
              <div className="w-[120px] h-[120px] bg-orange-100 rounded-2xl flex items-center justify-center">
                <i className="fa-solid fa-user-pen text-4xl text-main-02" />
              </div>
            </div>
          </Link>
        </div>
      </section>
    </div>
  );
}

function MyPage() {
  return (
    <Routes>
      <Route path="/" element={<MyPageMain />} />
      <Route path="foodhistory" element={<FoodHistory />} />
      <Route path="food_historywrite" element={<Food_HistoryWrite />} />
      <Route path="healthhistory" element={<HealthHistory />} />
      <Route path="healthhistory/*" element={<HealthHistory />} />
      <Route path="foodmanagement" element={<FoodManagement />} />
      <Route path="myinfo" element={<MyInfo />} />
      <Route path="weekhistory" element={<WeekHistory />} />
      <Route path="cmhistory" element={<CMHistory />} />
    </Routes>
  );
}

export default MyPage;
