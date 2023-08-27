import axios from "./axios";
const backendUrl = import.meta.env.VITE_BACKEND_URL;


const apiService = {
    forgotPassword: async (email) => {
      try {
        const response = await axios.post("/users/forgot-password", { email });
        return response;
      } catch (error) {
        throw error;
      }
    },

    resetPassword: async (email, password) => {
        try {
          const response = await axios.patch("/users/reset-password", { email, password });
          return response;
        } catch (error) {
          throw error;
        }
      }
  };
  
  export default apiService;