import { useEffect, useMemo, useState } from 'react';
import BtnComp from '../../../components/BtnComp';
import PageNatation from './../../../components/PageNatation';
import usePaginationStore from '../../../stores/paginationStore';
import { Link, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import NoticeWrite from './NoticeWrite';
import { useClubStore } from '../../../api/ClubData';
import { useAuthStore } from '../../../stores/authStore';
import { useBoardsStore } from '../../../api/BoardsData';

function Noticemanagement() {
  const navigate = useNavigate();
  const location = useLocation();

  // 클럽 데이터 가져오기
  const { clubs, fetchClubs } = useClubStore();
  const user = useAuthStore((state) => state.user);

  // 공지사항 데이터 (BoardsData 사용)
  const { boards, loading: boardsLoading, error: boardsError, fetchBoards } =
    useBoardsStore();

  // 반응형 pageSize 상태
  const [pageSize, setPageSize] = useState(4);

  const storeKey = 'cm-join-list';

  // 클럽 리스트 조회
  useEffect(() => {
    const loadClubs = async () => {
      try {
        await fetchClubs();
      } catch (err) {
        console.error('클럽 리스트 로드 실패:', err);
      }
    };
    loadClubs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  // 내가 매니저인 클럽들만 필터링
  const myManagedClubs = useMemo(() => {
    if (!user?.id || !Array.isArray(clubs)) return [];
    return clubs.filter((club) => club.managerId === user.id);
  }, [clubs, user]);

  // 내가 매니저인 첫 번째 클럽 기준으로 공지사항 조회
  useEffect(() => {
    const loadNotices = async () => {
      if (!myManagedClubs.length) return;
      try {
        const clubId = myManagedClubs[0].id;
        await fetchBoards(clubId);
      } catch (err) {
        console.error('공지사항 리스트 로드 실패:', err);
      }
    };

    loadNotices();
  }, [myManagedClubs, fetchBoards]);

  // paginationStore에서 현재 페이지 가져오기
  const pagination = usePaginationStore((state) => state.paginations[storeKey]);
  const currentPage = pagination?.currentPage ?? 0;
  const setPageSizeStore = usePaginationStore((state) => state.setPageSize);

  // 화면 크기에 따라 pageSize 설정 (PC: 6개(3열 2행), 태블릿: 6개(2열 3행), 모바일: 4개(1열))
  useEffect(() => {
    const handleResize = () => {
      let newPageSize;
      if (window.innerWidth >= 1024) {
        // PC - 3열 2행 = 6개 (가로 3개, 세로 2줄)
        newPageSize = 6;
      } else if (window.innerWidth >= 640) {
        // 태블릿 - 2열 3행 = 6개
        newPageSize = 6;
      } else {
        // 모바일 - 1열 = 4개
        newPageSize = 4;
      }
      setPageSize(newPageSize);
    };

    // 초기 설정
    handleResize();

    // 리사이즈 이벤트 리스너 추가
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // pageSize 변경 시 paginationStore 업데이트
  useEffect(() => {
    setPageSizeStore(storeKey, pageSize);
  }, [pageSize, storeKey, setPageSizeStore]);

  // 오늘 날짜를 YYYY-MM-DD 형식으로 가져오기
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  const todayString = `${year}-${month}-${day}`;

  // 로그인한 유저가 클럽매니저인 클럽의 이름 가져오기
  const clubName = myManagedClubs.length > 0 ? myManagedClubs[0].name : '';

  // 샘플 데이터 - 실제로는 API에서 받아올 데이터
  // BoardsData에서 가져온 공지사항을 사용
  const notices = boards;

  // 페이지네이션된 데이터
  const paginatedNotices = useMemo(() => {
    const startIndex = currentPage * pageSize;
    const endIndex = startIndex + pageSize;
    return notices.slice(startIndex, endIndex);
  }, [notices, currentPage, pageSize]);

  //이동
  const handleEdit = () => {
    navigate('noticewrite');
  };

  return (
    <>
      <Routes>
        <Route
          path=""
          element={
            <div className="wrap !mt-0  !bg-light-02 ">
              <div className="containers">
                {/* sect_tit */}
                <section className="sect_tit flex items-center justify-center mx-0 mt-[50px] border-b-[5px] border-main-02 ">
                  <h3 className=" !text-main-02 mb-[20px] !text-[20px] lg:!text-[30px] flex items-center justify-center ">
                    <span className="material-icons mr-[5px] !text-[30px] lg:!text-[40px] ">
                      campaign
                    </span>
                    {clubName} 모임의 공지사항
                  </h3>
                </section>

                {/* list */}
                <section className="ac_list w-[80%] mx-auto my-[5%] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {paginatedNotices.map((notice) => (
                    <div
                      key={notice.id}
                      className="bg-white rounded-xl shadow-sm border border-[#E0F2C9] p-6 flex flex-col items-start justify-s "
                    >
                      <p className="text-center text-gray-deep leading-relaxed">
                        · 공지사항 {notice.noticeNumber}
                      </p>
                      <h4 className="!text-base md:!text-lg lg:!text-xl line-clamp-2 text-deep my-[10px]">
                        {notice.title}
                      </h4>

                      <p className="text-center text-gray-deep leading-relaxed">
                        · 작성자 : {notice.userName}
                      </p>
                      <p className="text-center text-gray-deep leading-relaxed">
                        · 작성일자 : {todayString}
                      </p>

                      <div className="flex gap-2 w-[50%] min-w-[180px] mx-auto mt-[10px]">
                        <BtnComp
                          variant="primary"
                          size="short"
                          className="!w-[48%] !mt-0 !h-[35px] !text-xs md:!text-sm btn_save  "
                          onClick={handleEdit}
                        >
                          수정
                        </BtnComp>

                        <BtnComp
                          variant="primary"
                          size="short"
                          className="!w-[48%] !mt-0 !h-[35px] !text-xs md:!text-sm btn_can"
                        >
                          삭제
                        </BtnComp>
                      </div>
                    </div>
                  ))}
                </section>

                {/* 작성버튼 */}
                <Link to="noticewrite">
                  <div className="w-[80%] mx-auto flex items-center justify-end mb-[5%]">
                    <BtnComp
                      size="short"
                      variant="primary"
                      className="mt-0 w-full sm:w-[200px]"
                    >
                      공지사항 작성
                    </BtnComp>
                  </div>
                </Link>

                {/* 페이지네이션 */}
                <div className="w-full mb-[50px]">
                  <PageNatation
                    storeKey={storeKey}
                    totalElements={notices.length}
                    pageSize={pageSize}
                  />
                </div>
              </div>
            </div>
          }
        />
        <Route path="noticewrite" element={<NoticeWrite />} />
      </Routes>
    </>
  );
}

export default Noticemanagement;
