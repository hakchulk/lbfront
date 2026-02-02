import React from 'react';
import Chart from '../../../components/ChartComp';
import bgImage from '../../../img/sect2_bg.png';
import BtnComp from '../../../components/BtnComp';
import { getPieChartData2 } from '../../../api/TestChartData';
import { meals } from '../../../api/FoodHistory';

function FoodHistory() {
  const calorieData = {
    intake: 1450,
    total_calories: 2000,
  };
  const { intake, total_calories } = calorieData;
  const mealList = meals();

  return (
    <>
      {/* 상단 1920*860 bg-light-03*/}
      <div className="text-center">
        <div className="w-[1920px] h-[860px] bg-amber-400 pt-10">
          <h3 className="mt-15 text-deep ">
            오늘의 섭취 : {intake}kcal / 목표 : {total_calories} kcal
          </h3>
          <h3 className=" mt-10 text-deep">오늘의 영양 비율</h3>
          <div className=" w-[520px]  mx-auto mt-10  border  border-main-02 rounded-xl p-6 shadow-sm">
            <Chart type="pie" data={getPieChartData2()} />
          </div>
          <p className="pt-15 text-main-02">
            오늘 섭취량이 목표대비 부족합니다. 균형잡힌 식단을 위해
          </p>
        </div>

        {/* 중간 부분 */}

        <div
          className=" relative w-full h-[500px] bg-cover bg-center"
          style={{ backgroundImage: `url(${bgImage})` }}
        >
          {/* 콘텐츠 영역 */}
          <div className="relative z-10 flex flex-col items-center justify-center h-full text-white px-4">
            <h2 className="text-2xl md:text-4xl font-bold mb-8 text-center">
              오늘 먹은 음식은 몇 칼로리일까요?
            </h2>

            {/* 식사 시간 선택 */}
            <div className="w-full max-w-[500px] flex justify-between mb-6">
              {['아침', '점심', '저녁', '간식'].map((label) => (
                <label
                  key={label}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <input
                    type="radio"
                    name="mealType"
                    className="form-radio text-green-500"
                  />
                  <span className="text-base md:text-lg">{label}</span>
                </label>
              ))}
            </div>

            {/* 버튼 영역 */}
            <div className="w-full max-w-[500px] flex justify-between  mb-6">
              <BtnComp size="mid" variant="primary">
                클릭해서 사진 업로드
              </BtnComp>

              <BtnComp size="mid" variant="primary">
                직접 음식 입력하기
              </BtnComp>
            </div>
          </div>
        </div>

        {/* 중간부분 끝 */}

        {/*  일별 식사 기록 리스트  1920*1250 bg-light-03*/}
        <div className="w-[1920px] h-[1255px] bg-amber-400 pt-10">
          <section className="max-w-screen-xl mx-auto px-4 py-10">
            {/* 헤더 */}
            <div className="text-center mb-6">
              <h3 className="text-main-02 ">📝 일별 식사 기록 리스트</h3>
              <span className="inline-block bg-green-500 text-white text-xs px-3 py-1 rounded-full mt-2">
                2026-01-01
              </span>
            </div>

            {/* 카드 리스트 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 pt-15">
              {mealList.map((meal, idx) => (
                <div
                  key={idx}
                  className="h-[590px] bg-pink-50 rounded-xl border border-green-600 p-4 flex flex-col items-center shadow"
                >
                  <h3 className=" text-lg font-semibold pt-10 mb-2">
                    {meal.label}
                  </h3>

                  <div className="w-[150px] h-[150px] rounded-full overflow-hidden border mb-3">
                    <img
                      src={meal.image}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="text-sm text-gray-700 mb-2 text-center leading-5">
                    {meal.items.map((item, i) => (
                      <div key={i}>
                        {item.name} : {item.kcal} kcal
                      </div>
                    ))}
                  </div>

                  <p className="text-green-500 text-lg font-bold mt-2">
                    {meal.total} kcal
                  </p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </>
  );
}

export default FoodHistory;
