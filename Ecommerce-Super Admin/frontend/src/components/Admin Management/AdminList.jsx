import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminList.css';

const AdminList = () => {
    const [adminList, setAdminList] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch all admins from the Admin Project's backend
        axios.get('http://localhost:5000/admin/list') // Update the URL as necessary
            .then(response => {
                // Filter out admins with 'approved' status
                const approvedAdmins = response.data.data.filter(admin => admin.status === 'approved');
                setAdminList(approvedAdmins);
                setLoading(false);
            })
            .catch(err => {
                console.error('Error fetching admin list:', err);
                setError('Error fetching admin list');
                setLoading(false);
            });
    }, []);

    // Ban admin function (replace delete with ban button)
    const handleBanAdmin = (adminId) => {
        if (window.confirm("Are you sure you want to ban this admin?")) {
            axios.patch(`http://localhost:5000/admin/ban/${adminId}`) // Update URL to ban admin
                .then(response => {
                    alert(response.data.message);
                    setAdminList(prevAdmins => prevAdmins.filter(admin => admin._id !== adminId));
                })
                .catch(err => {
                    console.error('Error banning admin:', err);
                    alert('Error banning admin');
                });
        }
    };

    if (loading) return <div className="loading">Loading...</div>;
    if (error) return <div className="error">{error}</div>;

    return (
        <div className="adminListContainer">
            <h2 className="adminListTitle">Approved Admins</h2>
            {adminList.length > 0 ? (
                <div className="datagrid">
                    <div className="tableHeader">
                        <div>Name</div>
                        <div>Email</div>
                        <div>Phone</div>
                        <div>GST</div>
                        <div>Business Number</div>
                        <div>Government ID</div>
                        <div>Status</div>
                        <div>Actions</div>
                    </div>
                    {adminList.map(admin => (
                        <div className="tableRow" key={admin._id}>
                            <div>{admin.name}</div>
                            <div>{admin.email}</div>
                            <div>{admin.phoneNumber}</div>
                            <div>{admin.gstNumber}</div>
                            <div>{admin.businessLicense}</div>
                            <div>{admin.govtId}</div>
                            <div>{admin.status}</div>
                            <div className="cellAction">
                                <button
                                    className="banButton"
                                    onClick={() => handleBanAdmin(admin._id)}
                                >
                                    Ban Admin
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p>No approved admins found.</p>
            )}
        </div>
    );
};

export default AdminList;
