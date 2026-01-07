import axios from "axios";

const useAuthToken = () => {
  const getToken = async (user) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/jwt`,
        {
          email: user?.email,
          role: user?.role || "worker",
        }
      );

      if (res.data.token) {
        localStorage.setItem("access-token", res.data.token);
      }
    } catch (error) {
      console.error("Error getting JWT token:", error);
    }
  };

  return getToken;
};

export default useAuthToken;
