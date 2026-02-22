import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import axiosSecure from "../services/axiosSecure";

const useUser = () => {
    const { user, loading } = useContext(AuthContext);
    const token = localStorage.getItem('access-token');

    const { data: dbUser, isLoading: isUserLoading, refetch, error } = useQuery({
        queryKey: ['user', user?.email, token],
        enabled: !loading && !!user?.email && !!token,
        queryFn: async () => {
            try {
                const res = await axiosSecure.get(`/users/${user?.email}`);
                return res.data;
            } catch (err) {
                console.error("useUser fetch error:", err);
                throw err;
            }
        },
        retry: 1, // Don't retry too many times if it fails
        staleTime: 5 * 60 * 1000, // 5 minutes
    });

    return [dbUser, isUserLoading, refetch, error];
};

export default useUser;
