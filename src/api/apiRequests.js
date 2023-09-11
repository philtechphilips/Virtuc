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
      },

      megaMenu: async () => {
        try {
          const response = await axios.get("/category/fetch-subcategory");
          return response;
        } catch (error) {
          throw error;
        }
      },

      fetchCategory: async () => {
        try {
          const response = await axios.get("/category");
          return response;
        } catch (error) {
          throw error;
        }
      },

      fetchBanner: async () => {
        try {
          const response = await axios.get("/banner");
          return response;
        } catch (error) {
          throw error;
        }
      },

      fetchAuthUser: async ({ token }) => {
        const headers = {
          Authorization: `Bearer ${token}`,
        };
        try {
          const response = await axios.get("/users/user-profile", {headers});
          return response;
        } catch (error) {
          throw error;
        }
      },

      updateUserProfile: async ({ token, firstName, lastName, phoneNumber, dob, gender }) => {
        const headers = {
          Authorization: `Bearer ${token}`,
        };
        try {
          const response = await axios.patch("/users/update-profile", {first_name: firstName, last_name: lastName, phone_number: phoneNumber, dob, gender}, {headers});
          return response;
        } catch (error) {
          throw error;
        }
      },

      refreshToken: async ({ token }) => {
        const headers = {
          Authorization: `Bearer ${token}`,
        };
        console.log(token)
        try {
          const response = await axios.post("/users/refresh-token", {refreshToken: token});
          return response;
        } catch (error) {
          throw error;
        }
      }
  };
  
  export default apiService;