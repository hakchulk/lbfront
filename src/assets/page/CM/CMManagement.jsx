import React from "react";
import { Route, Routes, Link } from "react-router-dom";
import CMopen from "./CMopen";
import CMjoinlist from "./CMjoinlist";
import Noticemanagement from "./Noticemanagement";

function CMManagementMain() {
  return (
    <>
      <div className="wrap !bg-light-02 !mt-0 pt-[50px] md:min-h-[calc(100vh-180px)] flex justify-center items-center">
        <div className="containers">
          {/* 프로필 */}
          <section className="profile mt-[5%] w-full md:w-[50%] mx-auto flex items-center justify-center p-4 rounded-[20px]">
            <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6">
              {/* 프로필 이미지 */}
              <div className="pf_img w-[64px] h-[64px] bg-gray-deep rounded-full overflow-hidden flex-shrink-0">
                <img
                  src="https://ynczwbybtbjftkatmcxg.supabase.co/storage/v1/object/sign/LB/KakaoTalk_20251215_235650856.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV83MjY5YTJlMy0zNGQxLTRkNTMtYWYzMC0wOWM5OTZhMzE0ODMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJMQi9LYWthb1RhbGtfMjAyNTEyMTVfMjM1NjUwODU2LnBuZyIsImlhdCI6MTc3MDE5NDc5OCwiZXhwIjoxODAxNzMwNzk4fQ.ZJpgBLlzkCZVPseq-OEQfutNUTFinQ3JlZByBdymIpk"
                  alt="img"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* 이름 / 정보 */}
              <div className="flex flex-col min-w-[120px] items-center md:items-start">
                <div className="flex items-center gap-2">
                  <span className="text-black font-semibold text-base">
                    홍지승
                  </span>
                  <div className="bg-main-02 rounded-full text-white w-[22px] h-[22px] flex items-center justify-center text-sm">
                    <i className="fa-solid fa-mars"></i>
                  </div>
                </div>
                <span className="text-sm text-gray-600">178cm / 50kg</span>
              </div>

              {/* 관리자 뱃지 */}
              <div className="bg-[#d9fbd3] px-4 py-2 rounded-[14px] flex items-center gap-2">
                <i className="fa-solid fa-users text-green-700"></i>
                <span className="text-green-900 font-semibold text-sm whitespace-nowrap">
                  고기 고기 모임 커뮤니티 관리자
                </span>
              </div>
            </div>
          </section>

          {/* 나머지 */}
          <section className="helpme mt-[3%] pb-[10%]">
            <ul className="w-full flex flex-col md:flex-row md:justify-between items-center gap-4 md:gap-0">
              <li className="w-full md:w-[30%]">
                <Link
                  to="cmopen"
                  className="flex flex-col justify-center items-center"
                >
                  <h4 className="text-deep">커뮤니티 개설하기</h4>
                  <div className="border border-main-02 overflow-hidden rounded-[20px]">
                    <img
                      src="https://ynczwbybtbjftkatmcxg.supabase.co/storage/v1/object/sign/LB/cm_01.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV83MjY5YTJlMy0zNGQxLTRkNTMtYWYzMC0wOWM5OTZhMzE0ODMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJMQi9jbV8wMS5wbmciLCJpYXQiOjE3NzAxOTUyMzYsImV4cCI6MTgwMTczMTIzNn0.2OuxThJnhAcEjRmM0uYrpS2lesTfJhTM1YjLNxaJezc"
                      alt="img"
                    />
                  </div>
                </Link>
              </li>

              <li className="w-full md:w-[30%]">
                <Link
                  to="cmjoinlist"
                  className="flex flex-col justify-center items-center"
                >
                  <h4 className="text-deep">가입 신청 리스트</h4>
                  <div className="border border-main-02 overflow-hidden rounded-[20px]">
                    <img
                      src="https://ynczwbybtbjftkatmcxg.supabase.co/storage/v1/object/sign/LB/cm_02.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV83MjY5YTJlMy0zNGQxLTRkNTMtYWYzMC0wOWM5OTZhMzE0ODMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJMQi9jbV8wMi5wbmciLCJpYXQiOjE3NzAxOTU3MzksImV4cCI6MTgwMTczMTczOX0.bKsf-9IonbfvVxFuvc47tc5vja03HLVo6SlQqE83qFk"
                      alt="img"
                    />
                  </div>
                </Link>
              </li>

              <li className="w-full md:w-[30%]">
                <Link
                  to="noticemanagement"
                  className="flex flex-col justify-center items-center"
                >
                  <h4 className="text-deep">공지사항 관리</h4>
                  <div className="border border-main-02 overflow-hidden rounded-[20px]">
                    <img
                      src="https://ynczwbybtbjftkatmcxg.supabase.co/storage/v1/object/sign/LB/cm_03.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV83MjY5YTJlMy0zNGQxLTRkNTMtYWYzMC0wOWM5OTZhMzE0ODMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJMQi9jbV8wMy5wbmciLCJpYXQiOjE3NzAxOTU3NTIsImV4cCI6MTgwMTczMTc1Mn0.OOiiJ4PpEUVfA_wRKJh-VvRS6Iy3Kg2awptk2JFj-eE"
                      alt="img"
                    />
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

function CMManagement() {
  return (
    <Routes>
      <Route path="/" element={<CMManagementMain />} />
      <Route path="cmopen" element={<CMopen />} />
      <Route path="cmjoinlist" element={<CMjoinlist />} />
      <Route path="noticemanagement/*" element={<Noticemanagement />} />
    </Routes>
  );
}

export default CMManagement;
