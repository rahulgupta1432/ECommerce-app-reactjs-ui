import { useState,useEffect } from "react";
import {API_URL} from "../constants/constants"
import axios from "axios";
import { toast } from "react-toastify";

export default function useCategory(){
    const [categories,setCategories]=useState([]);
    const getCaegories=async()=>{
        try {
            const {data}=await axios.get(`${API_URL}/api/v1/categories/all-category`);
            setCategories(data?.data.slice(0,-1));
        } catch (error) {
            toast.error(error?.data?.message)
        }
    }

    useEffect(()=>{
        getCaegories();
    },[])

    return categories;
}