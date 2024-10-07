import React, { useState } from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import Layout from '../../components/Layout/Layout';
import UserMenu from '../../components/Layout/UserMenu';
import { useAuth } from '../../context/Auth';
import { MdVerified } from "react-icons/md";

const UserProfile = () => {
  const [auth] = useAuth();
  const user = auth?.user; // Destructure user from auth
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    username: user?.username || '',
    email: user?.email || '',
    mobile: user?.mobile || '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleEditClick = () => {
    setIsEditing((prev) => !prev);
  };

  const handleSaveClick = () => {
    // Logic to save updated user data
    console.log("Updated user data:", formData);
    setIsEditing(false);
    // You would typically call an API to save this data
  };

  return (
    <Layout title={'Dashboard - Fusion-Store'}>
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
                  <div className="mb-3 mt-4"> {/* Added margin bottom */}
                    <label>
                      <strong>Id:</strong>
                        {("User_"+user._id)}
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
                          style={{width:'350px'}}
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
                          style={{width:'350px'}}
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
                          style={{width:'348x'}}
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
                          style={{width:'350px'}}
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
                          style={{width:'350px'}}
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
                        {user.isVerified && <MdVerified style={{color:'blueviolet',fontSize:'24px',marginLeft:'14px'}}/>}

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
                        color: isEditing?'#FFFFFF':'#454d55',
                        marginRight: '10px',
                        height:'35px',
                        width:'70px'
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
                          height:'35px',
                          width:'80px'
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
    </Layout>
  );
};

export default UserProfile;
