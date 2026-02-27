// EventMain.jsx
import React, { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import EventDetailPage from "./EventDetail";
import BtnComp from "../../../components/BtnComp";
import axios from "axios";

// =======================
// 포인트샵 데이터
// =======================
const products = [
  { id: 1, name: "유명브랜드 프로틴 1000g", point: 2000, img: "https://yojekojpfikeuposuyuf.supabase.co/storage/v1/object/public/images/1.png" },
  { id: 2, name: "명품 한우세트 2kg", point: 20000, img: "https://yojekojpfikeuposuyuf.supabase.co/storage/v1/object/public/images/2.png" },
  { id: 3, name: "두바이 쫀득쿠키 2개", point: 2000, img: "https://yojekojpfikeuposuyuf.supabase.co/storage/v1/object/public/images/3.%20(2).png" },
  { id: 4, name: "백화점상품권 100,000원", point: 10000, img: "https://yojekojpfikeuposuyuf.supabase.co/storage/v1/object/public/images/4.png" },
  { id: 5, name: "LG 프리미엄 냉장고", point: 200000, img: "https://yojekojpfikeuposuyuf.supabase.co/storage/v1/object/public/images/5.png" },
  { id: 6, name: "LG 프리미엄 공기청정기", point: 50000, img: "https://yojekojpfikeuposuyuf.supabase.co/storage/v1/object/public/images/6.png" },
];

function EventMain() {
  const [submittedIds, setSubmittedIds] = useState({});
  const [insufficientIds, setInsufficientIds] = useState({});
  const [userPoint, setUserPoint] = useState(0);

  // 페이지 로드 시 유저 포인트 가져오기
  useEffect(() => {
    const fetchUserPoint = async () => {
      const token = localStorage.getItem("accessToken");

      if (!token) {
        console.warn("로그인 토큰이 없습니다. 로그인 필요");
        return; // 토큰 없으면 요청 중단
      }

      try {
        const res = await axios.get("http://localhost:8080/api/lastlayer/me/points", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUserPoint(res.data.point); // 서버에서 반환되는 포인트
      } catch (err) {
        console.error("유저 포인트 가져오기 실패", err);
        // 필요 시 alert로 사용자 안내 가능
        // alert("포인트 정보를 가져오는 중 오류가 발생했습니다.");
      }
    };

    fetchUserPoint();
  }, []);

  // =======================
  // 상품 응모
  // =======================
  const handleSubmit = async (product) => {
    if (userPoint < product.point) {
      setInsufficientIds((prev) => ({ ...prev, [product.id]: true }));
      alert("포인트가 부족합니다.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8080/api/lastlayer/me/points",
        { productId: product.id },
        { headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` } }
      );

      const remainingPoint = response.data.remainingPoint;
      setUserPoint(remainingPoint);

      setSubmittedIds((prev) => ({ ...prev, [product.id]: true }));
      setInsufficientIds((prev) => ({ ...prev, [product.id]: false }));
      alert(`${product.name} 응모 완료! 잔여 포인트: ${remainingPoint}`);
    } catch (error) {
      setInsufficientIds((prev) => ({ ...prev, [product.id]: true }));
      alert("포인트가 부족하거나 오류가 발생했습니다.");
    }
  };

  return (
    <div className="mx-auto w-full sm:w-[100%] md:w-[100%] lg:w-[100%]">

      {/* 상단 배너 */}
      <Link to="/event/detail/1" className="block h-full w-full">
        <div className="flex flex-col md:flex-row h-auto gap-4 mb-16 md:mb-24 lg:mb-32 xl:mb-32">
          <img
            src="https://yojekojpfikeuposuyuf.supabase.co/storage/v1/object/public/images/ev01_bn_1920.png"
            alt="식단 관리"
            className="w-full h-[40vh] sm:h-[50vh] md:h-[62vh] lg:h-[72vh] xl:h-[90vh] 2xl:h-[120vh] object-cover"
          />
        </div>
      </Link>

      {/* 안내 문구 */}
      <div className="flex flex-col h-auto gap-2 mb-8 md:mb-12 lg:mb-16 xl:mb-16 text-center">
        <h2 className="!text-2xl sm:!text-3xl md:!text-3xl font-bold text-green-700 mb-1">
          <i className="fa-solid fa-gift text-xl sm:text-2xl md:text-3xl text-green-600 mr-2 -translate-y-1 inline-block"></i>
          지금 참여하면 혜택이 쏟아진다!
        </h2>
        <p className="text-black leading-relaxed mb-6 md:mb-8 lg:mb-12 xl:mb-12">
          간단한 참여만으로 풍성한 혜택을 받아보세요.
          <br />이벤트 참여 시 상품권과 포인트 지급,
          <br />건강을 위한 단백질 바 증정!
          <br /><br />
          그리고 식단 인증 업로드만 해도 타사 제휴 50% 할인권까지!
          <br />식단 관리도 하고,
          <br />실속 있는 혜택까지 한 번에 챙길 수 있는 기회!
          <br />지금 바로 참여해보세요.
        </p>
      </div>

      {/* 이벤트 카드 */}
      <div className="mx-auto w-full md:w-19/21 grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 md:gap-10 lg:gap-12 xl:gap-14 2xl:gap-16 mb-12 sm:mb-16 md:mb-20 lg:mb-24 xl:mb-28">
        {[
          { id: 2, imgPc: "https://yojekojpfikeuposuyuf.supabase.co/storage/v1/object/public/images/ev02_bn_1000%202.png", imgMb: "https://yojekojpfikeuposuyuf.supabase.co/storage/v1/object/public/images/ev02_bn_1920.png" },
          { id: 3, imgPc: "https://yojekojpfikeuposuyuf.supabase.co/storage/v1/object/public/images/ev03_bn_1000.png", imgMb: "https://yojekojpfikeuposuyuf.supabase.co/storage/v1/object/public/images/ev03_bn_1920.png" },
          { id: 4, imgPc: "https://yojekojpfikeuposuyuf.supabase.co/storage/v1/object/public/images/ev04_bn_1000.png", imgMb: "https://yojekojpfikeuposuyuf.supabase.co/storage/v1/object/public/images/ev04_bn_1920.png" }
        ].map(item => (
          <Link key={item.id} to={`/event/detail/${item.id}`} className="overflow-hidden flex flex-col items-center text-center">
            <div className="w-full h-[32vh] sm:h-[45vh] md:h-[30vh] lg:h-[42vh] xl:h-[45vh] 2xl:h-[60vh] overflow-hidden mb-8 sm:mb-10 md:mb-12 lg:mb-14">
              <img src={item.imgMb} alt={`이벤트 ${item.id} 모바일`} className="w-full h-full object-cover md:hidden" />
              <img src={item.imgPc} alt={`이벤트 ${item.id} PC`} className="hidden md:block w-full h-full object-cover" />
            </div>
          </Link>
        ))}
      </div>

      {/* 포인트샵 응모하기 */}
      <div className="flex justify-center mb-8 md:mb-12">
        <h2 className="!text-2xl sm:!text-3xl md:!text-3xl font-bold text-green-700">
          <i className="fa-solid fa-gift text-xl sm:text-2xl md:text-3xl text-green-600 mr-2 -translate-y-1 inline-block"></i>
          포인트샵 응모하기!
        </h2>
      </div>

      {/* 포인트샵 상품 영역 */}
      <div className="mx-auto w-full sm:w-21/21 md:w-19/21 lg:w-19/21 mb-10 px-4 sm:px-6 md:px-8 lg:px-10">
        <div className="mx-auto w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-20 sm:gap-8 md:gap-12 lg:gap-16 xl:gap-20 2xl:gap-24">
          {products.map((product) => {
            const isSubmitted = submittedIds[product.id];
            const isInsufficient = insufficientIds[product.id];

            return (
              <div key={product.id} className="flex flex-col items-center text-center w-full">
                <div className="w-full h-[32vh] sm:h-[36vh] md:h-[40vh] lg:h-[44vh] xl:h-[45vh] 2xl:h-[60vh] overflow-hidden mb-2 sm:mb-10 md:mb-12 lg:mb-14">
                  <img src={product.img} alt={product.name} className="w-full h-full object-contain" />
                </div>

                <h5 className="!font-semibold text-base sm:text-base md:text-lg lg:text-2xl mb-1 sm:mb-2 truncate">{product.name}</h5>
                <p className="!text-black text-[6vw] sm:text-[4.5vw] md:text-[3vw] lg:text-[2.5vw] ml-2 mt-1">{product.point?.toLocaleString()} Point</p>

                <BtnComp
                  className={`mb-10 whitespace-nowrap px-4 min-w-[120px] ${isSubmitted ? "bg-gray-400 cursor-not-allowed" : isInsufficient ? "bg-red-500" : ""}`}
                  size="short"
                  variant="primary"
                  disabled={isSubmitted}
                  onClick={() => handleSubmit(product)}
                >
                  {isSubmitted ? "응모완료" : isInsufficient ? "포인트 부족" : "응모하기"}
                </BtnComp>
              </div>
            );
          })}
        </div>
      </div>

      {/* 상품 응모 유의사항 */}
      <div className="mx-auto w-full sm:w-21/21 md:w-19/21 lg:w-19/21 mb-12 px-4 sm:px-6 md:px-8 lg:px-10">
        <h2 className="text-red-500 !text-xl sm:!text-2xl md:!text-2xl font-bold mb-4 flex items-center">
          <i className="fa-solid fa-volume-low text-red-500 mr-2"></i>
          상품 응모 유의사항
        </h2>
        <ul className="list-disc list-inside text-black leading-relaxed pl-2">
          <li>본 상품은 응모 현황에 따라 조기 마감될 수 있습니다.</li>
          <li>응모 후에는 취소 및 변경이 불가합니다.</li>
          <li>동일 계정 또는 중복 응모가 확인될 경우 당첨이 취소될 수 있습니다.</li>
          <li>당첨자는 내부 기준에 따라 선정되며, 선정 기준은 공개되지 않습니다.</li>
          <li>경품은 타인에게 양도 및 판매가 불가합니다.</li>
          <li>부정한 방법으로 참여한 경우 당첨이 취소될 수 있습니다.</li>
          <li>당첨자 발표 일정은 운영 상황에 따라 변경될 수 있습니다.</li>
          <li>경품의 색상, 디자인 등은 랜덤으로 제공될 수 있으며 선택이 불가합니다.</li>
          <li>배송이 필요한 상품의 경우, 정보 오기입으로 인한 재발송은 불가합니다.</li>
          <li>본 이벤트는 당사 사정에 따라 변경 또는 종료될 수 있습니다.</li>
        </ul>
      </div>
    </div>
  );
}

// =======================
// 라우터 연결
// =======================
function Event() {
  return (
    <Routes>
      <Route path="/" element={<EventMain />} />
      <Route path="detail/:id" element={<EventDetailPage />} />
    </Routes>
  );
}

export default Event;