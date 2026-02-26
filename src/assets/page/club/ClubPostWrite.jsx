import { useState, useRef, useEffect } from "react";
import BtnComp from "../../../components/BtnComp";
import { useNavigate, useParams } from "react-router-dom";
import { useClubDetailStore } from "../../../api/ClubDetailData";
import { useBoardsStore } from "../../../api/BoardsData";
import { useAuthStore } from "../../../stores/authStore";

function ClubPostWrite() {
  const { id } = useParams();
  const { club, fetchClubDetail } = useClubDetailStore();
  const { createBoard } = useBoardsStore();
  const user = useAuthStore((state) => state.user);
  const navigate = useNavigate();

  // 클럽 상세 데이터 로드
  useEffect(() => {
    const loadClubDetail = async () => {
      try {
        if (id) {
          await fetchClubDetail(id);
        }
      } catch (err) {
        console.error("클럽 상세 데이터 로드 실패:", err);
      }
    };
    loadClubDetail();
  }, [id, fetchClubDetail]);

  const clubName = club?.name || "";

  // 오늘 날짜를 YYYY-MM-DD 형식으로 가져오기
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  const todayString = `${year}-${month}-${day}`;

  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);

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

  /* 게시글 저장 */
  const handleSave = async () => {
    if (!title.trim()) {
      alert("제목을 입력해주세요.");
      return;
    }
    if (!contents.trim()) {
      alert("내용을 입력해주세요.");
      return;
    }
    if (!id) {
      alert("클럽 ID가 없습니다.");
      return;
    }
    if (!user?.id) {
      alert("로그인이 필요합니다.");
      return;
    }

    setLoading(true);

    try {
      // FormData로 모든 데이터를 함께 전송
      const formData = new FormData();
      formData.append("clubId", id);
      formData.append("title", title.trim());
      formData.append("contents", contents.trim());
      formData.append("boardType", "1"); // 일반 게시글
      formData.append("memberName", user.name || "");

      // 파일이 있으면 추가
      if (imageFile) {
        formData.append("file", imageFile);
      }

      // 게시글 저장
      const response = await createBoard(formData);
      
      // 성공 시 alert 표시 후 게시글 상세 페이지로 이동
      const boardId = response?.id || response?.data?.id;
      if (boardId) {
        alert("작성이 완료되었습니다.");
        navigate(`/club/detail/${id}/postlist/posting/${boardId}`);
      } else {
        alert("작성이 완료되었습니다.");
        navigate(`/club/detail/${id}/postlist`);
      }
    } catch (err) {
      console.error("게시글 저장 실패:", err);
      alert(err.response?.data?.message || "게시글 저장에 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  /* 취소 */
  const handleCancel = () => {
    navigate(`../postlist`);
  };

  return (
    <>
      <div className="wrap !mt-0 !bg-light-02">
        <div className="containers w-full sm:!w-[70%]">
          {/* write title */}
          <section className="wr_tit text-black py-[10px] mt-[50px] border-b border-b-[1px] border-b-deep">
            <div className="flex flex-row  items-center text-deep">
              <i class="fa-solid fa-file-pen"></i>
              <span className="ml-1"> {clubName} 모임</span>
            </div>
            <h3>게시글 작성</h3>
          </section>

          {/* 입력 폼 */}
          <section className=" w-full py-8">
            {/* 제목 */}
            <div className="mb-6">
              <label className="block mb-2 font-semibold">제목</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full border  border-deep rounded px-3 h-[35px] bg-white"
                placeholder="제목을 입력하세요"
              />
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
              <textarea
                value={contents}
                onChange={(e) => setContents(e.target.value)}
                className="w-full h-100 border  border-deep rounded p-3 bg-white"
                placeholder="내용을 입력하세요"
                rows={10}
              />
            </div>

            {/* 버튼 */}
            <div className="flex gap-2 mt-2 w-[50%] mx-auto py-[5%]">
              <BtnComp
                variant="primary"
                size="short"
                className="!w-[48%] !mt-0 !h-[35px] !text-xs md:!text-sm btn_save"
                onClick={handleSave}
                disabled={loading}
              >
                {loading ? "저장 중..." : "저장"}
              </BtnComp>

              <BtnComp
                variant="point"
                size="short"
                className="!w-[48%] !mt-0 !h-[35px] !text-xs md:!text-sm btn_can"
                onClick={handleCancel}
                disabled={loading}
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

export default ClubPostWrite;
