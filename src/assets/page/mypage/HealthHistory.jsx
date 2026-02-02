import React from 'react';
import NavComp from '../../../components/NavComp';
import Chart from '../../../components/ChartComp';
import { getBarChartData1 } from '../../../api/TestChartData';

function HealthHistory() {
  return (
    <>
      <div className="w-full md:w-[90%] mx-auto px-4 text-center">
        {/* title */}
        <div>
          <h2 className="mt-25 mb-10 text-main-02 ">나의 운동 기록</h2>
          <hr className="border-t-14 border-main-02 my-4"></hr>
        </div>
        {/* 주간운동 기록 */}
        <div className=" ">
          <h4 className=" mt-15 inline-block bg-main-02 text-white  px-3 py-1 rounded-full mt-2">
            주간 운동 기록
          </h4>
          <Chart type="bar" data={getBarChartData1()} />
        </div>
        <hr className="mt-25 border-t-14 border-main-02 my-4"></hr>
      </div>
    </>
  );
}

export default HealthHistory;
