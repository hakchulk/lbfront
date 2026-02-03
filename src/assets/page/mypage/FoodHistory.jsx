import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Chart from '../../../components/ChartComp';
import BtnComp from '../../../components/BtnComp';
import { getBarChartData1 } from '../../../api/TestChartData';
import { getPieChartData2 } from '../../../api/TestChartData';
import { meals } from '../../../api/FoodHistory';

function FoodHistory() {
  const navigate = useNavigate();

  const calorieData = {
    intake: 1450,
    total_calories: 2000,
  };
  const { intake, total_calories } = calorieData;
  const mealList = meals();

  return (
    <>
      {/* 상단 요약 */}
      <div className="wrap pt-[1px]">
        <section className="containers mx-auto h-[900px] text-center">
          <h3 className=" text-deep !text-base md:!text-lg lg:!text-xl xl:!text-2xl">
            <i class="fa-solid fa-utensils"></i> 나의 식사 기록
          </h3>

          <hr className="border-t-14 border-main-02 my-4"></hr>
          <h3 className="mt-15 text-deep !text-base md:!text-lg lg:!text-xl xl:!text-2xl">
            <i class="fa-solid fa-utensils"></i> 오늘의 섭취 : {intake} kcal /
            목표 : {total_calories} kcal
          </h3>

          <h3 className="mt-[2%] text-deep !text-base md:!text-lg lg:!text-xl xl:!text-2xl">
            오늘의 영양 비율
          </h3>

          <div className="w-full  max-w-[520px] mx-auto mt-[2%] border border-main-02 rounded-xl p-6 shadow-sm">
            <Chart type="pie" data={getPieChartData2()} />
          </div>

          <p className="pt-[2%] text-main-02 !text-base md:!text-lg lg:!text-xl xl:!text-xl w-full  max-w-[520px] mx-auto">
            오늘 섭취량이 목표 대비 120 kcal 여유 있습니다. 탄수 섭취 비율이
            약간 높습니다. 단백질 섭취는 적절합니다.
          </p>
          <div className=" w-full  max-w-[520px] mx-auto flex flex-col flex-wrap justify-center items-center  gap-4">
            <BtnComp
              size="long"
              variant="primary"
              onClick={() => navigate('/food_historywrite')}
            >
              오늘의 식사 입력하기
            </BtnComp>
          </div>
        </section>
      </div>

      {/* 일별 식사 기록 리스트 */}
      <div className="wrap !bg-amber-400 pt-[1%]">
        <section className="containers mx-auto px-4 py-10">
          <header className="text-center mb-6">
            <h3 className="text-main-02 flex justify-center items-center gap-2">
              <i class="fa-solid fa-utensils"></i>
              일별 식사 기록 리스트
            </h3>
            <span className="inline-block bg-green-500 text-white text-xs px-3 py-1 rounded-full mt-2">
              2026-01-01
            </span>
          </header>

          <div className="grid  grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-10">
            {mealList.map((meal) => (
              <article
                key={meal.id}
                className="min-h-[460px] bg-pink-50 rounded-xl border border-main-02 p-4 flex flex-col items-center shadow"
              >
                <h3 className="text-lg font-semibold mb-4">{meal.label}</h3>

                <div className="w-[200px] h-[200px] rounded-full overflow-hidden border mb-6">
                  <img
                    src="https://ynczwbybtbjftkatmcxg.supabase.co/storage/v1/object/sign/LB/sal.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV83MjY5YTJlMy0zNGQxLTRkNTMtYWYzMC0wOWM5OTZhMzE0ODMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJMQi9zYWwucG5nIiwiaWF0IjoxNzY5NzU2MjI0LCJleHAiOjE4MDEyOTIyMjR9.3TsRR1yE6Bncxz9AmLaxFi-6DQdqfu-0TE3lhtAvcdo"
                    alt={meal.label}
                    className="w-full h-full object-cover"
                  />
                </div>

                <ul className="text-l text-bg-gray-mid mb-2 text-center leading-5">
                  {meal.items.map((item) => (
                    <li key={item.id}>
                      {item.name} : {item.kcal} kcal
                    </li>
                  ))}
                </ul>

                <p className="text-main-02 text-2xl font-extrabold">
                  {meal.total} kcal
                </p>
                <div className=" flex justify-center items-center mt-4 gap-4">
                  <BtnComp
                    size="mid"
                    variant="primary"
                    onClick={() => navigate('/food_historywrite')}
                  >
                    수정하기
                  </BtnComp>
                  <BtnComp
                    size="mid"
                    variant="primary"
                    onClick={() => navigate('/food_historywrite')}
                  >
                    삭제하기
                  </BtnComp>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>

      {/* 주간 기록 */}
      <div>
        <div className="w-full  max-w-[1040px] mx-auto mt-[2%]  rounded-xl p-6 shadow-sm pt-[10%]">
          <Chart type="bar" data={getBarChartData1()} />
        </div>
      </div>
    </>
  );
}

export default FoodHistory;
