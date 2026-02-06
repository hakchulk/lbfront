import React from "react";
import { Route, Routes, useParams } from "react-router-dom";
import ClubPostList from "./ClubPostList";
import BtnComp from "../../../components/BtnComp";

const clubs = [
  {
    id: 1,
    title: "고기 기고기 모임",
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
    <div className="w-full flex flex-col ">
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
              <span
                key={idx}
                className="px-3 py-1 !text-[14px] !sm:text-xs !md:text-sm !lg:text-sm rounded-full bg-light-03 text-deep"
              >
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
        <h3 className=" !text-main-02 mb-[20px] !text-[20px] lg:!text-[30px] flex items-center justify-center ">
          <span className="material-icons mr-[5px] !text-[30px] lg:!text-[40px] ">campaign</span>
          {club.title} 대표 공지사항
        </h3>

        <div className="w-full lg:w-[70%] mx-auto border rounded-lg border-gray-200 overflow-hidden">
          {/* 헤더 */}
          <div className="grid grid-cols-12 bg-gray-100 px-4 py-2 text-center font-semibold text-gray-600">
            <span className="col-span-1 text-left sm:text-center !text-sm !sm:text-md !md:text-lg ">번호</span>
            <span className="col-span-5 text-left sm:text-center !text-sm !sm:text-md !md:text-lg ">제목</span>
            <span className="col-span-3 !text-sm !sm:text-md !md:text-lg ">작성자</span>
            <span className="col-span-3 !text-sm !sm:text-md !md:text-lg ">작성일</span>
          </div>
          {/* 공지사항 리스트 */}
          {[
            { id: 1, title: "이번 주 모임 일정 공지", author: "김훈규(CM)", date: "2026-02-05" },
            { id: 2, title: "신규 회원 가입 안내", author: "김훈규(CM)", date: "2026-02-03" },
            { id: 3, title: "고기 모임 특별 이벤트 안내", author: "김훈규(CM)", date: "2026-02-01" },
          ].map((notice, idx) => (
            <div
              key={notice.id}
              className="grid grid-cols-12 px-4 py-3 text-center border-b last:border-b-0 hover:bg-gray-50 cursor-pointer"
            >
              <span className="col-span-1 text-left sm:text-center !text-xs !sm:text-md !md:text-lg">{idx + 1}</span>
              <span className="col-span-5 text-left sm:text-center text-point-hov !text-sm !sm:text-md !md:text-lg truncate">
                {notice.title}
              </span>
              <span className="col-span-3 !text-xs !sm:text-md !md:text-lg">{notice.author}</span>
              <span className="col-span-3 !text-xs !sm:text-md !md:text-lg">{notice.date}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 게시글 리스트 */}
      <div className="w-full lg:w-[70%] mx-auto mt-30 px-4 sm:px-8 lg:px-16">
        <div className=" !text-main-02  flex items-center justify-center flex-row mb-[5%]">
          <span class="material-icons mr-1">article</span>
          <h3 className=" !text-[20px] lg:!text-[30px] ">최신 게시글</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
          {[
            {
              id: 1,
              title: "어제 먹은 고기가 생각납니다.",
              author: "홍지승",
              date: "2026-02-06",
              content: "고기 사진입니다. 잘먹고갑니다.",
            },
            {
              id: 2,
              title: "다이어트 하기싫어요.",
              author: "홍지승",
              date: "2026-02-05",
              content: "다이어트고 뭐고 때려칩시다.",
            },
            {
              id: 3,
              title: "ㅈㄴ맛있네",
              author: "홍지승",
              date: "2026-02-04",
              content: "부럽죠. 맛있겠죠.",
            },
            {
              id: 4,
              title: "한우파티 ㄱㄱㄱㄱㄱㄱㄱㄱ",
              author: "홍지승",
              date: "2026-02-03",
              content: "오늘은 한우를 먹으러왔습니다. 다들 행복하루 보내시고 건강하세요.",
            },
          ].map((post) => (
            <div
              key={post.id}
              className="border border-main-02 rounded-lg shadow-sm hover:shadow-md transition cursor-pointer bg-white overflow-hidden"
            >
              {/* 이미지 */}
              <div className="p-2">
                {" "}
                {/* 이미지 주변 패딩 */}
                <img
                  src="https://yjpmigedokqexuclsapm.supabase.co/storage/v1/object/public/images/Image1.png"
                  alt={post.title}
                  className="w-full h-60 object-cover rounded-lg"
                />
              </div>

              {/* 글 내용 */}
              <div className="p-4">
                <h3 className="font-semibold !text-2xl !sm:text-xl mb-2 text-deep">{post.title}</h3>
                <p className="text-sm sm:text-base text-gray-600 mb-2">{post.content}</p>
                <div className="text-gray-500 text-xs sm:text-sm flex justify-between">
                  <span className="!text-sm !sm:text-md">{post.author}</span>
                  <span className="!text-sm !sm:text-md">{post.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 더보기 버튼 */}
        {/* <div className="flex justify-center mt-16 mb-30">
          <button className="w-50% sm:w-1/2 lg:w-1/3 px-6 py-3 rounded-full bg-main-02 text-white font-medium hover:bg-main-01 transition">
            게시물 더보기
          </button>
        </div> */}

        <div className="w-[50%] flex flex-col flex-wrap mt-16 mb-30 mx-auto">
          <BtnComp size="long" variant="primary">
            게시물 더보기
          </BtnComp>
        </div>
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
