import { create } from "zustand";
import apiClient from "./config";

export const useApplicationStore = create((set, get) => ({
  // 사용자 ID와 클럽 ID를 함께 키로 사용하여 application 상태 저장
  applications: {}, // { [userId_clubId]: application }
  loading: false,
  error: null,

  // 특정 클럽에 대한 현재 사용자의 가입 신청 상태 조회
  fetchMyApplication: async (clubId, userId) => {
    if (!userId) {
      return null;
    }
    
    const key = `${userId}_${clubId}`;
    set({ loading: true, error: null });
    try {
      const response = await apiClient.get(`/applications?clubId=${clubId}`);
      console.log("가입 신청 상태 API 응답:", response.data);
      
      // 응답이 배열인 경우 현재 사용자의 신청 찾기
      const applications = Array.isArray(response.data)
        ? response.data
        : response.data?.content || response.data?.data || [];
      
      // 단일 객체로 반환되는 경우
      if (!Array.isArray(response.data) && response.data?.memberId) {
        const app = response.data;
        // userId가 제공된 경우 현재 사용자의 신청인지 확인
        if (userId && app.memberId !== userId) {
          set((state) => {
            const newApplications = { ...state.applications };
            delete newApplications[key];
            return {
              applications: newApplications,
              loading: false,
              error: null,
            };
          });
          return null;
        }
        set((state) => ({
          applications: { ...state.applications, [key]: app },
          loading: false,
          error: null,
        }));
        return app;
      }
      
      // 배열인 경우 현재 사용자의 신청 찾기
      let myApplication = null;
      if (userId) {
        myApplication = applications.find(
          (app) => app.memberId === userId || app.userId === userId
        );
      } else if (applications.length > 0) {
        // userId가 없으면 첫 번째 항목 사용 (API가 현재 사용자 것만 반환한다고 가정)
        myApplication = applications[0];
      }
      
      set((state) => ({
        applications: { ...state.applications, [key]: myApplication || null },
        loading: false,
        error: null,
      }));
      return myApplication || null;
    } catch (error) {
      console.error("가입 신청 상태 조회 중 오류 발생:", error);
      // 404 등으로 신청이 없는 경우는 정상적인 상황이므로 null로 설정
      if (error.response?.status === 404) {
        set((state) => {
          const newApplications = { ...state.applications };
          delete newApplications[key];
          return {
            applications: newApplications,
            loading: false,
            error: null,
          };
        });
        return null;
      }
      set({ error: error.message || error, loading: false });
      throw error;
    }
  },

  // 모임 가입 신청
  createApplication: async (clubId, userId) => {
    if (!userId) {
      throw new Error("사용자 ID가 필요합니다.");
    }
    
    const key = `${userId}_${clubId}`;
    set({ loading: true, error: null });
    try {
      const response = await apiClient.post("/applications", {
        clubId: clubId,
      });
      console.log("모임 가입 신청 API 응답:", response.data);
      
      set((state) => ({
        applications: { ...state.applications, [key]: response.data },
        loading: false,
        error: null,
      }));
      return response.data;
    } catch (error) {
      console.error("모임 가입 신청 중 오류 발생:", error);
      set({ error: error.message || error, loading: false });
      throw error;
    }
  },

  // 특정 사용자와 클럽의 application 가져오기
  getApplication: (clubId, userId) => {
    if (!userId) {
      return null;
    }
    const state = get();
    const key = `${userId}_${clubId}`;
    return state.applications[key] || null;
  },

  resetApplication: (clubId) => {
    if (clubId) {
      set((state) => {
        const newApplications = { ...state.applications };
        delete newApplications[clubId];
        return { applications: newApplications, error: null };
      });
    } else {
      set({ applications: {}, error: null });
    }
  },

  // 클럽별 가입 신청자 리스트 조회 (PENDING 상태만)
  pendingApplications: {}, // { [clubId]: [applications] }
  loadingPending: false,
  errorPending: null,

  fetchPendingApplications: async (clubId) => {
    if (!clubId) {
      return [];
    }
    
    set({ loadingPending: true, errorPending: null });
    try {
      const response = await apiClient.get(`/applications/club/${clubId}/pending`);
      console.log("가입 신청자 리스트 API 응답:", response.data);
      
      // 응답이 배열인 경우
      const applications = Array.isArray(response.data)
        ? response.data
        : response.data?.content || response.data?.data || [];
      
      // PENDING 상태인 것들만 필터링
      const pendingApps = applications.filter((app) => app.status === "PENDING");
      
      set((state) => ({
        pendingApplications: { ...state.pendingApplications, [clubId]: pendingApps },
        loadingPending: false,
        errorPending: null,
      }));
      
      return pendingApps;
    } catch (error) {
      console.error("가입 신청자 리스트 조회 중 오류 발생:", error);
      // 404 등으로 신청이 없는 경우는 빈 배열로 처리
      if (error.response?.status === 404) {
        set((state) => ({
          pendingApplications: { ...state.pendingApplications, [clubId]: [] },
          loadingPending: false,
          errorPending: null,
        }));
        return [];
      }
      set({ errorPending: error.message || error, loadingPending: false });
      throw error;
    }
  },

  // 특정 클럽의 pending applications 가져오기
  getPendingApplications: (clubId) => {
    if (!clubId) {
      return [];
    }
    const state = get();
    return state.pendingApplications[clubId] || [];
  },
}));
