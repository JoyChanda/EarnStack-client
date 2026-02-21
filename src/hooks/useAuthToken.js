import axios from "axios";

const useAuthToken = () => {
  const getToken = async (user) => {
    try {
      // If a role is already provided (e.g., from registration), use it directly.
      // Otherwise, fetch the user's role from the database first.
      let role = user?.role;

      if (!role && user?.email) {
        try {
          const dbRes = await axios.get(`${import.meta.env.VITE_API_URL}/users/check-role/${user.email}`);
          role = dbRes.data?.role;
        } catch {
          // If user doesn't exist in DB yet (e.g., first-time Google signup), default to worker
          role = "worker";
        }
      }

      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/jwt`,
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
