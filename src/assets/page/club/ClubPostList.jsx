import React from "react";
import { Route, Routes, Link } from "react-router-dom";
import ClubPosting from "./ClubPosting";
import ClubPostWrite from "./ClubPostWrite";

// 게시글 리스트 메인 화면 컴포넌트
function ClubPostListMain() {
  return (
    <>
      <div className="flex flex-col">
        {/* 이거 나중에 버튼이나 페이지로 연결하세요 */}
        <Link to="posting/1">Club Posting</Link>

        {/* 이거 나중에 버튼이나 페이지로 연결하세요 */}
        <Link to="postwrite">Club Post Write</Link>
      </div>
      <h3 className="text-main-02">ClubPostList</h3>
    </>
  );
}

function ClubPostList() {
  return (
    <Routes>
      <Route path="/" element={<ClubPostListMain />} />
      <Route path="posting/:id" element={<ClubPosting />} />
      <Route path="postwrite" element={<ClubPostWrite />} />
    </Routes>
  );
}

export default ClubPostList;
