import { useState, useRef } from "react";
import BtnComp from "../../../components/BtnComp";
import { useNavigate } from "react-router-dom";
import Noticemanagement from "./Noticemanagement";
import CMManagement from "./CMManagement";

function NoticeWrite() {
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
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  //이동
  const handleSave = () => {
    navigate("/CMManagement/Noticemanagement");
  };

  /* 이미지 처리 */
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImageFile(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleFileButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <>
      <div className="wrap !mt-0 !bg-light-02">
        <div className="containers w-full sm:!w-[70%]">
          {/* write title */}
          <section className="wr_tit text-black py-[10px] mt-[50px] border-b border-b-[1px] border-b-deep">
            <div className="flex flex-row  items-center text-deep">
              <i class="fa-solid fa-file-pen"></i>
              <span>{clubName} 모임</span>
            </div>
            <h3>공지사항 작성</h3>
          </section>

          {/* 입력 폼 */}
          <section className=" w-full py-8">
            {/* 제목 */}
            <div className="mb-6">
              <label className="block mb-2 font-semibold">제목</label>
              <input className="w-full border  border-deep rounded px-3 h-[35px] bg-white" />
            </div>

            {/* 작성일자 */}
            <div className="mb-6">
              <label className="block mb-2 font-semibold">작성일자</label>
              <span className="text-black">{todayString}</span>
            </div>

            {/* 이미지 첨부 */}
            <div className="mb-6">
              <label className="block mb-2 font-semibold">파일 첨부</label>
              <div className="flex gap-2 items-center">
                {/* 선택된 파일 표시 인풋박스 */}
                <input
                  type="text"
                  readOnly
                  value={imageFile ? imageFile.name : "선택된 파일 없음"}
                  className={`flex-1 border border-deep rounded px-3 h-[35px] min-w-[255px] bg-white ${
                    !imageFile ? "text-gray-deep" : ""
                  }`}
                />

                {/* 파일 선택 버튼 */}
                <div className="w-[200px] min-w-[80px] flex items-center justify-center">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/png, image/jpeg"
                    onChange={handleImageChange}
                    className="hidden "
                  />
                  <BtnComp
                    size="mid"
                    variant="primary"
                    className="mt-0 !h-[35px] w-full "
                    onClick={handleFileButtonClick}
                  >
                    파일 선택
                  </BtnComp>
                </div>
              </div>

              {preview && (
                <img
                  src={preview}
                  alt="preview"
                  className="mt-4 w-32 h-32 object-cover rounded border"
                />
              )}
            </div>

            {/* 내용 */}
            <div className="mb-8">
              <label className="block mb-2 font-semibold">내용</label>
              <textarea className="w-full h-100 border  border-deep rounded p-3 bg-white" />
            </div>

            {/* 버튼 */}
            <div className="flex gap-2 mt-2 w-[50%] mx-auto py-[5%]">
              <BtnComp
                variant="primary"
                size="short"
                className="!w-[48%] !mt-0 !h-[35px] !text-xs md:!text-sm btn_save  "
                onClick={handleSave}
              >
                저장
              </BtnComp>

              <BtnComp
                variant="point"
                size="short"
                className="!w-[48%] !mt-0 !h-[35px] !text-xs md:!text-sm btn_can"
              >
                취소
              </BtnComp>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}

export default NoticeWrite;
