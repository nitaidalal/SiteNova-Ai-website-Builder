import { useEffect } from "react";
import { useDispatch } from "react-redux";
import api from "../lib/api";
import { setUser } from "../redux/userSlice";

export const useGetUserProfile = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const {data} = await api.get('/user/profile', { withCredentials: true });
                if (data?.data) {
                    dispatch(setUser(data.data));
                }
            } catch (error) {
                console.error("Error fetching user profile:", error);
            }
        };

        fetchUserProfile();
    }, [dispatch]);
};
