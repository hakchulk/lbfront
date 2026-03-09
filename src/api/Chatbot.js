import apiClient from "./config";

export const askChatbot = async (message) => {
  const response = await apiClient.post("/api/v1/chatbot", {
    question: message,
  });

  return response.data;
};
