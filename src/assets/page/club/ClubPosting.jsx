import React, { useState } from "react";

function ClubPosting() {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(24);

  const handleLike = () => {
    setLiked((prev) => !prev);
    setLikeCount((prev) => (liked ? prev - 1 : prev + 1));
  };

  return (
    <div className="w-full flex justify-center">
      <div className="w-full max-w-[1020px] px-4 py-10">
        {/* 게시글 영역 */}
        <section className="bg-white p-6 mb-10">
          {/* 모임명 + 아이콘 */}
          <div className="flex items-center gap-2 text-main-02 mb-2">
            <span className="material-icons text-lg">edit</span>
            <span className="text-sm font-semibold">고기고기 모임</span>
          </div>

          {/* 제목 */}
          <h1 className="text-2xl font-bold mb-4">오늘 저녁은 샐러드 삽니다. ㅠㅠㅠㅠㅠㅠ</h1>

          {/* 작성자 / 날짜 */}
          <div className="flex justify-between items-end pb-1 border-b border-gray-200 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full overflow-hidden">
                <img
                  src="https://yjpmigedokqexuclsapm.supabase.co/storage/v1/object/public/images/face.png"
                  className="w-full h-full object-cover scale-125"
                  alt="profile"
                />
              </div>

              <span className="text-sm text-gray-600 font-medium">홍지승</span>
            </div>
            <span className="!text-sm text-gray-400">2026.02.10</span>
          </div>

          {/* 이미지 */}
          <div className="w-full mb-6">
            <img
              src="https://yjpmigedokqexuclsapm.supabase.co/storage/v1/object/public/images/Image5.png"
              alt="post"
              className="w-full rounded-lg object-cover"
            />
          </div>

          {/* 본문 */}
          <p className="text-gray-700 leading-relaxed mb-8">
            오늘은 다이어트도 할 겸 샐러드를 먹어보려고 합니다. 혼자 먹기엔 너무 많아서 같이 드실 분 있으면 댓글 주세요!
          </p>

          {/* 버튼 영역 */}
          <div className="flex justify-center gap-4">
            <button className="px-6 py-2 bg-main-02 text-white rounded-md">수정</button>
            <button className="px-6 py-2 bg-point text-white rounded-md">삭제</button>
          </div>
        </section>

        {/* 댓글 영역 */}
        <section className="bg-gray-200 p-6">
          {/* 댓글 헤더 */}
          <div className="flex justify-between items-center pb-3 border-b border-gray-300 mb-6">
            <h2 className="!text-lg font-semibold">
              댓글 <span className="text-main-02">3</span>
            </h2>

            {/* 조회수 + 좋아요 */}
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <div className="flex items-center gap-1">
                <span className="material-icons text-base">visibility</span>
                <span>128</span>
              </div>

              {/* 좋아요 버튼 */}
              <button onClick={handleLike} className="flex items-center gap-1">
                <span
                  className={`material-icons text-base transition-colors ${liked ? "text-pink-500" : "text-gray-400"}`}
                >
                  favorite
                </span>
                <span>{likeCount}</span>
              </button>
            </div>
          </div>

          {/* 댓글 리스트 */}
          <ul className="mb-6">
            <li className="flex gap-3 py-4 border-b border-gray-500">
              <div className="w-10 h-10 rounded-full overflow-hidden">
                <img
                  src="https://yjpmigedokqexuclsapm.supabase.co/storage/v1/object/public/images/face.png"
                  className="w-full h-full object-cover scale-125"
                  alt="profile"
                />
              </div>

              <div className="flex-1">
                <div className="flex justify-between text-sm">
                  <span className="font-medium">유저1</span>
                  <span className="text-gray-400 !text-sm">2026.02.10</span>
                </div>
                <p className="text-gray-700 mt-1">샐러드 좋네요! 같이 먹어요</p>
              </div>
            </li>

            <li className="flex gap-3 py-4 border-b border-gray-500">
              <div className="w-10 h-10 rounded-full overflow-hidden">
                <img
                  src="https://yjpmigedokqexuclsapm.supabase.co/storage/v1/object/public/images/face.png"
                  className="w-full h-full object-cover scale-125"
                  alt="profile"
                />
              </div>

              <div className="flex-1">
                <div className="flex justify-between text-sm">
                  <span className="font-medium">유저2</span>
                  <span className="text-gray-400 !text-sm">2026.02.10</span>
                </div>
                <p className="text-gray-700 mt-1">위치 어디인가요?</p>
              </div>
            </li>

            <li className="flex gap-3 py-4">
              <div className="w-10 h-10 rounded-full overflow-hidden">
                <img
                  src="https://yjpmigedokqexuclsapm.supabase.co/storage/v1/object/public/images/face.png"
                  className="w-full h-full object-cover scale-125"
                  alt="profile"
                />
              </div>

              <div className="flex-1">
                <div className="flex justify-between text-sm">
                  <span className="font-medium">유저3</span>
                  <span className="text-gray-400 !text-sm">2026.02.10</span>
                </div>
                <p className="text-gray-700 mt-1">다이어트 화이팅입니다</p>
              </div>
            </li>
          </ul>

          {/* 댓글 입력 */}
          <div className="relative">
            <textarea
              className="w-full border bg-white rounded-md p-3 pr-20 resize-none focus:outline-none focus:ring-1 focus:ring-main-02"
              rows={3}
              placeholder="댓글을 입력하세요"
            />
            <button className="absolute bottom-3 right-3 px-5 py-1.5 bg-main-02 text-white text-sm rounded-md">
              등록
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}

export default ClubPosting;
