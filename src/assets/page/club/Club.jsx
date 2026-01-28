import React from "react";
import { Route, Routes, Link } from "react-router-dom";
import ClubDetail from "./ClubDetail";

// 클럽 메인 화면 컴포넌트
function ClubMain() {
  return (
    <>
      <div className="flex flex-col">
        {/* 이거 나중에 버튼으로 연결하세요 */}
        <Link to="detail">Club Detail</Link>
      </div>
      <h3 className="text-main-02">Club</h3>
    </>
  );
}

function Club() {
  return (
    <Routes>
      <Route path="/" element={<ClubMain />} />
      <Route path="detail/*" element={<ClubDetail />} />
    </Routes>
  );
}

export default Club;
