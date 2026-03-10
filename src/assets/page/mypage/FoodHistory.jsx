import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Chart from '../../../components/ChartComp';
import BtnComp from '../../../components/BtnComp';
import { barChartOptions } from '../../../api/TestChartData';
import { getDietLogs, getDietLogsByDate, deleteDietLog } from '../../../api/DietLogData';
import { getMealItemsByMealId } from '../../../api/MealItemData';
import { apiClient } from '../../../api/config';

const MEAL_TYPE_LABEL = { B: '아침', L: '점심', D: '저녁', S: '간식' };

/** 재료 필드 파싱 (JSON 배열 또는 쉼표 구분 문자열) */
function parseIngredients(ingredientsRaw) {
  if (!ingredientsRaw) return [];
  if (Array.isArray(ingredientsRaw)) return ingredientsRaw.map((s) => String(s).trim()).filter(Boolean);
  if (typeof ingredientsRaw !== 'string') return [];
  try {
    const parsed = JSON.parse(ingredientsRaw);
    return Array.isArray(parsed) ? parsed.map((s) => String(s).trim()).filter(Boolean) : [];
  } catch {
    return ingredientsRaw.split(',').map((s) => s.trim()).filter(Boolean);
  }
}

const PIE_COLORS = [
  '#d6cdea', '#e9b1f7', '#fcd0d0', '#cdebcf', '#f9cd9e',
  '#a8e6cf', '#ffd3b6', '#dcb5ff', '#9bf6ff', '#b4e7ce',
];

/** 식단/재료가 없을 때 차트를 한 덩어리로 보여주기 위한 데이터 */
const EMPTY_INGREDIENT_CHART = {
  labels: ['기록 없음'],
  datasets: [
    { data: [1], backgroundColor: ['#e5e7eb'], borderWidth: 1 },
  ],
};

const EMPTY_WEEKLY_BAR = {
  labels: ['일', '월', '화', '수', '목', '금', '토'],
  datasets: [
    {
      data: [0, 0, 0, 0, 0, 0, 0],
      backgroundColor: 'rgba(177, 239, 102, 0.6)',
      borderColor: '#b1ef66',
      borderWidth: 1,
    },
  ],
};

