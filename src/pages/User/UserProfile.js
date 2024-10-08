import React, { useEffect, useState } from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import UserMenu from '../../components/Layout/UserMenu';
import { MdVerified } from "react-icons/md";
import { API_URL } from '../../constants/constants';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useAuth } from '../../context/Auth';
import Header from '../../components/Layout/Header';

const UserProfile = () => {
    const [auth] = useAuth();
    const [userAuth, setUserAuth] = useState([]);
    const user = userAuth[0];
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        mobile: '',
        image: '',
    });
    const [imageFile, setImageFile] = useState(null);


    const getUserProfile = async () => {
        try {
            const response = await axios.get(`${API_URL}/api/v1/user/get-user?userId=${auth.user._id}`);
            const resp = response.data;
            if (resp?.code === 200) {
                setUserAuth(resp.data);
            }
        } catch (error) {
            toast.error(error.response?.data?.message);
        }
    }
    useEffect(() => {
        getUserProfile();
    }, [auth?.user._id])
    useEffect(() => {
        // Update formData when userAuth changes
        if (user) {
            setFormData({
                username: user.username || '',
                email: user.email || '',
                mobile: user.mobile || '',
                image: user.image || '',
            });
        }
    }, [userAuth]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleEditClick = () => {
        setIsEditing((prev) => !prev);
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData((prevData) => ({ ...prevData, image: reader.result }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSaveClick = async () => {
        const updatedData = {
            ...formData,
            userId: user._id,
        };

        // Create a FormData object if an image is being uploaded
        const formDataToSend = new FormData();
        formDataToSend.append('image', imageFile);
        formDataToSend.append('username', updatedData.username);
        formDataToSend.append('email', updatedData.email);
        formDataToSend.append('mobile', updatedData.mobile);
        formDataToSend.append('userId', updatedData.userId);

        try {
            const response = await axios.put(`${API_URL}/api/v1/user/update-profile`, formDataToSend);
            console.log("Profile updated successfully:", response.data);
            setIsEditing(false);
            const resp = response.data;
            if (resp?.code === 200) {
                toast.success('Profile Updated Successfully')
                getUserProfile();
            }
            // Optionally, you might want to update the auth context or state with new user data here
        } catch (error) {
            toast.error(error.response?.data?.message);
        }
    };

    return (
        <>
        <Header title={'Dashboard - Fusion-Store'}/>
            <div className='container-fluid m-3 p-3'>
                <div className='row'>
                    <div className='col-md-3'>
                        <UserMenu />
                    </div>
                    <div className='col-md-9'>


                        <Card title="Account Details" className="w-75">

                            {user ? (
                                <>
                                    <h3 className='mt-2'>Personal Information</h3>
                                    <div className="position-relative">
                                        <img
                                            src={formData.image || user.image}
                                            alt="Profile"
                                            style={{
                                                width: '80px',
                                                height: '80px',
                                                borderRadius: '50%',
                                                border: '2px solid blueviolet',
                                            }}
                                        />
                                        {isEditing && (
                                            <>
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={handleImageChange}
                                                    style={{ display: 'none' }}
                                                    id="profile-image-input"
                                                />
                                                <Button
                                                    icon="pi pi-pencil"
                                                    className="p-button-secondary position-absolute"
                                                    style={{
                                                        top: '70%',
                                                        left: '14%',
                                                        transform: 'translate(-50%, -50%)',
                                                        height: '25px',
                                                        width: '25px',
                                                        padding: '0',
                                                        // backgroundColor:'black',
                                                        // color:'white',
                                                        borderRadius: 2
                                                    }}
                                                    // Add logic for editing profile picture here
                                                    onClick={() => document.getElementById('profile-image-input').click()}
                                                />
                                            </>
                                        )}
                                    </div>
                                    <div className="mb-3 mt-4"> {/* Added margin bottom */}
                                        <label>
                                            <strong>Id:</strong>
                                            {("User_" + user._id)}
                                        </label>
                                    </div>
                                    <div className="mb-3 mt-4"> {/* Added margin bottom */}
                                        <label>
                                            <strong>Username:</strong>
                                            {isEditing ? (
                                                <input
                                                    type="text"
                                                    name="username"
                                                    value={formData.username}
                                                    onChange={handleChange}
                                                    className="p-inputtext ml-5"
                                                    style={{ width: '350px' }}
                                                />
                                            ) : (
                                                ` ${user.username}`
                                            )}
                                        </label>
                                    </div>
                                    <div className="mb-3"> {/* Added margin bottom */}
                                        <label>
                                            <strong>Firstname:</strong>
                                            {isEditing ? (
                                                <input
                                                    type="text"
                                                    name="username"
                                                    value={formData.username}
                                                    onChange={handleChange}
                                                    className="p-inputtext ml-5"
                                                    style={{ width: '350px' }}
                                                />
                                            ) : (
                                                ` ${user.username}`
                                            )}
                                        </label>
                                    </div>


                                    <div className="mb-3"> {/* Added margin bottom */}
                                        <label>
                                            <strong>Lastname:</strong>
                                            {isEditing ? (
                                                <input
                                                    type="text"
                                                    name="username"
                                                    value={formData.username}
                                                    onChange={handleChange}
                                                    className="p-inputtext ml-5"
                                                    style={{ width: '348x' }}
                                                />
                                            ) : (
                                                ` ${user.username}`
                                            )}
                                        </label>
                                    </div>



                                    <div className="mb-3"> {/* Added margin bottom */}
                                        <label>
                                            <strong>Email:</strong>
                                            {isEditing ? (
                                                <input
                                                    type="email"
                                                    name="email"
                                                    value={formData.email}
                                                    onChange={handleChange}
                                                    className="p-inputtext ml-7"
                                                    style={{ width: '350px' }}
                                                />
                                            ) : (
                                                ` ${user.email}`
                                            )}
                                        </label>
                                    </div>
                                    <div className="mb-3"> {/* Added margin bottom */}
                                        <label>
                                            <strong>Mobile:</strong>
                                            {isEditing ? (
                                                <input
                                                    type="text"
                                                    name="mobile"
                                                    value={formData.mobile}
                                                    onChange={handleChange}
                                                    className="p-inputtext ml-6"
                                                    style={{ width: '350px' }}
                                                />
                                            ) : (
                                                ` ${user.mobile}`
                                            )}
                                        </label>
                                    </div>

                                    <div className="mb-3 mt-4"> {/* Added margin bottom */}
                                        <label>
                                            <strong>Verified:</strong>
                                            {/* {("User_"+user._id)} */}
                                            {user.isVerified && <MdVerified style={{ color: 'blueviolet', fontSize: '24px', marginLeft: '14px' }} />}

                                        </label>
                                    </div>

                                    <div className="mt-3">
                                        <Button
                                            label={isEditing ? "Save" : "Edit"}
                                            icon={isEditing ? "pi pi-save" : "pi pi-pencil"}
                                            onClick={isEditing ? handleSaveClick : handleEditClick}
                                            className="p-button-primary pl-2"
                                            style={{
                                                // backgroundColor: isEditing ? '#4CAF50' : '#007bff',
                                                backgroundColor: isEditing ? '#4CAF50' : '#FFD333',
                                                borderColor: isEditing ? '#4CAF50' : '#FFD333',
                                                color: isEditing ? '#FFFFFF' : '#454d55',
                                                marginRight: '10px',
                                                height: '35px',
                                                width: '70px'
                                            }}
                                        />
                                        {isEditing && (
                                            <Button
                                                label="Cancel"
                                                icon="pi pi-times pl-2"
                                                onClick={handleEditClick}
                                                className="p-button-secondary"
                                                style={{
                                                    backgroundColor: '#f44336',
                                                    borderColor: '#f44336',
                                                    color: '#fff',
                                                    height: '35px',
                                                    width: '80px'
                                                }}
                                            />
                                        )}
                                    </div>
                                </>
                            ) : (
                                <p>Please log in to view your account details.</p>

                            )}
                        </Card>
                    </div>
                </div>
            </div>
        </>
    );
};

export default UserProfile;
