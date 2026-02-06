import React from "react";

function Noticemanagement() {
  // 샘플 데이터 - 실제로는 API에서 받아올 데이터
  const clubName = "고기고기"; // 클럽 이름

  return (
    <>
      <div className="wrap !mt-0  !bg-light-02 ">
        <div className="containers">
          {/* sect_tit */}
          <section className="sect_tit flex items-center justify-center mx-0 mt-[50px] border-b-[5px] border-main-02 ">
            <h3 className=" !text-main-02 mb-[20px] !text-[20px] lg:!text-[30px] flex items-center justify-center ">
              <span className="material-icons mr-[5px] !text-[30px] lg:!text-[40px] ">
                list
              </span>
              {clubName} 모임의 신청 리스트
            </h3>
          </section>
        </div>
      </div>
    </>
  );
}

export default Noticemanagement;