function FoodHistory() {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedDate, setSelectedDate] = useState(() =>
    new Date().toISOString().slice(0, 10),
  );
  const [dietLogs, setDietLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [goalCalories, setGoalCalories] = useState(2000);
  const [ingredientChartData, setIngredientChartData] = useState(EMPTY_INGREDIENT_CHART);
  const [weeklySummary, setWeeklySummary] = useState({
    averageKcal: 0,
    recordedDays: 0,
    noRecordDays: 7,
    barData: EMPTY_WEEKLY_BAR,
  });

  useEffect(() => {
    const msg = location.state?.successMessage;
    const date = location.state?.date;
    if (msg) {
      setSuccessMessage(msg);
      if (typeof date === 'string' && date) {
        setSelectedDate(date);
      }
      // 뒤로/새로고침 반복 표시 방지
      window.history.replaceState({}, document.title);
      setTimeout(() => setSuccessMessage(null), 3000);
    }
  }, [location.state]);

  // 로그인 회원의 일일 목표 칼로리(daily_calories)를 /me에서 조회
  useEffect(() => {
    let cancelled = false;
    const fetchGoalCalories = async () => {
      try {
        const res = await apiClient.get('/me');
        const raw = res?.data?.daily_calories ?? res?.data?.dailyCalories;
        if (!cancelled && raw != null) {
          setGoalCalories(Number(raw) || 2000);
        }
      } catch (e) {
        // 실패 시에는 기본값(2000 kcal)을 그대로 사용
        console.error('일일 목표 칼로리 조회 실패:', e);
      }
    };
    fetchGoalCalories();
    return () => {
      cancelled = true;
    };
  }, []);

  const fetchDietLogs = useCallback(async (dateStr) => {
    setLoading(true);
    setError(null);
    try {
      const list = await getDietLogsByDate(dateStr);
      setDietLogs(Array.isArray(list) ? list : []);
    } catch (e) {
      setError(e.response?.data?.message || e.message || '식사 기록을 불러오지 못했습니다.');
      setDietLogs([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleDeleteMealType = async (mealType, logIds) => {
    if (!logIds || logIds.length === 0) return;
    const ok = window.confirm('해당 끼니의 기록을 삭제할까요? (식단 자체는 남습니다)');
    if (!ok) return;
    try {
      await Promise.all(logIds.map((id) => deleteDietLog(id)));
      await fetchDietLogs(selectedDate);
    } catch (e) {
      setError(e.response?.data?.message || e.message || '삭제에 실패했습니다.');
    }
  };

  useEffect(() => {
    fetchDietLogs(selectedDate);
  }, [selectedDate, fetchDietLogs]);

  // 선택한 날짜가 포함된 한 주(월~일) 기준 주간 섭취 칼로리/기록 일수 요약
  useEffect(() => {
    if (!selectedDate) return;
    let cancelled = false;

    const base = new Date(selectedDate);
    if (Number.isNaN(base.getTime())) return;

    const day = base.getDay(); // 0(일)~6(토)
    const diffToMonday = (day + 6) % 7; // 월:0, 화:1 ...
    const monday = new Date(base);
    monday.setDate(base.getDate() - diffToMonday);
    monday.setHours(0, 0, 0, 0);
    const sunday = new Date(monday);
    sunday.setDate(monday.getDate() + 6);
    sunday.setHours(23, 59, 59, 999);

    const fromDate = monday.toISOString().slice(0, 10);
    const toDate = sunday.toISOString().slice(0, 10);

    // 월~일 날짜 라벨 (MM/DD 형태, 월요일이 맨 앞)
    const labelsForChart = [];
    for (let i = 0; i < 7; i += 1) {
      const d = new Date(monday);
      d.setDate(monday.getDate() + i);
      const m = d.getMonth() + 1;
      const dayNum = d.getDate();
      labelsForChart.push(`${m}/${dayNum}`);
    }

    (async () => {
      try {
        const logs = await getDietLogs({ fromDate, toDate });
        if (cancelled) return;
        const list = Array.isArray(logs) ? logs : [];

        const dayTotals = [];
        for (let i = 0; i < 7; i += 1) {
          const d = new Date(monday);
          d.setDate(monday.getDate() + i);
          const dateStr = d.toISOString().slice(0, 10);
          const total = list
            .filter((log) => String(log.dateAt).slice(0, 10) === dateStr)
            .reduce((sum, log) => sum + (log.meal?.totalCalories ?? 0), 0);
          dayTotals.push(total);
        }

        const weeklyTotal = dayTotals.reduce((sum, v) => sum + v, 0);
        const averageKcal = Math.round(weeklyTotal / 7);
        const recordedDays = dayTotals.filter((v) => v > 0).length;
        const noRecordDays = 7 - recordedDays;

        setWeeklySummary({
          averageKcal,
          recordedDays,
          noRecordDays,
          barData: {
            labels: labelsForChart,
            datasets: [
              {
                ...EMPTY_WEEKLY_BAR.datasets[0],
                data: dayTotals,
              },
            ],
          },
        });
      } catch (e) {
        if (!cancelled) {
          setWeeklySummary({
            averageKcal: 0,
            recordedDays: 0,
            noRecordDays: 7,
            barData: {
              labels: labelsForChart,
              datasets: [
                {
                  ...EMPTY_WEEKLY_BAR.datasets[0],
                  data: EMPTY_WEEKLY_BAR.datasets[0].data,
                },
              ],
            },
          });
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [selectedDate]);

  // 선택한 날짜의 diet_log에서 mealId 수집 → meal_item 조회 → 재료(ingredient) 기준 파이 차트 데이터 생성
  useEffect(() => {
    const mealIds = [...new Set(dietLogs.map((log) => log.mealId).filter((id) => id != null))];
    if (mealIds.length === 0) {
      setIngredientChartData(EMPTY_INGREDIENT_CHART);
      return;
    }
    let cancelled = false;
    (async () => {
      try {
        const allItems = await Promise.all(
          mealIds.map((mealId) =>
            getMealItemsByMealId(mealId).then((items) => Array.isArray(items) ? items : []),
          ),
        );
        if (cancelled) return;
        const flatItems = allItems.flat();
        const countByIngredient = {};
        flatItems.forEach((item) => {
          const ingredients = parseIngredients(item.ingredients);
          ingredients.forEach((ing) => {
            const key = String(ing).trim();
            if (!key) return;
            countByIngredient[key] = (countByIngredient[key] || 0) + 1;
          });
        });
        const entries = Object.entries(countByIngredient).sort((a, b) => b[1] - a[1]);
        if (entries.length === 0) {
          setIngredientChartData(EMPTY_INGREDIENT_CHART);
          return;
        }
        const maxSlices = 10;
        const top = entries.slice(0, maxSlices);
        const rest = entries.slice(maxSlices);
        const restCount = rest.reduce((s, [, n]) => s + n, 0);
        const labels = top.map(([name]) => name);
        const data = top.map(([, n]) => n);
        if (restCount > 0) {
          labels.push('기타');
          data.push(restCount);
        }
        setIngredientChartData({
          labels,
          datasets: [
            {
              data,
              backgroundColor: labels.map((_, i) => PIE_COLORS[i % PIE_COLORS.length]),
              borderWidth: 1,
            },
          ],
        });
      } catch (e) {
        if (!cancelled) setIngredientChartData(EMPTY_INGREDIENT_CHART);
      }
    })();
    return () => { cancelled = true; };
  }, [dietLogs]);

  // diet_log를 끼니별(B/L/D/S)로 묶음. 저장하기로 채택한 식단이 여기서 보임
  const mealListByType = Object.entries(MEAL_TYPE_LABEL).map(([type, label]) => {
    const logs = dietLogs.filter(
      (log) => log.meal && String(log.meal.mealType) === type,
    );
    const total = logs.reduce(
      (sum, log) => sum + (log.meal?.totalCalories ?? 0),
      0,
    );
    const items = logs.map((log) => ({
      id: log.id,
      name: log.meal?.menu ?? '(메뉴 없음)',
      kcal: log.meal?.totalCalories ?? 0,
    }));
    const firstMeal = logs[0]?.meal;
    const imageUrl =
      firstMeal?.imageUrl ||
      firstMeal?.image ||
      firstMeal?.photoUrl ||
      null;
    return { type, label, items, total, imageUrl, logIds: logs.map((l) => l.id) };
  });
  const hasAnyMeals = mealListByType.some((m) => m.items.length > 0);
  const totalIntake = mealListByType.reduce((sum, m) => sum + m.total, 0);

  return (
    <>
      {/* ===== 상단 요약 ===== */}
      <section className="wrap bg-white pt-[2%] py-10">
        <div className="containers mx-auto text-center">
          <h3 className="text-deep text-base md:text-lg lg:text-xl xl:text-2xl">
            <i className="fa-solid fa-utensils mr-5" />
            나의 식사 기록
          </h3>

          <hr className=" mt-[4%] border-t-10 border-main-02 my-4" />

          {successMessage && (
            <p className="text-green-600 text-sm mt-3">{successMessage}</p>
          )}

          <h3 className="mt-[5%] text-deep text-base md:text-lg lg:text-xl xl:text-2xl">
            오늘의 섭취 : {totalIntake} kcal / 목표 : {goalCalories} kcal
          </h3>

          <h3 className="mt-4 text-deep text-base md:text-lg lg:text-xl xl:text-2xl">
            오늘의 성분 구성
          </h3>

          <div className="w-full max-w-[520px] mx-auto mt-6 border border-main-02 rounded-xl p-6 shadow-sm">
            <Chart type="pie" data={ingredientChartData} />
          </div>

          <p className="mt-6 text-main-02 text-base md:text-lg max-w-[520px] mx-auto">
            오늘 섭취량이 목표 대비 {goalCalories - totalIntake} kcal{' '}
            {goalCalories - totalIntake >= 0 ? '여유' : '초과'} 있습니다. 
          </p>

          <div className="w-full max-w-[520px] mx-auto mt-6">
            <BtnComp
              size="long"
              variant="primary"
              onClick={() =>
                navigate('../food_historywrite', {
                  state: { editDate: selectedDate, mode: 'create' },
                })
              }
            >
              오늘의 식사 입력하기
            </BtnComp>
          </div>
        </div>
      </section>

      {/* ===== 일별 식사 기록 리스트 ===== */}
      <section className="wrap !bg-light-02   py-10">
        <div className="containers mx-auto px-4">
          <header className="text-center mb-8">
            <h3 className="text-main-02 flex justify-center items-center gap-2">
              <i className="fa-solid fa-utensils mr-3" />
              일별 식사 기록 리스트
            </h3>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="inline-block bg-green-500 text-white text-sm md:text-base px-4 py-2 rounded-full mt-3 border-0 cursor-pointer min-w-[170px]"
            />
          </header>

          {error && (
            <p className="text-red-600 text-sm text-center mb-4">{error}</p>
          )}
          {loading ? (
            <p className="text-center text-main-02">식사 기록을 불러오는 중...</p>
          ) : !hasAnyMeals ? (
            <p className="text-center text-gray-500">
              해당 날짜의 식사 기록이 없습니다. 식단 관리에서 추천 받고 저장하기를 눌러보세요.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
              {mealListByType.map((meal) => {
                const displayItems = meal.items.filter(
                  (it) =>
                    (Number(it.kcal) ?? 0) > 0 &&
                    String(it.name ?? '').trim() !== '',
                );
                return (
                <div key={meal.type} className="flex flex-col items-center">
                  <h3 className="mb-4 text-base font-semibold text-deep">
                    {meal.label}
                  </h3>

                  <article className="max-w-[340px] w-full bg-white rounded-xl border border-main-02 p-4 flex flex-col items-center shadow">
                    <div
                      className="
                        w-[90%] aspect-square 
                        rounded-full overflow-hidden border my-8
                      "
                    >
                      <img
                        src={
                          meal.imageUrl ||
                          "https://ynczwbybtbjftkatmcxg.supabase.co/storage/v1/object/sign/LB/sal.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV83MjY5YTJlMy0zNGQxLTRkNTMtYWYzMC0wOWM5OTZhMzE0ODMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJMQi9zYWwucG5nIiwiaWF0IjoxNzY5NzU2MjI0LCJleHAiOjE4MDEyOTIyMjR9.3TsRR1yE6Bncxz9AmLaxFi-6DQdqfu-0TE3lhtAvcdo"
                        }
                        alt={meal.label}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <ul className="text-base text-bg-gray-mid mb-6 text-center leading-7">
                      {displayItems.length === 0 ? (
                        <li className="text-gray-400">기록 없음</li>
                      ) : (
                        displayItems.map((item) => (
                          <li key={item.id}>
                            {String(item.name).trim()} : {item.kcal} kcal
                          </li>
                        ))
                      )}
                    </ul>

                    <p className="text-main-02 !text-3xl font-extrabold">
                      {meal.total} kcal
                    </p>

                    {displayItems.length === 0 ? (
                      <div className="flex justify-center items-center mt-4">
                        <BtnComp
                          size="long"
                          variant="primary"
                          className="px-6 py-3 text-base md:text-lg rounded-lg"
                          onClick={() =>
                            navigate('../food_historywrite', {
                              state: {
                                editDate: selectedDate,
                                mode: 'create',
                                mealType: meal.type,
                              },
                            })
                          }
                        >
                          추가
                        </BtnComp>
                      </div>
                    ) : (
                      <div className="flex justify-center items-center mt-4 gap-4">
                        <BtnComp
                          size="long"
                          variant="primary"
                          className="px-6 py-3 text-base md:text-lg rounded-lg"
                          onClick={() =>
                            navigate('../food_historywrite', {
                              state: { editDate: selectedDate, mealType: meal.type },
                            })
                          }
                        >
                          수정
                        </BtnComp>
                        <BtnComp
                          size="long"
                          variant="primary"
                          className="px-6 py-3 text-base md:text-lg rounded-lg"
                          onClick={() => handleDeleteMealType(meal.type, meal.logIds)}
                        >
                          삭제
                        </BtnComp>
                      </div>
                    )}
                  </article>
                </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* ===== 주간 기록 ===== */}
      <section className="wrap bg-white mb-[10%] py-10">
        <div className="w-full max-w-[1040px] mx-auto rounded-xl p-6 shadow-sm">
          {/* 👇 여기! 내용은 전부 JSX */}
          <div className="flex flex-col items-center mb-6">
            <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
              <span className="w-12 h-5  bg-main-01" />
              <span>주간 섭취 칼로리</span>
            </div>

            <h2 className="text-xl font-bold text-green-600">
              주간 평균 {weeklySummary.averageKcal} kcal
            </h2>

            <p className="text-xs text-gray-500 mt-1">
              기록 {weeklySummary.recordedDays}일 · 미기록 {weeklySummary.noRecordDays}일
            </p>
          </div>

          {/* 👇 Chart는 그래프만 */}
          <Chart
            type="bar"
            data={weeklySummary.barData}
            options={barChartOptions}
          />
        </div>
      </section>
    </>
  );
}

export default FoodHistory;
