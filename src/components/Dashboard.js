// import React, { useContext, useState, useEffect } from 'react';
// import { AuthContext } from '../context/AuthContext';
// import { getUserData } from '../services/userService';

// const Dashboard = () => {
//     const { user, logout } = useContext(AuthContext);
//     const [userData, setUserData] = useState(null);

//     useEffect(() => {
//         const fetchUserData = async () => {
//             const data = await getUserData(user._id);
//             setUserData(data);
//         };
//         fetchUserData();
//     }, [user]);

//     return (
//         <div className="dashboard">
//             <h3>Dashboard</h3>
//             {userData && (
//                 <div>
//                     <p>Name: {userData.name}</p>
//                     <p>Email: {userData.email}</p>
//                     <p>Role: {userData.role}</p>
//                 </div>
//             )}
//             <button onClick={logout}>Logout</button>
//         </div>
//     );
// };

// export default Dashboard;
