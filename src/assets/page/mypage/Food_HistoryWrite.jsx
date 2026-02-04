import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import BtnComp from '../../../components/BtnComp';

function Food_HistoryWrite() {
  return (
    <>
      <div className="w-full   ">
        <div className=" flex justify-center  containers">
          <section>
            <header className="pt-[5%] text-center mb-6">
              <span className="inline-block bg-main-02 text-white text-xs px-3 py-1 rounded-full mt-2">
                식사 기록 작성
              </span>
              <h3 className="pt-[2%] text-main-02 flex justify-center items-center gap-2">
                <i className="fa-solid fa-utensils"></i>
                오늘 먹은 음식은 몇 칼로리일까요?
              </h3>
              <hr className="mt-[3%] border-t-14 border-main-02 my-4"></hr>
            </header>
          </section>
          <section className="w-full flex justify-center items-center gap-10 mb-10">
            <div className="sect2_cont w-[50%] flex flex-col justify-center items-center">
              <h2 className="!text-base md:!text-lg lg:!text-xl xl:!text-2xl text-white">
                오늘 먹은 음식은 몇 칼로리일까요?
              </h2>

              <div className="w-[250px] h-[250px] border border-white/50 bg-gray-200 rounded-[20px] mt-5"></div>

              {/* <div className="w-full md:w-1/2">
                <BtnComp variant="line" size="long">
                  클릭해서 음식 사진 업로드
                </BtnComp>
              </div> */}
            </div>
          </section>
        </div>
      </div>
      ;
    </>
  );
}

export default Food_HistoryWrite;
