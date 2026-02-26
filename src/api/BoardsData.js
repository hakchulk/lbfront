import { create } from "zustand";
import apiClient, { BASE_URL } from "./config";

export const useBoardsStore = create((set) => ({
  boards: [],
  normalBoards: [],
  loading: false,
  normalBoardsLoading: false,
  error: null,
  normalBoardsError: null,

  fetchBoards: async (clubId) => {
    set({ loading: true, error: null, boards: [] });
    try {
      const response = await apiClient.get(`/boards/${clubId}/boards/notice`);
      console.log("공지사항 API 응답:", response.data);
      const rawData = Array.isArray(response.data)
        ? response.data
        : response.data?.data || response.data?.content || [];

      // 중복 제거: id를 기준으로 고유한 공지사항만 유지
      const uniqueData = rawData.filter(
        (board, index, self) =>
          index === self.findIndex((b) => b.id === board.id)
      );

      // API 응답을 컴포넌트에서 사용할 수 있는 형태로 변환
      // 이미 공지사항(board_type: 2)만 반환되므로 필터링 불필요
      const boardsData = uniqueData.map((board) => ({
        id: board.id,
        title: board.title || "",
        contents: board.contents || "",
        author: board.member_name || "",
        date: board.createdAt ? board.createdAt.substring(0, 10) : "",
        board_type: board.board_type || 2,
        boardType: board.board_type || 2, // 호환성을 위해 둘 다 유지
        likeCount: board.like_count || 0,
        viewCount: board.view_count || 0,
        clubId: board.club_id,
        memberId: board.member_id,
        profileFilename: board.profile_filename,
        fileId: board.file_id,
        filename: board.filename || board.file_filename,
        createdAt: board.createdAt,
        updatedAt: board.updatedAt,
      }));

      set({ boards: boardsData, loading: false });
      return boardsData;
    } catch (error) {
      console.error("공지사항 데이터 가져오기 중 오류 발생:", error);
      set({ error: error.message || error, loading: false, boards: [] });
      throw error;
    }
  },

  fetchNormalBoards: async (clubId) => {
    set({ normalBoardsLoading: true, normalBoardsError: null, normalBoards: [] });
    try {
      const response = await apiClient.get(`/boards/${clubId}/boards/normal`);
      console.log("일반 게시글 API 응답:", response.data);
      const rawData = Array.isArray(response.data)
        ? response.data
        : response.data?.data || response.data?.content || [];

      // API 응답을 컴포넌트에서 사용할 수 있는 형태로 변환
      // 이미 일반 게시글(board_type: 1)만 반환되므로 필터링 불필요
      // 중복 제거: id를 기준으로 고유한 게시글만 유지
      const uniqueData = rawData.filter(
        (board, index, self) =>
          index === self.findIndex((b) => b.id === board.id)
      );

      const boardsData = uniqueData.map((board) => ({
        id: board.id,
        title: board.title || "",
        contents: board.contents || "",
        author: board.member_name || "",
        date: board.createdAt ? board.createdAt.substring(0, 10) : "",
        board_type: board.board_type || 1,
        boardType: board.board_type || 1, // 호환성을 위해 둘 다 유지
        likeCount: board.like_count || 0,
        viewCount: board.view_count || 0,
        clubId: board.club_id,
        memberId: board.member_id,
        profileFilename: board.profile_filename,
        fileId: board.file_id,
        filename: board.filename || board.file_filename,
        createdAt: board.createdAt,
        updatedAt: board.updatedAt,
      }));

      set({ normalBoards: boardsData, normalBoardsLoading: false });
      return boardsData;
    } catch (error) {
      console.error("일반 게시글 데이터 가져오기 중 오류 발생:", error);
      set({ normalBoardsError: error.message || error, normalBoardsLoading: false, normalBoards: [] });
      throw error;
    }
  },

  resetBoards: () => set({ boards: [], error: null }),
  resetNormalBoards: () => set({ normalBoards: [], normalBoardsError: null }),
}));
