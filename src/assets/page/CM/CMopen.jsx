import { useState } from "react";
import BtnComp from "../../../components/BtnComp";

function CMopen() {
  // 샘플 데이터 - 실제로는 API에서 받아올 데이터
  const clubName = "고기고기"; // 클럽 이름

  // 오늘 날짜를 YYYY-MM-DD 형식으로 가져오기
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  const todayString = `${year}-${month}-${day}`;

  const [keywords, setKeywords] = useState([]);
  const [keywordInput, setKeywordInput] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState(null);

  /* 키워드 처리 */
  const handleKeywordChange = (e) => {
    setKeywordInput(e.target.value);
  };

  const addKeywords = () => {
    if (!keywordInput.trim()) return;

    const newKeywords = keywordInput
      .split(",")
      .map((k) => k.trim())
      .filter((k) => k.length > 0);

    const merged = [...keywords, ...newKeywords].slice(0, 5);
    setKeywords(merged);
    setKeywordInput("");
  };

  const removeKeyword = (index) => {
    setKeywords(keywords.filter((_, i) => i !== index));
  };

  /* 이미지 처리 */
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImageFile(file);
    setPreview(URL.createObjectURL(file));
  };

  return (
    <>
      <div className="wrap !mt-0 !bg-light-02">
        <div className="containers">
          {/* write title */}
          <section className="wr_tit text-black py-[10px] mt-[50px] border-b border-b-[1px] border-b-deep">
            <div className="flex flex-row  items-center text-deep">
              <i class="fa-solid fa-file-pen"></i>
              <span>{clubName} 모임</span>
            </div>
            <h3>커뮤니티 개설</h3>
          </section>

          {/* 입력 폼 */}
          <section className=" p-8 rounded-lg">
            {/* 제목 */}
            <div className="mb-6">
              <label className="block mb-2 font-semibold">제목</label>
              <input className="w-full border rounded px-3 h-[35px] bg-white" />
            </div>

            {/* 작성일자 */}
            <div className="mb-6">
              <label className="block mb-2 font-semibold">작성일자</label>
              <span className="text-black">{todayString}</span>
            </div>

            {/* 배경 이미지 */}
            <div className="mb-6">
              <label className="block mb-2 font-semibold">배경이미지</label>
              <input
                type="file"
                accept="image/png, image/jpeg"
                onChange={handleImageChange}
              />

              {preview && (
                <img
                  src={preview}
                  alt="preview"
                  className="mt-4 w-32 h-32 object-cover rounded border"
                />
              )}
            </div>

            {/* 키워드 */}
            <div className="mb-6">
              <label className="block mb-2 font-semibold">키워드</label>

              <div className="flex gap-2 items-center">
                <input
                  value={keywordInput}
                  onChange={handleKeywordChange}
                  placeholder="키워드를 , 로 구분하여 입력해주세요"
                  className="flex-1 border rounded px-3 h-[35px] bg-white"
                />

                <div
                  className=" w-[200px] flex items-center justify-center"
                  onClick={addKeywords}
                >
                  <BtnComp
                    size="mid"
                    variant="primary"
                    className="mt-0 !h-[35px] w-full"
                  >
                    추가
                  </BtnComp>
                </div>
              </div>

              {/* 키워드 표시 */}
              <div className="flex gap-2 flex-wrap mt-3">
                {keywords.map((keyword, index) => (
                  <span
                    key={index}
                    className="flex items-center gap-1 bg-green-600 text-white px-3 py-1 rounded-full text-sm"
                  >
                    {keyword}
                    <button
                      onClick={() => removeKeyword(index)}
                      className="text-xs ml-1"
                    >
                      ✕
                    </button>
                  </span>
                ))}
              </div>

              <p className="text-sm text-gray-500 mt-1">
                최대 5개까지 입력 가능합니다.
              </p>
            </div>

            {/* 소개글 */}
            <div className="mb-8">
              <label className="block mb-2 font-semibold">소개글</label>
              <textarea className="w-full h-40 border rounded p-3 bg-white" />
            </div>

            {/* 버튼 */}
            <div className="flex justify-center gap-4">
              <button className="px-6 py-2 bg-green-600 text-white rounded">
                개설
              </button>
              <button className="px-6 py-2 bg-gray-400 text-white rounded">
                취소
              </button>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}

export default CMopen;
