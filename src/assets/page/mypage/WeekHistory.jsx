import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Chart from '../../../components/ChartComp';
import BtnComp from '../../../components/BtnComp';
import PageNatation from '../../../components/PageNatation';
import usePaginationStore from '../../../stores/paginationStore';
import { WeightChart } from '../../../api/TestChartData';

// 페이지당 카드 수 (PC 4개 기준, 2줄 = 8개)
const PAGE_SIZE = 4;

// 목업: 주간 체중 기록 리스트 (실제로는 API 연동)
const MOCK_WEIGHT_LIST = [
  { id: 1, date: '2025-01-08', weight: 52 },
  { id: 2, date: '2025-01-07', weight: 51 },
  { id: 3, date: '2025-01-06', weight: 50 },
  { id: 4, date: '2025-01-05', weight: 50 },
  { id: 5, date: '2025-01-04', weight: 51 },
  { id: 6, date: '2025-01-03', weight: 49 },
  { id: 7, date: '2025-01-02', weight: 50 },
  { id: 8, date: '2025-01-01', weight: 50 },
  { id: 9, date: '2024-12-31', weight: 51 },
  { id: 10, date: '2024-12-30', weight: 52 },
];

const SORT_OPTIONS = [
  { value: 'latest', label: '최신순' },
  { value: 'oldest', label: '오래된순' },
];

const STORE_KEY = 'week-history';

