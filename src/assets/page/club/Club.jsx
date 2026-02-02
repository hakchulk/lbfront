import React from "react";
import { Route, Routes, Link } from "react-router-dom";
import ClubDetail from "./ClubDetail";
import PageNatation from "../../../components/PageNatation";

const clubs = Array.from({ length: 6 }).map((_, i) => ({
  id: i + 1,
  title: "경찰과 도둑 보라매 공원 모임",
  desc: "매주 함께 운동하고 건강한 습관을 만들어가는 모임입니다.",
  image: "https://yjpmigedokqexuclsapm.supabase.co/storage/v1/object/public/images/Image2.png",
  tags: ["2030", "추억소환", "다이어트", "놀이", "경찰과도둑"],
}));

// 클럽 메인 화면 컴포넌트
function ClubMain() {
  return (
    <div className="myBg bg-light-03">
      <div className="relative w-full h-[320px] overflow-hidden">
        {/* 배너 크기에 맞춰 여백 없이 표시(비율은 늘어날 수 있음) */}

        <div className="w-full h-[320px] overflow-hidden">
          <img
            src="https://yjpmigedokqexuclsapm.supabase.co/storage/v1/object/public/images/sdfasdfsdfdxs.png"
            alt="club banner"
            className="block w-full h-full object-cover object-[50%_20%] "
          />
        </div>

        <div className="absolute inset-0 flex flex-col justify-center items-center text-white text-center px-4">
          <h2 className="text-3xl font-bold mb-3 max-w-[720px]">함께 이야기하고, 함께 성장하는 커뮤니티</h2>
          {/* 초록색 언더바 */}
          <div className="w-[600px] max-w-[92vw] h-1 bg-main-02 rounded-full mb-4" />
          <p className="text-sm mb-5 opacity-90 max-w-[720px] leading-relaxed">
            혼자서는 쉽게 흐트러질 수 있는 운동 계획과 식단 관리를 서로 공유하고 응원하며, 꾸준히 실천할 수 있도록 돕는
            것을 목표로 합니다. 매일의 운동 기록, 식단 사전 운동 루틴, 건강 관련 정보까지 자유롭게 나눠보세요!
          </p>

          <div className="flex items-center w-[620px] max-w-[95vw] bg-white rounded-full overflow-hidden shadow-md">
            <input
              type="text"
              placeholder="검색어를 검색하세요."
              className="flex-1 px-6 py-2.5 text-sm text-black outline-none"
            />
            <button
              type="button"
              aria-label="검색"
              className="mr-2 w-9 h-9 rounded-full bg-main-02 text-white flex items-center justify-center shrink-0"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-5 h-5"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="M21 21l-4.3-4.3" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      {/* 카드 섹션 */}
      <div className="w-full mt-24 py-16">
        <div className="containers">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {clubs.map((club) => (
              <Link
                to={`detail/${club.id}`}
                key={club.id}
                className="bg-deep rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-transform transform hover:-translate-y-1"
              >
                {/* 이미지 */}
                <div className="w-full h-[200px] overflow-hidden">
                  <img src={club.image} alt={club.title} className="w-full h-full object-cover" />
                </div>

                {/* 내용 */}
                <div className="p-4 flex flex-col items-center text-center gap-2 text-light-03">
                  <h4 className="text-lg font-semibold text-light-03">{club.title}</h4>
                  <p className="text-sm text-light-03/90 line-clamp-2">{club.desc}</p>

                  {/* 태그 */}
                  <div className="flex flex-wrap justify-center gap-2 mt-3">
                    {club.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 text-xs rounded-full border border-light-03 bg-light-03 text-deep"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>
          {/* 페이지네이션 */}
          <div className="w-full flex justify-center mt-10">
            <PageNatation storeKey="test-list" totalElements={100} pageSize={10} />
          </div>
        </div>
      </div>
    </div>
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
