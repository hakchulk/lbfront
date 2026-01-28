import React from "react";
import { Route, Routes } from "react-router-dom";
import NavComp from "./components/NavComp";
import FooterComp from "./components/FooterComp";
import Home from "./assets/page/home/Home";
import Member from "./assets/member/Member";
import About from "./assets/page/about/About";
import Club from "./assets/page/club/Club";
import EventComp from "./assets/page/event/EventComp";
import MyPage from "./assets/page/mypage/MyPage";

function App() {
  return (
    <>
      <NavComp />
      {/* 네브가 fixed 이므로, 네브 높이(4rem) 만큼 위 여백을 줘서 내용이 가려지지 않도록 함 */}
      <div className="pt-16">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/member/*" element={<Member />} />
          <Route path="/about" element={<About />} />
          <Route path="/club/*" element={<Club />} />
          <Route path="/event/*" element={<EventComp />} />
          <Route path="/mypage/*" element={<MyPage />} />
        </Routes>
      </div>
      <FooterComp />
    </>
  );
}

export default App;
