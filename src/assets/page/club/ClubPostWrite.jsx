import React, { useRef } from "react";

function ClubPostWrite() {
  const fileInputRef = useRef(null);

  return (
    <div className="w-full bg-[#f6f8ef] py-20">
      <div className="max-w-4xl mx-auto px-4">
        {/* 모임명 */}
        <p className="text-sm text-gray-500 mb-2">고기고기 모임</p>

        {/* 제목 */}
        <h2 className="text-xl font-semibold text-main-02 mb-12">📝 클럽 게시글 작성</h2>

        {/* 폼 */}
        <div className="bg-white border border-main-02 p-10">
          {/* 제목 */}
          <div className="flex items-center mb-8">
            <label className="w-32 text-sm text-gray-600">제목</label>
            <input
              type="text"
              placeholder="제목을 입력하세요"
              className="flex-1 border border-main-02 px-3 py-2 text-sm focus:outline-none"
            />
          </div>

          {/* 작성일자 */}
          <div className="flex items-center mb-8">
            <label className="w-32 text-sm text-gray-600">작성일자</label>
            <input type="date" className="w-60 border border-main-02 px-3 py-2 text-sm focus:outline-none" />
          </div>

          {/* 파일 첨부 */}
          <div className="flex items-center mb-10">
            <label className="w-32 text-sm text-gray-600">파일첨부</label>

            <button
              type="button"
              onClick={() => fileInputRef.current.click()}
              className="px-5 py-2 border border-main-02 text-sm text-main-02 hover:bg-main-02 hover:text-white transition"
            >
              파일 선택
            </button>

            <input type="file" ref={fileInputRef} className="hidden" />
          </div>

          {/* 글 작성 영역 */}
          <textarea
            placeholder="내용을 입력하세요"
            className="w-full h-96 border border-main-02 p-4 text-sm resize-none mb-12 focus:outline-none"
          />

          {/* 버튼 */}
          <div className="flex justify-center gap-6">
            <button className="px-10 py-2 bg-main-02 text-white text-sm">등록</button>
            <button className="px-10 py-2 bg-gray-300 text-sm">취소</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ClubPostWrite;
