  import React, { useEffect, useState } from 'react';
  import { MultiSelect } from 'primereact/multiselect';
  import axios from 'axios';
  import { API_URL } from '../../constants/constants';
  import { toast } from 'react-toastify';

  export const fetchData = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/v1/categories/all-category`);
      // return response.data.data; // Return the data
      return response.data.data.filter(item => item._id); // Filter out any metadata
    } catch (error) {
      throw new Error(error?.response?.data?.message || "Try again later");
    }
  };
  const MultiSelectDropdown = ({ onChange }) => {
    const [selectedItems, setSelectedItems] = useState([]);
    const [options, setOptions] = useState([]);
  
    useEffect(() => {
      const loadOptions = async () => {
        try {
          const resp = await fetchData(); // Call the fetchData function
          if (Array.isArray(resp)) {
            const formattedOptions = resp.map((data) => ({
              label: data.name,
              value: data._id,
            }));
            setOptions(formattedOptions); // Set options correctly
          }
        } catch (error) {
          toast.error(error.message);
        }
      };
  
      loadOptions();
    }, []);
    
    const handleSelectChange = (e) => {
      setSelectedItems(e.value);
      if (onChange) {
        onChange(e);
      }
    };
  
    return (
      <div className="container mt-5">
        <MultiSelect
          value={selectedItems}
          options={options}
          onChange={handleSelectChange}
          placeholder="Select Categories"
          filter
          display="chip"
          maxSelectedLabels={1}
        />
      </div>
    );
  };
  

  export default MultiSelectDropdown;




  // import React, { useEffect, useState } from 'react';
  // import { MultiSelect } from 'primereact/multiselect';

  // const MultiSelectDropdownTest = ({ onChange }) => {
  //   const [selectedItems, setSelectedItems] = useState([]);
  //   const [options, setOptions] = useState([]);

  //   useEffect(() => {
  //     // Set hardcoded options for testing
  //     setOptions([
  //       { label: "hello", value: "world" },
  //       { label: "Test Category", value: "world2" }
  //     ]);
  //   }, []);

  //   const handleSelectChange = (e) => {
  //     setSelectedItems(e.value);
  //     if (onChange) {
  //       onChange(e); // Call the parent's onChange function if provided
  //     }
  //   };

  //   return (
  //     <div className="container mt-5">
  //       <MultiSelect
  //         value={selectedItems}
  //         options={options}
  //         onChange={handleSelectChange}
  //         placeholder="Select Categories"
  //         filter
  //         display="chip"
  //         maxSelectedLabels={1}
  //       />
  //     </div>
  //   );
  // };


  // export { MultiSelectDropdownTest};