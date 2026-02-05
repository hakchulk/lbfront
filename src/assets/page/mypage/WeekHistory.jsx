import React from 'react';
import { useNavigate } from 'react-router-dom';
import Chart from '../../../components/ChartComp';
import BtnComp from '../../../components/BtnComp';

import { WeightChart } from '../../../api/TestChartData';

function WeekHistory() {
  return (
    <>
      <section className="wrap  py-10">
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
          <article className="w-[390px] h-[160px] bg-light-02 mx-auto flex items-center justify-center text-center px-4">
            <p className="text-sm text-deep leading-relaxed">
              지난주 보다 3kg 체중이 증가하였습니다. 운동량을 늘리고 식사량을
              조절하세요. 최근 1개월 동안 최고 체중입니다
            </p>
          </article>
          <Chart type="pie" data={WeightChart()} />
        </div>
      </section>
      <section className="wrap  py-10">
        <div className="containers mx-auto text-center">
          <hr className=" mt-[4%] border-t-10 border-main-02 my-4" />
        </div>
      </section>
    </>
  );
}

export default WeekHistory;