function WeekHistory() {
  const navigate = useNavigate();
  const [sortOrder, setSortOrder] = useState('latest'); // 'latest' | 'oldest'

  const pagination = usePaginationStore(
    (state) => state.paginations[STORE_KEY],
  );
  const resetPagination = usePaginationStore((state) => state.resetPagination);
  const currentPage = pagination?.currentPage ?? 0;

  // 정렬 변경 시 첫 페이지로 리셋
  useEffect(() => {
    resetPagination(STORE_KEY);
  }, [sortOrder, resetPagination]);

  // 정렬된 리스트 (최신순: 날짜 내림차순, 오래된순: 날짜 오름차순)
  const sortedList = useMemo(() => {
    const list = [...MOCK_WEIGHT_LIST];
    return sortOrder === 'latest'
      ? list.sort((a, b) => new Date(b.date) - new Date(a.date))
      : list.sort((a, b) => new Date(a.date) - new Date(b.date));
  }, [sortOrder]);

  const totalElements = sortedList.length;

  // 현재 페이지에 보여줄 항목만 슬라이스
  const currentPageItems = useMemo(() => {
    const start = currentPage * PAGE_SIZE;
    return sortedList.slice(start, start + PAGE_SIZE);
  }, [currentPage, sortedList]);

  const handlePageChange = () => {
    // 스토어로 페이지가 관리되므로 필요 시 여기서 추가 로직
  };

  const handleEdit = (item) => {
    // TODO: 수정 모달/페이지로 이동 또는 폼에 값 채우기
    console.log('수정', item);
  };

  const handleDelete = (item) => {
    // TODO: 삭제 확인 후 API 호출
    if (window.confirm(`"${item.date}" 기록을 삭제할까요?`)) {
      console.log('삭제', item);
    }
  };

  return (
    <>
      <div className="wrap">
        <section className="">
          <div className="containers mx-auto text-center">
            <h3 className="text-deep text-base md:text-lg lg:text-xl xl:text-2xl">
              <i className="fa-solid fa-weight-scale mr-5" />
              나의 주간 체중 기록
            </h3>
            <hr className=" mt-[4%] border-t-10 border-main-02 my-4" />
            <div className="  flex justify-center mb-10">
              <span className=" mt-[5%] inline-flex items-center gap-2 bg-green-600 text-white text-sm px-4 py-1 rounded-full ">
                <i className="fa-solid fa-calendar-days mr-2"></i>
                주간 체중 기록
              </span>
            </div>
            <div className=" w-[390px] h-[160px] bg-light-02 mx-auto flex items-center justify-center text-center px-4">
              <p className="text-sm text-deep leading-relaxed">
                지난주 보다 3kg 체중이 증가하였습니다. 운동량을 늘리고 식사량을
                조절하세요. 최근 1개월 동안 최고 체중입니다
              </p>
            </div>
            <div className="w-full max-w-[520px] mx-auto mt-[10%] ">
              <Chart
                type="line"
                data={WeightChart()}
                options={{
                  plugins: {
                    title: {
                      display: false,
                    },
                  },
                }}
              />
            </div>
            <hr className=" mt-[5%] border-t-10 border-main-02 my-4" />
          </div>
        </section>
        <section className="mt-[5%]">
          {/* 상단 뱃지 */}
          <div className="  flex justify-center mb-6">
            <span className="inline-flex items-center gap-2 bg-main-02 text-white text-sm px-4 py-1 rounded-full">
              <i className="fa-solid fa-calendar-days mr-2"></i>
              체중 기록 수정
            </span>
          </div>

          {/* 카드 영역 */}
          <div className=" !w-[70%] mx-auto rounded-[20px] p-10 bg-white shadow-lg">
            <h3 className="text-xl font-semibold text-center pt-10 mb-10">
              체중 기록 변화를 입력하세요
            </h3>

            {/* 입력 폼 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-[900px]  mx-auto mb-10">
              {/* 날짜 */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium">날짜</label>
                <div className="relative">
                  <input
                    type="date"
                    className="w-full border border-main-02 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-main-02"
                  />
                </div>
              </div>

              {/* 체중 */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium">체중</label>
                <input
                  type="number"
                  placeholder="kg"
                  className="w-full border border-main-02 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-main-02"
                />
              </div>
            </div>

            {/* 버튼 */}
            <div className="flex  justify-center  w-[300px] min-w-[80px] mx-auto gap-10">
              <BtnComp
                size="short"
                variant="primary"
                className=" w-[150px] px-6 py-3 text-base md:text-lg rounded-lg"
                // onClick={() => navigate('../food_historywrite')}
              >
                저장
              </BtnComp>
              <BtnComp
                size="short"
                variant="primary"
                className=" w-[150px] px-6 py-3 bg-gray-deep text-base md:text-lg rounded-lg"
                // onClick={() => navigate('../food_historywrite')}
              >
                취소
              </BtnComp>
            </div>
          </div>
        </section>
        <section className="mt-[5%] ">
          <div className="containers mx-auto px-4">
            <hr className=" my-[5%] border-t-10 border-main-02 my-4" />
            <h3 className="text-deep text-base md:text-lg lg:text-xl xl:text-2xl text-center">
              <i className="fa-solid fa-weight-scale mr-5" />
              나의 주간 체중 기록 리스트
            </h3>

            {/* 정렬 컨트롤: 최신순 / 오래된순 */}
            <div className="flex flex-wrap items-center justify-end gap-2 mt-6 mb-6">
              <span className="text-sm font-medium text-deep">정렬</span>
              <i className="fa-solid fa-bars text-main-02" aria-hidden />
              {SORT_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => setSortOrder(opt.value)}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    sortOrder === opt.value
                      ? 'bg-main-02 text-white'
                      : 'bg-light-02 text-main-02 border border-main-02 hover:bg-light-01'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>

            {/* 카드 그리드: 모바일 1개, 태블릿 2개, PC 4개 */}
            <div className="wrap !mt-0 ">
              <div className="flex w-full flex-wrap justify-evenly max-w-[1600px]   mx-auto">
                {currentPageItems.map((item) => (
                  <article
                    key={item.id}
                    className="
                   bg-light-02 border border-main-02 rounded-xl p-5 flex flex-col mt-2.5
                   w-full
                    sm:w-full
                    md:w-[45%]
                    lg:w-[22%]
                    
                    "
                  >
                    <p className="text-deep text-sm mb-2">{item.date}</p>
                    <p className="text-deep text-base mb-4">
                      나의 체중 :{' '}
                      <span className="text-main-02 font-semibold">
                        {item.weight}kg
                      </span>
                    </p>
                    <div className="flex gap-2 mt-auto">
                      <BtnComp
                        size="short"
                        variant="primary"
                        className="flex-1 py-2 text-sm rounded-lg"
                        onClick={() => handleEdit(item)}
                      >
                        수정
                      </BtnComp>
                      <BtnComp
                        size="short"
                        variant="primary"
                        className="flex-1 py-2 text-sm rounded-lg bg-gray-deep hover:opacity-90"
                        onClick={() => handleDelete(item)}
                      >
                        삭제
                      </BtnComp>
                    </div>
                  </article>
                ))}
              </div>
            </div>
            {/* 페이지네이션 */}
            <div className="flex justify-center pb-10">
              <PageNatation
                storeKey={STORE_KEY}
                totalElements={totalElements}
                pageSize={PAGE_SIZE}
                pageFn={handlePageChange}
              />
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default WeekHistory;
