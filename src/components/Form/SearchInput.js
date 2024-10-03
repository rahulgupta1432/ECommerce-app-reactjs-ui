import axios from 'axios';
import { InputText } from 'primereact/inputtext';
import React, { useEffect } from 'react';
import { API_URL } from '../../constants/constants';
import { toast } from 'react-toastify';
import { useAuth } from '../../context/Auth';
import { useNavigate } from 'react-router-dom';
import { useSearch } from '../../context/Search';
 
const SearchInput = () => {
    const [search,setSearch]=useSearch();
    const [auth] = useAuth();
    const navigate = useNavigate(); 
    // const handleProductSearch = async (e) => {
    //     const keyword=e.target.value;
    //     setSearch(prev=>({
    //         ...prev,keyword
    //     }));
    //     await handleSearchAllProduct();
    // };
    const handleProductSearch = (e) => {
        const keyword = e.target.value;
        setSearch(prev => ({
            ...prev,
            keyword
        }));
    };

    useEffect(()=>{

    
    const handleSearchAllProduct = async () => {
        try {
            const requestQuery = new URLSearchParams();
            if (search.keyword) {
                requestQuery.append('search', search.keyword);
                const searchQuery = encodeURIComponent(search.keyword).replace(/%20/g, '+');
                setTimeout(() => {
                    navigate(`/search/?q=${searchQuery}`);
                }, (1400));
            }else {
                // If the keyword is empty, fetch all products
                requestQuery.append('search', ''); // This triggers the all products fetching in the API
            }

            if (auth?.user?._id) {
                requestQuery.append('userId', auth.user._id);
            }
            const response = await axios.get(`${API_URL}/api/v1/product/search-product?${requestQuery.toString()}`);
            
            const resp = response.data;
            if (resp?.code === 200) {
                // onSearch(resp.data);
                setSearch(prev => ({ ...prev, results: resp.data.slice(0,-1) }));
                // const searchQuery = search.keyword.replace(/ /g, '+');
                // navigate(`/search/?q=${encodeURIComponent(searchQuery)}`);
                

            } else {
                toast.error(resp.message);
            }
        } catch (error) {
            toast.error(error.response?.data?.message);
        }
    };

    if (search.keyword !== undefined) {
        handleSearchAllProduct();
    }
},[search.keyword,auth,navigate,setSearch])

    

    return (
        <div style={{ position: 'relative', width: '35%', margin: '0 auto', right: '35%' }}>
            <InputText
                type="text"
                placeholder="Search for items, brands, and more"
                className="p-inputtext p-component"
                style={{
                    borderRadius: '50px',
                    border: '1px solid #d0d0d0',
                    padding: '12px 40px 12px 40px',
                    fontSize: '16px',
                    transition: 'border-color 0.3s',
                    width: '150%',
                }}
                onFocus={(e) => {
                    e.target.style.borderColor = '#0071e1';
                }}
                onBlur={(e) => {
                    e.target.style.borderColor = '#d0d0d0';
                }}
                value={search.keyword}
                onChange={handleProductSearch}
            />
            <span
                style={{
                    position: 'absolute',
                    left: '12px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    pointerEvents: 'none',
                    color: '#999',
                }}
            >
                <i className="fas fa-search" aria-hidden="true"></i>
            </span>
        </div>
    );
};

export default SearchInput;
