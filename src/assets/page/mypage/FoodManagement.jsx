import React from 'react';
import BtnComp from '../../../components/BtnComp';
import Chart from '../../../components/ChartComp';
import { getDonutChartData1 } from '../../../api/TestChartData';

function FoodManagement() {
  const meals = [
    {
      label: '아침',
      items: [
        { name: '닭가슴살', amount: '150g', emoji: '🥗' },
        { name: '현미밥', amount: '150g', emoji: '🍚' },
        { name: '구운연어', amount: '150g', emoji: '🍣' },
      ],
    },
    {
      label: '점심',
      items: [
        { name: '닭가슴살', amount: '150g', emoji: '🥗' },
        { name: '현미밥', amount: '150g', emoji: '🍚' },
        { name: '구운연어', amount: '150g', emoji: '🍣' },
      ],
    },
    {
      label: '저녁',
      items: [
        { name: '닭가슴살', amount: '150g', emoji: '🥗' },
        { name: '현미밥', amount: '150g', emoji: '🍚' },
        { name: '구운연어', amount: '150g', emoji: '🍣' },
      ],
    },
  ];

  return (
    <section className="wrap  py-16">
      <div className="containers mx-auto text-main-02 text-center">
        {/* 상단 타이틀 */}
        <h3 className="mb-4 text-base md:text-lg lg:text-xl xl:text-2xl">
          <i className="fa-solid fa-utensils mr-2" />
          님을 위한 AI 식단 추천
        </h3>
        <hr className="border-t-10 border-main-02 my-6" />
        <h2 className="mb-8 text-lg font-semibold">오늘의 식단</h2>
        <div className=" myBg bg-light-02">
          {/* 날짜 배지 */}
          <div className="  flex justify-center mb-10">
            <span className=" mt-[5%] inline-flex items-center gap-2 bg-green-600 text-white text-sm px-4 py-1 rounded-full">
              📅 2025-01-01
            </span>
          </div>

          {/* 식단 카드 영역 */}
          <div className="grid grid-cols-1  lg:grid-cols-3 gap-10 max-w-[1100px] mx-auto mb-10">
            {meals.map((meal) => (
              <div
                key={meal.label}
                className="flex flex-col items-center w-full"
              >
                {/* 카드 위 라벨 */}
                <h3 className="mb-3 text-main-02 font-semibold">
                  {meal.label}
                </h3>

                {/* 카드 */}
                <article className="w-full bg-white rounded-xl border border-main-02 p-6 shadow-sm">
                  <div className="flex justify-between gap-2">
                    {meal.items.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex flex-col items-center bg-white rounded-lg border px-3 py-2 w-full"
                      >
                        <div className="text-2xl">{item.emoji}</div>
                        <p className="text-xs mt-1">
                          {item.name} {item.amount}
                        </p>
                      </div>
                    ))}
                  </div>
                </article>
              </div>
            ))}
          </div>

          {/* 설명 문구 */}
          <p className="text-main-02 text-sm max-w-[520px] mx-auto mb-8">
            현재 체중과 활동량을 반영하여 영양 균형이 맞는 식단으로 자동
            추천되었습니다. 목표 달성을 위해 이 식단을 추천합니다.
          </p>

          {/* CTA 버튼 */}
          <div className=" mb-[2%] flex flex-col  gap-3 items-center ">
            <BtnComp size="mid" variant="primary">
              오늘의 식단 새로 받기
            </BtnComp>
            <BtnComp size="mid" variant="primary">
              저장하기
            </BtnComp>
          </div>
        </div>
        <section className="mt-[5%]">
          <h3 className="mb-4 text-base md:text-lg lg:text-xl xl:text-2xl">
            <i className="fa-solid fa-utensils mr-2" />
            오늘의 식단 성분 분석
          </h3>
          <article className="w-full max-w-[520px] mx-auto mt-6 rounded-xl border border-main-02 p-6 shadow-sm">
            <Chart
              type="donut"
              data={getDonutChartData1()}
              options={{
                plugins: {
                  legend: {
                    display: true,
                    position: 'bottom',
                  },
                  title: { display: false },
                },
                maintainAspectRatio: false,
              }}
            />
          </article>
        </section>

        <section className="myBg my-[5%] pb-[5%] max-h-[600px] bg-light-02">
          <h3 className="mt-[2%] text-base md:text-lg lg:text-xl xl:text-2xl">
            <i className="fa-solid fa-utensils mr-2" />
            오늘의 식단 성분 분석
          </h3>
          <article className="w-full max-w-[520px] mx-auto mt-6 rounded-xl border border-main-02 p-6 shadow-sm">
            <Chart
              type="donut"
              data={getDonutChartData1()}
              options={{
                plugins: {
                  legend: {
                    display: true,
                    position: 'bottom',
                  },
                  title: { display: false },
                },
                maintainAspectRatio: false,
              }}
            />
          </article>
        </section>
      </div>
    </section>
  );
}

export default FoodManagement;
