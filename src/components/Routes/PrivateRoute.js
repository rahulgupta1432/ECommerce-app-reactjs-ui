import { useEffect, useState } from "react";
import { useAuth } from "../../context/Auth";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../../constants/constants";
import Spinner from "../Spinner";

export default function PrivateRoute() {
    const [ok, setOk] = useState(false);
    const [loading, setLoading] = useState(true); // Add loading state
    const [auth] = useAuth();

    const location = useLocation();  //page ko redirect ke liye kr rha hu after login using state

    useEffect(() => {
        const authCheck = async () => {
            try {
                const res = await axios.get(`${API_URL}/api/v1/auth/protect`);
                setOk(res.data.ok);
            } catch (error) {
                console.error("Authentication check failed", error);
                setOk(false);
            } finally {
                setLoading(false);
            }
        };

        if (auth?.token) authCheck();
        else {
            setLoading(false); 
        }
    }, [auth?.token]);

    useEffect(() => {
        const timeout = setTimeout(() => setLoading(false), 60000);
        return () => clearTimeout(timeout);
    }, []);

    if (loading) return <Spinner />; 
    if (!ok) {
        return <Navigate to="/login" state={{from:location.pathname}} replace />;
    }

    return <Outlet />

    // return ok ? <Outlet /> : 'Unauthorized'; 
}
