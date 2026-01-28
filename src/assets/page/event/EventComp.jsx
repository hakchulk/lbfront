import React from "react";
import { Route, Routes, Link } from "react-router-dom";
import EventDetail from "./EventDetail";

// 이벤트 메인 화면 컴포넌트
function EventMain() {
  return (
    <>
      <h3 className="text-main-02">EventComp</h3>
      {/* http://localhost:5173/event/detail/1  이런식으로 하위 페이지 주소값 나와야 합니다*/}
    </>
  );
}

function EventComp() {
  return (
    <Routes>
      <Route path="/" element={<EventMain />} />
      <Route path="detail/:id" element={<EventDetail />} />
    </Routes>
  );
}

export default EventComp;
