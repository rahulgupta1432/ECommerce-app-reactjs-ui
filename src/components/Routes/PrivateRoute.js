// import { useEffect,useState  } from "react";
// import { useAuth } from "../../context/Auth";
// import { Outlet } from "react-router-dom";
// import axios from "axios";
// import {API_URL} from "../../constants/constants";
// // import Spinner from "../Spinner";
// export default function PrivateRoute(){
//     const [ok,setOk]=useState(false);
//     const [loading,setLoading]=useState(true);
//     const [auth]=useAuth();
//     // const token=localStorage.getItem("x-authorization")
    
//     useEffect(()=>{
//         const authCheck=async()=>{
//             const res=await axios.get(`${API_URL}/api/v1/auth/protect`)
//             if(res.data.ok){
//                 setOk(true)
//             }else{
//                 setOk(false)
//             }  
//         };
//     if(auth?.token)authCheck()
//     },[auth?.token])
//     return ok?<Outlet/>:'spinner';
//     // return ok?<Outlet/>:<Spinner/>;
// }


import { useEffect, useState } from "react";
import { useAuth } from "../../context/Auth";
import { Navigate, Outlet } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../../constants/constants";
import Spinner from "../Spinner";

export default function PrivateRoute() {
    const [ok, setOk] = useState(false);
    const [loading, setLoading] = useState(true); // Add loading state
    const [auth] = useAuth();

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

    if (loading) return <Spinner />; 
    if (!ok) {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />

    // return ok ? <Outlet /> : 'Unauthorized'; 
}
