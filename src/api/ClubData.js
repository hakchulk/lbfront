import { create } from "zustand";
import apiClient, { BASE_URL } from "./config";

export const useClubStore = create((set) => ({
  clubs: [],
  loading: false,
  error: null,

  fetchClubs: async () => {
    set({ loading: true, error: null });
    try {
      const response = await apiClient.get("/clubs");
      console.log("API 응답:", response.data);
      const rawData = Array.isArray(response.data)
        ? response.data
        : response.data?.data || response.data?.content || [];

      // API 응답을 컴포넌트에서 사용할 수 있는 형태로 변환
      const clubsData = rawData.map((club) => ({
        id: club.id,
        name: club.name,
        title: club.description ? club.description.split(".")[0] : "클럽",
        desc: club.description || "",
        image: club.filename
          ? `${BASE_URL}/file/${club.filename}`
          : "https://yjpmigedokqexuclsapm.supabase.co/storage/v1/object/public/images/Image2.png",
        tags: club.keywords
          ? club.keywords.split(",").map((k) => k.trim())
          : [],
        memberCount: 0, // API에 없으면 기본값
        postCount: 0, // API에 없으면 기본값
        managerId: club.managerId,
        createdAt: club.createdAt,
      }));

      set({ clubs: clubsData, loading: false });
      return clubsData;
    } catch (error) {
      console.error("클럽 데이터 가져오기 중 오류 발생:", error);
      set({ error: error.message || error, loading: false, clubs: [] });
      throw error;
    }
  },

  resetClubs: () => set({ clubs: [], error: null }),
}));
