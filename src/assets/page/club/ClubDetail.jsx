import React from "react";
import { Route, Routes, useParams } from "react-router-dom";
import ClubPostList from "./ClubPostList";

const clubs = [
  {
    id: 1,
    title: "고기 고기 기고기 모임",
    desc: "고기로 단백질을 채우고 근육을 증량시키는 사람들의 모임입니다.\n목살, 삼겹살 등 가리지 않으며 고기를 주식으로 하고 있는 육식인들",
    banner: "https://yjpmigedokqexuclsapm.supabase.co/storage/v1/object/public/images/Rectangle%20263.png",
    tags: ["직장인 식단", "점심&저녁 관리", "배달 줄이기", "야식방지", "식단루틴"],
    createdAt: "2026-01-01",
    membersCount: 42,
    clubManager: "김훈규",
  },
  {
    id: 2,
    title: "경찰과 도둑 보라매 공원 모임",
    desc: "매주 함께 운동하고 건강한 습관을 만들어가는 모임입니다.",
    banner: "https://yjpmigedokqexuclsapm.supabase.co/storage/v1/object/public/images/Rectangle%20263.png",
    tags: ["2030", "추억소환", "다이어트", "놀이", "경찰과도둑"],
    createdAt: "2026-01-01",
    membersCount: 42,
    clubManager: "김훈규",
  },
];

function ClubDetailMain() {
  const { id } = useParams();
  const club = clubs.find((c) => c.id === Number(id));

  if (!club) {
    return (
      <div className="w-full flex justify-center items-center h-[400px] text-gray-500">존재하지 않는 클럽입니다.</div>
    );
  }

  return (
    <div className="w-full flex flex-col">
      {/* 상단 배너 */}
      <section className="relative w-full h-[450px] overflow-hidden">
        <img src={club.banner} alt="club banner" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center text-center px-4">
          {/* 클럽 타이틀 */}
          <div className="bg-white rounded-full px-10 py-2 mb-3">
            <h1 className="text-3xl font-bold text-main-02">{club.title}</h1>
          </div>

          {/* 클럽 기본 정보: 개설일, 회원수, CM */}
          <div className="flex flex-wrap justify-center gap-4 text-white mb-4">
            <span className="!text-sm">개설일: {club.createdAt}</span>
            <span className="!text-sm">회원수: {club.membersCount}명</span>
            <span className="!text-sm">운영자 {club.clubManager}</span>
          </div>

          {/* 구분선 */}
          <div className="w-[600px] max-w-[92vw] h-1 bg-main-02 rounded-full mb-4" />

          {/* 클럽 설명 */}
          <p className="text-sm mb-4 max-w-[700px] text-white whitespace-pre-line mb-10">{club.desc}</p>

          {/* 태그 */}
          <div className="flex flex-wrap justify-center gap-2 mt-2 mb-10">
            {club.tags.map((tag, idx) => (
              <span key={idx} className="px-3 py-1 text-xs rounded-full bg-light-03 text-deep">
                #{tag}
              </span>
            ))}
          </div>

          {/* 모임 참여 버튼 */}
          <button className="mt-4 w-[280px] py-2 rounded-full bg-main-02 text-white font-medium hover:bg-main-01 transition">
            모임 가입 하기
          </button>
        </div>
      </section>

      {/* 대표 공지사항 섹션 */}
      <div className="w-full mt-30 px-4 sm:px-8 lg:px-16">
        <h2 className="text-2xl font-bold mb-4 text-center">대표 공지사항</h2>

        <div className="w-full border rounded-lg border-gray-200 overflow-hidden">
          {/* 헤더 */}
          <div className="grid grid-cols-12 bg-gray-100 px-4 py-2 text-center font-semibold text-gray-600">
            <span className="col-span-1">No</span>
            <span className="col-span-6">제목</span>
            <span className="col-span-3">작성자</span>
            <span className="col-span-2">작성일</span>
          </div>

          {/* 공지사항 리스트 */}
          {[
            { id: 1, title: "이번 주 모임 일정 공지", author: "운영자 김훈규", date: "2026-02-05" },
            { id: 2, title: "신규 회원 가입 안내", author: "운영자 김훈규", date: "2026-02-03" },
            { id: 3, title: "고기 모임 특별 이벤트 안내", author: "운영자 김훈규", date: "2026-02-01" },
          ].map((notice, idx) => (
            <div
              key={notice.id}
              className="grid grid-cols-12 px-4 py-3 text-center border-b last:border-b-0 hover:bg-gray-50 cursor-pointer"
            >
              <span className="col-span-1">{idx + 1}</span>
              <span className="col-span-6">{notice.title}</span>
              <span className="col-span-3">{notice.author}</span>
              <span className="col-span-2">{notice.date}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 게시글 리스트 */}
      <div className="w-full mt-10 px-4 sm:px-8 lg:px-16">
        <h2 className="text-2xl font-bold mb-4">게시글</h2>
        <ClubPostList clubId={club.id} />
      </div>
    </div>
  );
}

function ClubDetail() {
  return (
    <Routes>
      <Route path="/" element={<ClubDetailMain />} />
      <Route path="postlist/*" element={<ClubPostList />} />
      {/* detail/:id 중첩 route는 필요 없으면 제거 가능 */}
      {/* <Route path="detail/:id/*" element={<ClubDetail />} /> */}
    </Routes>
  );
}

export default ClubDetail;
