import React from "react";
import { Route, Routes, Link } from "react-router-dom";
import ClubPostList from "./ClubPostList";

// 클럽 상세 메인 화면 컴포넌트
function ClubDetailMain() {
  return (
    <>
      <div className="flex flex-col">
        {/* 이거 나중에 버튼이나 페이지로 연결하세요 */}
        <Link to="postlist">Club Post List</Link>
      </div>
      <h3 className="text-main-02">ClubDetail</h3>
    </>
  );
}

function ClubDetail() {
  return (
    <Routes>
      <Route path="/" element={<ClubDetailMain />} />
      <Route path="postlist/*" element={<ClubPostList />} />
    </Routes>
  );
}

export default ClubDetail;
