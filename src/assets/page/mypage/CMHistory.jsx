import React from 'react';
import Chart from '../../../components/ChartComp';
import { CmChart, cmChartOptions } from '../../../api/TestChartData';

function CMHistory() {
  return (
    <>
      <div className="wrap">
        <section className="">
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
            <div className="w-full max-w-[900px] h-[360px] mx-auto">
              <Chart type="line" data={CmChart()} options={cmChartOptions} />
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default CMHistory;
