import React, { useState, useEffect, useMemo } from "react";
import BtnComp from "../../../components/BtnComp";
import PageNatation from "./../../../components/PageNatation";
import usePaginationStore from "../../../stores/paginationStore";

function CMjoinlist() {
  // 반응형 pageSize 상태
  const [pageSize, setPageSize] = useState(4);

  const storeKey = "cm-join-list";

  // paginationStore에서 현재 페이지 가져오기
  const pagination = usePaginationStore((state) => state.paginations[storeKey]);
  const currentPage = pagination?.currentPage ?? 0;
  const setPageSizeStore = usePaginationStore((state) => state.setPageSize);

  // 화면 크기에 따라 pageSize 설정 (PC: 9개, 태블릿: 6개, 모바일: 4개)
  useEffect(() => {
    const handleResize = () => {
      let newPageSize;
      if (window.innerWidth >= 1024) {
        // PC
        newPageSize = 9;
      } else if (window.innerWidth >= 640) {
        // 태블릿
        newPageSize = 6;
      } else {
        // 모바일
        newPageSize = 4;
      }
      setPageSize(newPageSize);
    };

    // 초기 설정
    handleResize();

    // 리사이즈 이벤트 리스너 추가
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // pageSize 변경 시 paginationStore 업데이트
  useEffect(() => {
    setPageSizeStore(storeKey, pageSize);
  }, [pageSize, storeKey, setPageSizeStore]);

  // 샘플 데이터 - 실제로는 API에서 받아올 데이터
  const clubName = "고기고기"; // 클럽 이름
  const joinRequests = [
    { id: 1, userName: "이하늘" },
    { id: 2, userName: "장희란" },
    { id: 3, userName: "이지은" },
    { id: 4, userName: "홍지승" },
    { id: 5, userName: "이유정" },
    { id: 6, userName: "삼하늘" },
    { id: 7, userName: "이영호" },
    { id: 8, userName: "김미영" },
    { id: 9, userName: "박준호" },
    { id: 10, userName: "김하늘" },
    { id: 11, userName: "강유진" },
    { id: 12, userName: "임윤섭" },
    { id: 13, userName: "이윤섭" },
    { id: 14, userName: "삼윤섭" },
  ];

  // 페이지네이션된 데이터
  const paginatedRequests = useMemo(() => {
    const startIndex = currentPage * pageSize;
    const endIndex = startIndex + pageSize;
    return joinRequests.slice(startIndex, endIndex);
  }, [joinRequests, currentPage, pageSize]);

  return (
    <>
      <div className="wrap !mt-0 !bg-light-02 min-h-[calc(100vh-240px)] md:min-h-[calc(100vh-180px)]">
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

          {/* list */}
          <section className="ac_list w-[80%] mx-auto my-[5%] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedRequests.map((request) => (
              <div
                key={request.id}
                className="bg-white rounded-xl shadow-sm border border-[#E0F2C9] p-6 flex flex-col items-center justify-center gap-4"
              >
                <p className="text-center text-gray-800 leading-relaxed">
                  {request.userName} 회원님이
                  <br />
                  {clubName} 모임에
                  <br />
                  가입을 신청하셨습니다
                </p>

                <div className="flex gap-2 w-[50%] min-w-[180px] mx-auto ">
                  <BtnComp
                    variant="primary"
                    size="short"
                    className="!w-[48%] !mt-0 !h-[35px] !text-xs md:!text-sm btn_save  "
                  >
                    수락
                  </BtnComp>

                  <BtnComp
                    variant="point"
                    size="short"
                    className="!w-[48%] !mt-0 !h-[35px] !text-xs md:!text-sm btn_can"
                  >
                    거절
                  </BtnComp>
                </div>
              </div>
            ))}
          </section>

          {/* 페이지네이션 */}
          <div className="w-full mb-[50px]">
            <PageNatation
              storeKey={storeKey}
              totalElements={joinRequests.length}
              pageSize={pageSize}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default CMjoinlist;
