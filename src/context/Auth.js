import { useState,useContext,createContext,useEffect } from "react";
import axios from "axios";


const AuthContext=createContext();

const AuthProvider=({children})=>{
    const [auth,setAuth]=useState({
        user:null,
        token:''
    });
    axios.defaults.headers.common['x-authorization']=auth?.token
    useEffect(()=>{
        const data=localStorage.getItem("auth");
        if(data){
            const parseData=JSON.parse(data);
            setAuth({
                ...auth,
                user:{
                    _id:parseData._id,
                    username:parseData.username,
                    email:parseData?.email,
                    mobile:parseData?.mobile,
                    role:parseData.role,
                    tokenVersion:parseData.tokenVersion,
                    isAdmin:parseData.isAdmin,
                    isVerified:parseData.isVerified,
                    isDeleted:parseData.isDeleted,
                    createdAt:parseData.createdAt,
                    updatedAt:parseData.updatedAt,
                    __v:parseData.__v
                },
                // user:parseData,
                // token:parseData.token
            })
        }
    },[]);
    //eslint-disable-next-line
    return(
        <AuthContext.Provider value={[auth,setAuth]}>
            {children}
        </AuthContext.Provider>
    )
}


const useAuth=()=>useContext(AuthContext);

export {AuthProvider,useAuth}