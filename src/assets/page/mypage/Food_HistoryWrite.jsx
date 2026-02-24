import React, { useState, useRef } from 'react';
import BtnComp from '../../../components/BtnComp';

function FoodHistoryWrite() {
  // 이미지 업로드 부분
  const fileRef = useRef(null);
  const [fileName, setFileName] = useState('');
  const [preview, setPreview] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setFileName(file.name);
    setPreview(URL.createObjectURL(file));
  };

  //식단 설명
  const [mealType, setMealType] = useState('breakfast');
  const [items, setItems] = useState([
    { name: '파스타', amount: 200 },
    { name: '김치', amount: 200 },
  ]);

  /* =====================
     handlers
  ====================== */

  const addItem = () => {
    setItems((prev) => [...prev, { name: '', amount: 0 }]);
  };

  const removeItem = (index) => {
    setItems((prev) => prev.filter((_, idx) => idx !== index));
  };

  const updateItem = (index, field, value) => {
    setItems((prev) =>
      prev.map((item, idx) =>
        idx === index ? { ...item, [field]: value } : item,
      ),
    );
  };

  return (
    <div className="bg-light-02">
      <div className="containers mx-auto w-full px-6 py-8 text-deep text-center rounded-2xl">
        {/* 헤더 */}
        <header className="mb-10">
          <span className="mt-[10%] inline-block bg-main-02 text-white text-xs px-3 py-1 rounded-full mb-2">
            식사 기록 작성
          </span>
          <h3 className="text-main-02 flex justify-center items-center gap-2 text-lg md:text-xl lg:text-2xl">
            <i className="fa-solid fa-utensils" />
            오늘 먹은 음식은 몇 칼로리일까요?
          </h3>
          <hr className="border-t-12 border-main-02 my-6" />
        </header>

        {/* 식사 구분 */}
        <section className="mb-8">
          <h3 className="font-semibold mb-3">식사구분</h3>

          <div className="w-full max-w-[500px] mx-auto flex justify-center gap-6">
            {[
              { label: '아침', value: 'breakfast', icon: 'fa-sun' },
              { label: '점심', value: 'lunch', icon: 'fa-bowl-food' },
              { label: '저녁', value: 'dinner', icon: 'fa-moon' },
              { label: '간식', value: 'snack', icon: 'fa-cookie-bite' },
            ].map((item) => {
              const active = mealType === item.value;

              return (
                <button
                  key={item.value}
                  type="button"
                  onClick={() => setMealType(item.value)}
                  className="flex items-center gap-2"
                >
                  {/* 라디오 아이콘 대체 */}
                  <i
                    className={`fa-solid ${
                      active
                        ? 'fa-circle-dot text-green-500'
                        : 'fa-circle text-white border border-main-02 rounded-full '
                    } text-xl`}
                  />
                  <span
                    className={`text-sm ${
                      active ? 'text-green-600 font-semibold' : 'text-gray-500'
                    }`}
                  >
                    {item.label}
                  </span>
                </button>
              );
            })}
          </div>
        </section>

        {/* ===== 이미지 업로드 ===== */}
        <div className="mb-8">
          <h4 className="font-semibold text-main-02 mb-3 text-center">
            이미지 업로드
          </h4>

          {/* 파일 선택 영역 */}
          <div className="flex items-center justify-center gap-2 mb-6">
            <input
              type="text"
              readOnly
              value={fileName}
              placeholder="파일을 선택해주세요"
              className="w-full max-w-[320px] border rounded px-3 py-2 text-sm bg-white"
            />

            <input
              ref={fileRef}
              type="file"
              accept="image/png, image/jpeg"
              onChange={handleFileChange}
              hidden
            />

            <BtnComp
              size="short"
              variant="primary"
              className="w-[150px] h-[40px] mt-0"
              onClick={() => fileRef.current.click()}
            >
              JPG/PNG
            </BtnComp>
          </div>

          {/* 미리보기 */}
          {preview && (
            <div className="flex flex-col items-center">
              <div className="w-[160px] h-[160px] rounded-xl overflow-hidden border mb-2">
                <img
                  src={preview}
                  alt="preview"
                  className="w-full h-full object-cover"
                />
              </div>

              <span className="text-sm text-deep mb-1">파스타, 김치</span>
              <h3 className="text-main-02 text-xl font-extrabold">355 kcal</h3>
            </div>
          )}
        </div>

        {/* ===== 식단 설명 ===== */}
        <div className="mb-4">
          <h4 className="text-center font-semibold text-main-02 mb-2">
            식단 설명
          </h4>

          <div className="w-full max-w-[500px] mx-auto space-y-2">
            {items.map((item, idx) => (
              <div key={idx} className="flex items-center bg-white gap-2">
                <input
                  className="flex-1 border rounded px-3 py-2 text-sm"
                  placeholder="음식명"
                  value={item.name}
                  onChange={(e) => updateItem(idx, 'name', e.target.value)}
                />

                <button
                  onClick={() => removeItem(idx)}
                  className="w-10 h-10 bg-red-500 text-white rounded"
                >
                  삭제
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* ===== 추가 버튼 (칸 늘리기) ===== */}
        <div className="flex justify-center mb-4">
          <BtnComp size="short" variant="primary" onClick={addItem}>
            식단 추가
          </BtnComp>
        </div>
        {/* ===== 계산 ===== */}
        <div className="flex justify-center mb-4">
          <BtnComp size="short" variant="primary">
            계산
          </BtnComp>
        </div>

        <p className="mt-2 text-center text-sm text-gray-600 mb-8">
          입력하신 식단의 칼로리는
          <span className="text-red-500 font-semibold ml-1">10,000 kcal</span>
          입니다.
        </p>

        {/* ===== 저장 / 취소 ===== */}
        <div className="flex justify-center mb-[10%] gap-4">
          <BtnComp size="short" variant="primary">
            저장
          </BtnComp>
          <BtnComp size="short" variant="primary">
            취소
          </BtnComp>
        </div>
      </div>
    </div>
  );
}

export default FoodHistoryWrite;
