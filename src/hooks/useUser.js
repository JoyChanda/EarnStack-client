import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import axiosSecure from "../services/axiosSecure";

const useUser = () => {
    const { user, loading } = useContext(AuthContext);

    const { data: dbUser, isLoading: isUserLoading, refetch } = useQuery({
        queryKey: ['user', user?.email],
        enabled: !loading && !!user?.email && !!localStorage.getItem('access-token'),
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/${user?.email}`);
            return res.data;
        }
    });

    return [dbUser, isUserLoading, refetch];
};

export default useUser;
