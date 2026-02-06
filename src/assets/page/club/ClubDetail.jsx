import React from "react";
import { Route, Routes, Link, useParams } from "react-router-dom";
import ClubPostList from "./ClubPostList";

const clubs = [
  {
    id: 1,
    title: "고기 고기 기고기 모임",
    desc: "고기를 사랑하는 사람들의 커뮤니티",
    banner: "https://yjpmigedokqexuclsapm.supabase.co/storage/v1/object/public/images/Rectangle%20263.png",
    tags: ["맛집", "고기", "친목", "주말모임"],
  },
  {
    id: 2,
    title: "경찰과 도둑 보라매 공원 모임",
    desc: "매주 함께 운동하고 건강한 습관을 만들어가는 모임입니다.",
    banner: "https://yjpmigedokqexuclsapm.supabase.co/storage/v1/object/public/images/Rectangle%20263.png",
    tags: ["2030", "추억소환", "다이어트", "놀이", "경찰과도둑"],
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
      <section className="relative w-full h-[320px] overflow-hidden">
        <img src={club.banner} alt="club banner" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center text-white px-4 text-center">
          <h1 className="text-3xl font-bold mb-3">{club.title}</h1>
          <p className="text-sm mb-4 max-w-[700px]">{club.desc}</p>

          {/* 태그 */}
          <div className="flex flex-wrap justify-center gap-2 mt-2">
            {club.tags.map((tag, idx) => (
              <span key={idx} className="px-3 py-1 text-xs rounded-full border border-white bg-white/20">
                #{tag}
              </span>
            ))}
          </div>

          {/* 모임 참여 버튼 */}
          <button className="mt-4 px-6 py-2 rounded-full bg-main-02 text-white font-medium hover:bg-main-01 transition">
            모임 참여하기
          </button>
        </div>
      </section>

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
      <Route path="detail/:id/*" element={<ClubDetail />} /> {/* 이것도 추가해야되서 말해야됨 */}
    </Routes>
  );
}

export default ClubDetail;
