import React, { useState, useRef } from "react";
import BtnComp from "../../../components/BtnComp";
import { apiClient } from "../../../api/config";

function MealAnal({
  containerClassName = "sect2_cont w-[50%] flex flex-col justifycenter items-center",
  titleClassName = "!text-base md:!text-lg lg:!text-xl xl:!text-2xl text-white",
  resultTextClassName = "text-white",
  showResult = true,
  showDetails = true,
  onFileSelected,
  onAnalyzeSuccess,
  onImageChange,
} = {}) {
  const fileInputRef = useRef(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setError("이미지 파일만 선택해 주세요.");
      return;
    }

    setError(null);
    setResult(null);

    const reader = new FileReader();
    reader.onload = () => {
      setImagePreview(reader.result);
      if (typeof onImageChange === "function") {
        onImageChange(reader.result);
      }
      if (typeof onFileSelected === "function") {
        onFileSelected(file);
      }
    };
    reader.readAsDataURL(file);

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const { data } = await apiClient.post(
        "/services/dietanalyzer/analyze",
        formData,
      );
      setResult(data);
      if (data?.status === "SUCCESS" && typeof onAnalyzeSuccess === "function") {
        onAnalyzeSuccess(data);
      }
    } catch (err) {
      setError(err.response?.data?.message || "분석에 실패했습니다.");
    } finally {
      setLoading(false);
      e.target.value = "";
    }
  };

  return (
    <div className={containerClassName}>
      <h2 className={titleClassName}>
        오늘 먹은 음식은 몇 칼로리일까요?
      </h2>

      <div className="w-[250px] h-[250px] border border-white/50 bg-gray-200 rounded-[20px] mt-5 overflow-hidden flex items-center justify-center">
        {imagePreview ? (
          <img
            src={imagePreview}
            alt="식단 미리보기"
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="text-gray-400 text-sm">이미지를 선택해 주세요</span>
        )}
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
        disabled={loading}
      />

      <div className="w-full md:w-1/2 mt-2">
        <BtnComp
          variant="line"
          size="long"
          type="button"
          onClick={handleButtonClick}
          disabled={loading}
        >
          {loading ? "분석 중..." : "클릭해서 음식 사진 업로드"}
        </BtnComp>
      </div>

      {error && <p className="mt-3 text-red-200 text-sm">{error}</p>}

      {showResult && result && result.status === "SUCCESS" && (
        <div className={`mt-4 ${resultTextClassName} text-center`}>
          {result.food_name && (
            <p className="text-base font-semibold opacity-90">
              {result.food_name}
            </p>
          )}
          <p className="text-lg font-semibold mt-1">
            총 칼로리:{" "}
            <span className="text-main-02">{result.calories ?? 0}</span> kcal
          </p>

          {showDetails && result.nutrients && (
            <p className="text-sm mt-2 opacity-80">
              탄수화물 {result.nutrients.carbohydrates ?? 0} g · 단백질{" "}
              {result.nutrients.protein ?? 0} g · 지방{" "}
              {result.nutrients.fat ?? 0} g
            </p>
          )}

          {showDetails && Array.isArray(result.items) && result.items.length > 0 && (
            <div className="mt-3 text-xs opacity-80">
              <p className="mb-1">세부 음식 정보</p>
              <ul className="space-y-1">
                {result.items.map((item, idx) => (
                  <li key={`${item.name}-${idx}`}>
                    {item.name} — {item.weight_gram ?? 0} g /{" "}
                    {item.calories ?? 0} kcal
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default MealAnal;
