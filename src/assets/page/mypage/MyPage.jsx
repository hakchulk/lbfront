import React from "react";
import { Route, Routes, Link } from "react-router-dom";
import FoodHistory from "./FoodHistory";
import HealthHistory from "./HealthHistory";
import FoodManagement from "./FoodManagement";
import MyInfo from "./MyInfo";
import WeekHistory from "./WeekHistory";
import CMHistory from "./CMHistory";

// 마이페이지 메인 화면 컴포넌트
function MyPageMain() {
  return (
    <>
      <div className="flex flex-col">
        <Link to="foodhistory">food history</Link>
        <Link to="healthhistory">health history</Link>
        <Link to="foodmanagement">food management</Link>
        <Link to="myinfo">my info</Link>
        <Link to="weekhistory">week history</Link>
        <Link to="cmhistory">community History</Link>
      </div>
      <h3 className="text-main-02">MyPage</h3>
    </>
  );
}

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
