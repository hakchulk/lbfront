import React from 'react';
import Chart from '../../../components/ChartComp';
import { CmChart, cmChartOptions } from '../../../api/TestChartData';

function CMHistory() {
  return (
    <>
      <div className="wrap">
        <section className=" mb-[5%]">
          <div className="containers mx-auto text-center">
            <h3 className="text-main-02 text-base md:text-lg lg:text-xl xl:text-2xl">
              <i className="fa-solid fa-utensils mr-5" />
              나의 커뮤니티 활동 내역
            </h3>
            <hr className=" mt-[4%] border-t-10 border-main-02 my-4" />
            <div className="  flex justify-center mb-10">
              <span className=" mt-[2%] inline-flex items-center gap-2 bg-green-600 text-white text-sm px-4 py-1 rounded-full ">
                <i className="fa-solid fa-calendar-days mr-2"></i>
                월간 활동 내역
              </span>
            </div>
            <div className="w-full max-w-[900px]  mx-auto">
              <Chart type="line" data={CmChart()} options={cmChartOptions} />
            </div>
          </div>
        </section>
        <section className="wrap mb-[5%]">
          <div className="containers mx-auto text-center ">
            <hr className="  border-t-10 border-main-02 my-4" />
            <div className="  flex justify-center mb-10">
              <span className=" mt-[2%] inline-flex items-center gap-2 bg-green-600 text-white text-sm px-4 py-1 rounded-full ">
                <i className="fa-solid fa-calendar-days mr-2"></i>
                내가 작성한글
              </span>
            </div>
            <div className="w-[900px] mx-auto ">
              <div className=" grid grid-cols-12  bg-gray-100 px-4 py-2 text-center font-semibold text-gray-600">
                <span className="col-span-1 text-left sm:text-center !text-sm !sm:text-md !md:text-lg ">
                  번호
                </span>
                <span className="col-span-5 text-left sm:text-center !text-sm !sm:text-md !md:text-lg ">
                  제목
                </span>
                <span className="col-span-3 !text-sm !sm:text-md !md:text-lg ">
                  모임명
                </span>
                <span className="col-span-3 !text-sm !sm:text-md !md:text-lg ">
                  날짜
                </span>
              </div>
              {/* 공지사항 리스트 */}
              {[
                {
                  id: 1,
                  title: '이번 주 모임 일정 공지',
                  author: '김훈규(CM)',
                  date: '2026-02-05',
                },
                {
                  id: 2,
                  title: '신규 회원 가입 안내',
                  author: '김훈규(CM)',
                  date: '2026-02-03',
                },
                {
                  id: 3,
                  title: '고기 모임 특별 이벤트 안내',
                  author: '김훈규(CM)',
                  date: '2026-02-01',
                },
              ].map((notice, idx) => (
                <div
                  key={notice.id}
                  className="grid grid-cols-12 px-4 py-3 text-center border-b last:border-b-0 hover:bg-gray-50 cursor-pointer"
                >
                  <span className="col-span-1 text-left sm:text-center !text-xs !sm:text-md !md:text-lg">
                    {idx + 1}
                  </span>
                  <span className="col-span-5 text-left sm:text-center text-main-02 !text-sm !sm:text-md !md:text-lg truncate">
                    {notice.title}
                  </span>
                  <span className="col-span-3 !text-xs !sm:text-md !md:text-lg">
                    {notice.author}
                  </span>
                  <span className="col-span-3 !text-xs !sm:text-md !md:text-lg">
                    {notice.date}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default CMHistory;
