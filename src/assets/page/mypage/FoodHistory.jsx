import React from 'react';
import { useNavigate } from 'react-router-dom';
import Chart from '../../../components/ChartComp';
import BtnComp from '../../../components/BtnComp';
import { getBarChartData1, getPieChartData2 } from '../../../api/TestChartData';
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
      {/* ===== 상단 요약 ===== */}
      <section className="wrap bg-white py-10">
        <div className="containers mx-auto text-center">
          <h3 className="text-deep text-base md:text-lg lg:text-xl xl:text-2xl">
            <i className="fa-solid fa-utensils mr-5" />
            나의 식사 기록
          </h3>

          <hr className=" mt-[4%] border-t-10 border-main-02 my-4" />

          <h3 className="mt-[5%] text-deep text-base md:text-lg lg:text-xl xl:text-2xl">
            오늘의 섭취 : {intake} kcal / 목표 : {total_calories} kcal
          </h3>

          <h3 className="mt-4 text-deep text-base md:text-lg lg:text-xl xl:text-2xl">
            오늘의 영양 비율
          </h3>

          <div className="w-full max-w-[520px] mx-auto mt-6 border border-main-02 rounded-xl p-6 shadow-sm">
            <Chart type="pie" data={getPieChartData2()} />
          </div>

          <p className="mt-6 text-main-02 text-base md:text-lg max-w-[520px] mx-auto">
            오늘 섭취량이 목표 대비 120 kcal 여유 있습니다. 탄수 섭취 비율이
            약간 높고, 단백질 섭취는 적절합니다.
          </p>

          <div className="w-full max-w-[520px] mx-auto mt-6">
            <BtnComp
              size="long"
              variant="primary"
              onClick={() => navigate('../food_historywrite')}
            >
              오늘의 식사 입력하기
            </BtnComp>
          </div>
        </div>
      </section>

      {/* ===== 일별 식사 기록 리스트 ===== */}
      <section className="wrap !bg-point   py-10">
        <div className="containers mx-auto px-4">
          <header className="text-center mb-8">
            <h3 className="text-main-02 flex justify-center items-center gap-2">
              <i className="fa-solid fa-utensils mr-3" />
              일별 식사 기록 리스트
            </h3>
            <span className="inline-block bg-green-500 text-white text-[11px] px-3 py-1 rounded-full mt-2">
              2026-01-01
            </span>
          </header>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
            {mealList.map((meal) => (
              <div key={meal.id} className="flex flex-col items-center">
                <h3 className="mb-4 text-base font-semibold text-deep">
                  {meal.label}
                </h3>

                <article className="max-w-[340px] w-full bg-pink-50 rounded-xl border border-main-02 p-4 flex flex-col items-center shadow">
                  <div
                    className="
                      w-[200px] h-[200px]
                      sm:w-[220px] sm:h-[220px]
                      md:w-[260px] md:h-[260px]
                      lg:w-[300px] lg:h-[300px]
                      rounded-full overflow-hidden border my-8
                    "
                  >
                    <img
                      src="https://ynczwbybtbjftkatmcxg.supabase.co/storage/v1/object/sign/LB/sal.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV83MjY5YTJlMy0zNGQxLTRkNTMtYWYzMC0wOWM5OTZhMzE0ODMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJMQi9zYWwucG5nIiwiaWF0IjoxNzY5NzU2MjI0LCJleHAiOjE4MDEyOTIyMjR9.3TsRR1yE6Bncxz9AmLaxFi-6DQdqfu-0TE3lhtAvcdo"
                      alt={meal.label}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <ul className="text-base text-bg-gray-mid mb-6 text-center leading-7">
                    {meal.items.map((item) => (
                      <li key={item.id}>
                        {item.name} : {item.kcal} kcal
                      </li>
                    ))}
                  </ul>

                  <p className="text-main-02 !text-3xl font-extrabold">
                    {meal.total} kcal
                  </p>

                  <div className="flex justify-center items-center mt-4 gap-4">
                    <BtnComp
                      size="long"
                      variant="primary"
                      className="px-6 py-3 text-base md:text-lg rounded-lg"
                      onClick={() => navigate('../food_historywrite')}
                    >
                      수정
                    </BtnComp>
                    <BtnComp
                      size="long"
                      variant="primary"
                      className="px-6 py-3 text-base md:text-lg rounded-lg"
                      onClick={() => navigate('../food_historywrite')}
                    >
                      삭제
                    </BtnComp>
                  </div>
                </article>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 주간 기록 ===== */}
      <section className="wrap bg-white py-10">
        <div className="w-full max-w-[1040px] mx-auto rounded-xl p-6 shadow-sm">
          <Chart
            type="bar"
            data={getBarChartData1()}
            options={{
              plugins: {
                title: {
                  display: false,
                },
              },
            }}
          />
        </div>
      </section>
    </>
  );
}

export default FoodHistory;
