import React from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import FoodHistory from './FoodHistory';
import HealthHistory from './HealthHistory';
import FoodManagement from './FoodManagement';
import MyInfo from './MyInfo';
import WeekHistory from './WeekHistory';
import CMHistory from './CMHistory';

// 마이페이지 메인 화면 컴포넌트
function MyPageMain() {
  return (
    <div className="p-6">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <Link
          to="foodhistory"
          className="p-4 bg-white border-2 border-main-02 shadow rounded hover:bg-main-02 text-center"
        >
          오늘 식사 기록
        </Link>
        <Link
          to="healthhistory"
          className="p-4 bg-white border-2 border-main-02 shadow rounded hover:bg-main-02 text-center"
        >
          나의 운동 기록
        </Link>
        <Link
          to="foodmanagement"
          className="p-4 bg-white border-2 border-main-02 shadow rounded hover:bg-main-02 text-center"
        >
          오늘 식단 추천
        </Link>
        <Link
          to="myinfo"
          className="p-4 bg-white border-2 border-main-02 shadow rounded hover:bg-main-02 text-center"
        >
          내 정보 수정
        </Link>
        <Link
          to="weekhistory"
          className="p-4 bg-white border-2 border-main-02 shadow rounded hover:bg-main-02 text-center"
        >
          주간 체중 기록
        </Link>
        <Link
          to="cmhistory"
          className="p-4 bg-white border-2 border-main-02 shadow rounded hover:bg-main-02 text-center"
        >
          나의 커뮤니티 활동
        </Link>
      </div>
    </div>
  );
}
// function MyPageMain() {
//   return (
//     <>
//       <div className="flex flex-col">
//         <Link
//           to="foodhistory"
//           className="p-4 bg-white shadow rounded hover:bg-gray-50 text-center"
//         >
//           오늘 식사 기록
//         </Link>
//         <Link to="healthhistory">health history</Link>
//         <Link to="foodmanagement">food management</Link>
//         <Link to="myinfo">my info</Link>
//         <Link to="weekhistory">week history</Link>
//         <Link to="cmhistory">community History</Link>
//       </div>
//       <h3 className="text-main-02">MyPage</h3>
//     </>
//   );
// }

function MyPage() {
  return (
    <Routes>
      <Route path="/" element={<MyPageMain />} />
      <Route path="foodhistory" element={<FoodHistory />} />
      <Route path="healthhistory" element={<HealthHistory />} />
      <Route path="foodmanagement" element={<FoodManagement />} />
      <Route path="myinfo" element={<MyInfo />} />
      <Route path="weekhistory" element={<WeekHistory />} />
      <Route path="cmhistory" element={<CMHistory />} />
    </Routes>
  );
}

export default MyPage;
