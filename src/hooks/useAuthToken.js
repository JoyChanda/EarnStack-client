import axios from "axios";

const useAuthToken = () => {
  const getToken = async (user) => {
    try {
      let role = user?.role;
      const apiUrl = import.meta.env.VITE_API_URL?.replace(/\/$/, "");

      // If role isn't provided, check DB first
      if (!role && user?.email) {
        try {
          const dbRes = await axios.get(`${apiUrl}/users/check-role/${user.email}`);
          role = dbRes.data?.role;
        } catch {
          role = "worker";
        }
      }

      const res = await axios.post(
        `${apiUrl}/jwt`,
        {
          email: user?.email,
          role: role || "worker",
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
