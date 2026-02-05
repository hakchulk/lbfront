import React, { useState } from 'react';
import BtnComp from '../../../components/BtnComp';

function FoodHistoryWrite() {
  const [mealType, setMealType] = useState('breakfast');
  const [items, setItems] = useState([
    { name: '파스타', amount: 200 },
    { name: '김치', amount: 200 },
    { name: '고기', amount: 200 },
    { name: '단무지', amount: 200 },
    { name: '', amount: 0 },
  ]);

  return (
    <div className="bg-light-02">
      <div className="containers mx-auto w-full px-6 py-8 text-deep   text-center rounded-2xl ">
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
          <div className=" w-full !max-w-[500px] mx-auto flex justify-center gap-6">
            {['아침', '점심', '저녁', '간식'].map((label) => (
              <label
                key={label}
                className="flex items-center gap-2 cursor-pointer"
              >
                <input type="radio" name="mealType" />
                {label}
              </label>
            ))}
          </div>
        </section>

        {/* 이미지 업로드 */}
        <div className="mb-8">
          <h4 className="font-semibold text-main-02 mb-2">이미지 업로드</h4>
          <div className="flex items-center justify-center gap-2">
            <input
              className="w-full max-w-[360px] border rounded px-3 py-2"
              type="file"
            />
            <BtnComp size="sm" variant="primary">
              PNG/JPG
            </BtnComp>
          </div>
        </div>

        {/* ===== 미리보기 + 칼로리 ===== */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-[160px] h-[160px] rounded-xl overflow-hidden border mb-2">
            <img
              src="https://ynczwbybtbjftkatmcxg.supabase.co/storage/v1/object/sign/LB/sal.png?token=..."
              alt="preview"
              className="w-full h-full object-cover"
            />
          </div>
          <span className="text-xl text-deep">파스타, 김치</span>
          <h3 className="text-main-02 text-2xl font-extrabold">355 kcal</h3>
        </div>

        {/* ===== 식단 설명 ===== */}
        <div className="mb-8">
          <h4 className="text-center font-semibold text-main-02 mb-2">
            식단 설명
          </h4>

          <div className=" w-full !max-w-[500px] mx-auto space-y-2 ">
            {items.map((item, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <input
                  className=" flex-1 border rounded px-3 py-2 text-sm"
                  value={`${item.name} ${item.amount}g`}
                  readOnly
                />
                <button className="w-8 h-8 bg-green-500 text-white rounded">
                  +
                </button>
                <button className="w-8 h-8 bg-green-500 text-white rounded">
                  -
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* ===== 계산 ===== */}
        <div className="flex justify-center mb-4">
          <BtnComp size="short" variant="primary">
            계산
          </BtnComp>
        </div>

        <p className=" mt-[2%] text-center text-sm text-gray-600 mb-8">
          입력하신 식단의 칼로리 소모량은
          <span className="text-red-500 font-semibold ml-1"> 10,000 kcal</span>
          입니다.
        </p>

        {/* ===== 저장 / 취소 ===== */}
        <div className="flex justify-center gap-4">
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
