// import React, { useContext, useState, useEffect } from 'react';
// import { AuthContext } from '../context/AuthContext';
// import { getUserData } from '../services/userService';

// const Dashboard = () => {
//     const { user, logout } = useContext(AuthContext);
//     const [userData, setUserData] = useState(null);
//     const [loading, setLoading] = useState(true);  // To show loading spinner
//     const [error, setError] = useState(null); // To handle errors

//     useEffect(() => {
//         const fetchUserData = async () => {
//             try {
//                 setLoading(true); // Start loading
//                 const data = await getUserData(user._id);
//                 setUserData(data);
//                 setLoading(false); // End loading after data is fetched
//             } catch (error) {
//                 setError('Failed to fetch user data');
//                 setLoading(false); // End loading even on error
//             }
//         };
//         if (user?._id) {
//             fetchUserData();
//         }
//     }, [user]);

//     return (
//         <div className="dashboard">
//             <h3>Dashboard</h3>
//             {loading && <p>Loading...</p>}  {/* Display loading message */}
//             {error && <p className="alert alert-danger">{error}</p>}  {/* Error message */}
//             {userData && !loading && (
//                 <div>
//                     <p>Name: {userData.name}</p>
//                     <p>Email: {userData.email}</p>
//                     <p>Role: {userData.role}</p>
//                 </div>
//             )}
//             {!loading && (
//                 <button onClick={logout} className="btn btn-primary">
//                     Logout
//                 </button>
//             )}
//         </div>
//     );
// };

// export default Dashboard;
