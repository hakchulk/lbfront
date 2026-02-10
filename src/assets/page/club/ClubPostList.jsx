import React, { useState } from "react";
import { Route, Routes, Link } from "react-router-dom";
import ClubPosting from "./ClubPosting";
import ClubPostWrite from "./ClubPostWrite";
import PageNatation from "../../../components/PageNatation";

const BANNER_IMG = "https://yjpmigedokqexuclsapm.supabase.co/storage/v1/object/public/images/Image5.png";

const POST_IMG = "https://yjpmigedokqexuclsapm.supabase.co/storage/v1/object/public/images/Image3.png";

/* 디테일과 동일한 공지사항 */
const notices = [
  { id: 1, title: "이번 주 모임 일정 공지", author: "김훈규(CM)", date: "2026-02-05" },
  { id: 2, title: "신규 회원 가입 안내", author: "김훈규(CM)", date: "2026-02-03" },
];

/* 자유게시판 카드 (6개) */
const posts = Array.from({ length: 6 }).map((_, i) => ({
  id: i + 1,
  title: `고기 먹으러 갈 사람 ${i + 1} 모집`,
  content: "같이 고기 맛집 가실 분 구합니다!",
  author: "홍지승",
  date: "2026-02-09",
  views: 120 + i * 7,
  likes: 10 - i,
}));

function ClubPostListMain() {
  const [sort, setSort] = useState("latest");

  return (
    <div className="w-full flex flex-col pb-32">
      {/* ================= 배너 ================= */}
      <section className="relative w-full h-[260px] overflow-hidden">
        <img src={BANNER_IMG} alt="club banner" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/50" />

        <div className="relative z-10 h-full flex flex-col justify-center items-center text-white text-center px-4">
          <h2 className="text-2xl lg:text-3xl font-bold">고기 고기 모임에 오신걸 환영합니다</h2>
          <div className="w-[520px] max-w-[90vw] h-[2px] bg-main-02 my-4" />
          <p className="text-xs lg:text-sm opacity-80">육식인들의 자유로운 소통 공간</p>
          <p className="text-xs lg:text-sm opacity-80">
            공지사항을 꼭 확인해 주세요. 자유게시판에서는 편하게 이야기 나누세요!
          </p>
        </div>
      </section>

      {/* ================= 공지사항 ================= */}
      <div className="w-full lg:w-[70%] mx-auto mt-16 px-4">
        <h3 className="!text-main-02 mb-5 !text-[20px] lg:!text-[28px] flex justify-center items-center">
          <span className="material-icons mr-2">campaign</span>
          대표 공지사항
        </h3>

        <div className="border border-main-02 rounded-lg overflow-hidden">
          <div className="grid grid-cols-12 bg-gray-100 px-4 py-2 text-[13px] text-gray-600 font-semibold">
            <span className="col-span-1">번호</span>
            <span className="col-span-5">제목</span>
            <span className="col-span-3">작성자</span>
            <span className="col-span-3">작성일</span>
          </div>

          {notices.map((n, i) => (
            <Link
              key={n.id}
              to={`posting/${n.id}`}
              className="grid grid-cols-12 px-4 py-3 text-[13px] border-b last:border-b-0 border-gray-mid hover:bg-gray-50"
            >
              <span className="col-span-1">{i + 1}</span>
              <span className="col-span-5 truncate text-point-hov">{n.title}</span>
              <span className="col-span-3">{n.author}</span>
              <span className="col-span-3">{n.date}</span>
            </Link>
          ))}
        </div>

        {/*  공지사항 페이지네이션 */}
        <div className="w-full flex justify-center mt-12">
          <PageNatation storeKey="notice-list" totalElements={100} pageSize={10} />
        </div>
      </div>

      {/* ================= 자유게시판 ================= */}
      <div className="w-full  lg:w-[80%] mx-auto mt-24 px-4 relative">
        {/* 타이틀 */}
        <div className="flex justify-center items-center text-main-02 mb-4">
          <span className="material-icons mr-2 text-[20px] lg:text-[26px]">article</span>
          <h3 className="!text-[20px] lg:!text-[28px]">고기고기 모임 자유게시판</h3>
        </div>

        {/* 정렬 */}
        <div className="flex justify-end mb-3 gap-1">
          {[
            { key: "latest", icon: "schedule", label: "최신" },
            { key: "likes", icon: "favorite", label: "좋아요" },
            { key: "views", icon: "visibility", label: "조회" },
          ].map((item) => (
            <button
              key={item.key}
              onClick={() => setSort(item.key)}
              className={`flex items-center gap-0.5 px-2 py-0.5 text-[10px] rounded-full border
              ${sort === item.key ? "border-main-02 text-main-02" : "text-gray-400"}`}
            >
              <span className="material-icons text-[11px]">{item.icon}</span>
              {item.label}
            </button>
          ))}
        </div>

        {/* 카드 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {posts.map((post) => (
            <Link
              key={post.id}
              to={`posting/${post.id}`}
              className="border border-main-02 rounded-xl hover:shadow-md transition bg-white"
            >
              <div className="flex justify-between px-4 pt-3 text-[10px] text-gray-400">
                <span className="font-medium text-deep">{post.author}</span>
                <span>{post.date}</span>
              </div>

              <div className="p-3">
                <img src={POST_IMG} className="w-full h-[200px] rounded-md object-cover" />
              </div>

              <div className="px-4 pb-4">
                <h4 className="text-[14px] font-semibold line-clamp-2">{post.title}</h4>
                <p className="text-[12px] text-gray-600 line-clamp-2">{post.content}</p>

                <div className="flex justify-end gap-3 text-[9px] text-gray-400 mt-2">
                  <span className="flex items-center gap-0.5">
                    <span className="material-icons text-[10px]">visibility</span>
                    {post.views}
                  </span>
                  <span className="flex items-center gap-0.5">
                    <span className="material-icons text-[10px]">favorite</span>
                    {post.likes}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* 글쓰기 버튼 영역 */}
        <div className="w-full flex justify-end mt-6">
          <Link
            to="postwrite"
            className="flex items-center gap-1 bg-main-02 text-white px-4 py-2 rounded-[4px] text-sm shadow hover:bg-main-01 transition"
          >
            <span className="material-icons text-[18px]">edit</span>
            게시물 작성
          </Link>
        </div>

        {/* ✅ 자유게시판 페이지네이션 */}
        <div className="w-full flex justify-center mt-14">
          <PageNatation storeKey="post-list" totalElements={100} pageSize={10} />
        </div>
      </div>
    </div>
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
