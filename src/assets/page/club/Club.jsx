import React, { useState } from "react";
import { Route, Routes, Link } from "react-router-dom";
import ClubDetail from "./ClubDetail";
import PageNatation from "../../../components/PageNatation";

const clubs = Array.from({ length: 6 }).map((_, i) => ({
  id: i + 1,
  title: "경찰과 도둑 보라매 공원 모임",
  desc: "매주 함께 운동하고 건강한 습관을 만들어가는 모임입니다.",
  image: "https://yjpmigedokqexuclsapm.supabase.co/storage/v1/object/public/images/Image2.png",
  tags: ["2030", "추억소환", "다이어트", "놀이", "경찰과도둑"],
  memberCount: 20 - i,
  postCount: 50 - i * 3,
}));

function ClubMain() {
  const [sort, setSort] = useState("latest");

  return (
    <div className="myBg bg-light-03">
      {/* ================= 배너 ================= */}
      <div className="relative w-full h-[320px] overflow-hidden">
        <img
          src="https://yjpmigedokqexuclsapm.supabase.co/storage/v1/object/public/images/sdfasdfsdfdxs.png"
          alt="club banner"
          className="w-full h-full object-cover object-[50%_20%]"
        />

        <div className="absolute inset-0 flex flex-col justify-center items-center text-white text-center px-4">
          <h2 className="text-3xl font-bold mb-3">함께 이야기하고, 함께 성장하는 커뮤니티</h2>

          <div className="w-[600px] max-w-[92vw] h-1 bg-main-02 rounded-full mb-4" />

          <p className="text-sm opacity-90 max-w-[720px] leading-relaxed">
            혼자서는 쉽게 흐트러질 수 있는 운동 계획과 식단 관리를 서로 공유하고 응 원하며, 꾸준히 실천할 수 있도록 돕는
            것을 목표로 합니다. 매일의 운동 기 록, 식단 사진 운동 루틴, 건강 관련 정보까지 자유롭게 나눠보세요!
          </p>
        </div>
      </div>

      {/* ================= 검색 + 정렬 ================= */}
      <div className="mt-[10%]">
        <div className="containers">
          <div className="bg-white rounded-2xl shadow-lg px-2 py-8 flex flex-col items-center gap-6">
            {/* 검색창 */}
            <div className="flex items-center w-full max-w-[800px] bg-white border border-1 border-main-02 rounded-full overflow-hidden">
              <input
                type="text"
                placeholder="검색어를 입력하세요"
                className="flex-1 px-6 py-3 text-sm outline-none bg-white"
              />

              <button
                type="button"
                aria-label="검색"
                className="mr-2 w-9 h-9 rounded-full bg-main-02 text-white flex items-center justify-center"
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

            {/* 정렬 버튼 */}
            <div className="flex gap-3 flex-wrap justify-center ">
              <div className="flex flex-row justify-center items-center">
                <span className="material-icons mx-1 !text-[20px]">sort</span>
                <p className=" py-1.5 text-sm">정렬</p>
              </div>

              <button
                type="button"
                onClick={() => setSort("latest")}
                className={`border rounded-md transition-colors ${
                  sort === "latest" ? "bg-deep text-white border-deep" : "bg-white hover:bg-light-01"
                }`}
              >
                <p className="!px-2 !sm:px-3 !py-1 !sm:py-1.5 !text-xs !sm:text-sm">최신순</p>
              </button>

              <button
                type="button"
                onClick={() => setSort("members")}
                className={`border rounded-md transition-colors ${
                  sort === "members" ? "bg-deep text-white border-deep" : "bg-white hover:bg-light-01"
                }`}
              >
                <p className="!px-2 !sm:px-3 !py-1 !sm:py-1.5 !text-xs !sm:text-sm">회원 많은 순</p>
              </button>

              <button
                type="button"
                onClick={() => setSort("posts")}
                className={`border rounded-md transition-colors ${
                  sort === "posts" ? "bg-deep text-white border-deep" : "bg-white hover:bg-light-01"
                }`}
              >
                <p className="!px-2 !sm:px-3 !py-1 !sm:py-1.5 !text-xs !sm:text-sm">게시글 많은 순</p>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ================= 카드 리스트 ================= */}
      <div className="w-full mt-[5%] py-16">
        <div className="containers">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {clubs.map((club) => (
              <Link
                key={club.id}
                to={`detail/${club.id}`}
                className="bg-deep rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-transform hover:-translate-y-1"
              >
                <div className="w-full h-[200px] overflow-hidden">
                  <img src={club.image} alt={club.title} className="w-full h-full object-cover" />
                </div>

                <div className="p-4 flex flex-col items-center text-center gap-2 text-light-03">
                  <h4 className="text-lg font-semibold">{club.title}</h4>
                  <p className="text-sm opacity-90 line-clamp-2">{club.desc}</p>

                  <div className="flex flex-wrap justify-center gap-2 mt-3">
                    {club.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 !text-[14px] !sm:text-xs !md:text-sm !lg:text-sm rounded-full bg-light-03 text-deep"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="w-full flex justify-center mt-12">
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
      <Route path="detail/:id/*" element={<ClubDetail />} />
    </Routes>
  );
}

export default Club;
