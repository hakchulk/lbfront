import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useBoardsStore } from "../../../api/BoardsData";
import { BASE_URL } from "../../../api/config";

function ClubPosting() {
  const { id: boardId } = useParams();
  const { boardDetail, fetchBoardDetail, boardDetailLoading, boardDetailError } = useBoardsStore();
  const [liked, setLiked] = useState(false);

  // 게시글 상세 데이터 로드
  useEffect(() => {
    const loadBoardDetail = async () => {
      try {
        if (boardId) {
          await fetchBoardDetail(boardId);
        }
      } catch (err) {
        console.error("게시글 상세 데이터 로드 실패:", err);
      }
    };
    loadBoardDetail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [boardId]);

  const handleLike = () => {
    setLiked((prev) => !prev);
    // 실제로는 API 호출이 필요하지만, 현재는 UI만 업데이트
  };

  // 로딩 상태
  if (boardDetailLoading) {
    return (
      <div className="w-full flex justify-center items-center h-[400px] text-gray-500">
        로딩 중...
      </div>
    );
  }

  // 에러 상태
  if (boardDetailError) {
    return (
      <div className="w-full flex justify-center items-center h-[400px] text-red-500">
        게시글을 불러오는 중 오류가 발생했습니다.
      </div>
    );
  }

  // 데이터가 없을 때
  if (!boardDetail) {
    return (
      <div className="w-full flex justify-center items-center h-[400px] text-gray-500">
        게시글이 없습니다.
      </div>
    );
  }

  const likeCount = liked ? boardDetail.likeCount + 1 : boardDetail.likeCount;

  return (
    <div className="w-full flex justify-center">
      <div className="w-full max-w-[1020px] px-4 py-10">
        {/* 게시글 영역 */}
        <section className="bg-white p-6 mb-10">
          {/* 모임명 + 아이콘 */}
          <div className="flex items-center gap-2 text-main-02 mb-2">
            <span className="material-icons text-lg">edit</span>
            <span className="text-sm font-semibold">커뮤니티</span>
          </div>

          {/* 제목 */}
          <h1 className="text-2xl font-bold mb-4">{boardDetail.title}</h1>

          {/* 작성자 / 날짜 */}
          <div className="flex justify-between items-end pb-1 border-b border-gray-200 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full overflow-hidden">
                <img
                  src={
                    boardDetail.profileFilename
                      ? `${BASE_URL}/file/${boardDetail.profileFilename}`
                      : "https://yjpmigedokqexuclsapm.supabase.co/storage/v1/object/public/images/face.png"
                  }
                  className="w-full h-full object-cover scale-125"
                  alt="profile"
                />
              </div>

              <span className="text-sm text-gray-600 font-medium">{boardDetail.author || "정보 없음"}</span>
            </div>
            <span className="!text-sm text-gray-400">
              {boardDetail.date ? boardDetail.date.replace(/-/g, ".") : "정보 없음"}
            </span>
          </div>

          {/* 이미지 */}
          {boardDetail.filename && (
            <div className="w-full mb-6">
              <img
                src={`${BASE_URL}/file/${boardDetail.filename}`}
                alt={boardDetail.title}
                className="w-full rounded-lg object-cover"
              />
            </div>
          )}

          {/* 본문 */}
          <p className="text-gray-700 leading-relaxed mb-8 whitespace-pre-line">
            {boardDetail.contents}
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
                <span>{boardDetail.viewCount || 0}</span>
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
