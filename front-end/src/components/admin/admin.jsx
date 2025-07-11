import React, { useEffect, useState } from 'react';
import useAdmin from '../../hooks/useAdmin.js';
import useLogout from '../../hooks/useLogout.js';
import { useAuthContext } from '../../context/authContext.jsx';
import useInfo from '../../hooks/useInfo.js';

const Admin = () => {
    const [allUsers, setAllUsers] = useState([]);
    const { addUser } = useAdmin();
    const { loading, logout } = useLogout();
    const { sampleStores } = useAuthContext();
    const { getStores, getUsers } = useInfo();
const [ratingCount, setRatingCount] = useState(0);
    useEffect(() => {
        getStores();

        const intervalId = setInterval(() => {
            getStores();
        }, 3000);

        return () => clearInterval(intervalId);
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            const users = await getUsers();
            setAllUsers(users.data);

            const totalRatings = await fetch("http://localhost:3000/api/v1/admin/getallrating", {
                method: "GET",
                credentials: "include"
            })
            const rating = await totalRatings.json();
            setRatingCount(rating.data)
            setAllUsers(users.data);
        };

        fetchData(); 

        const intervalId = setInterval(async () => {
            const users = await getUsers();
            const totalRatings = await fetch("http://localhost:3000/api/v1/admin/getallrating", {
                method: "GET",
                credentials: "include"
            })
            const rating = await totalRatings.json();
            setRatingCount(rating.data)
            setAllUsers(users.data);
        }, 3000);

        return () => clearInterval(intervalId); 
    }, []);

    const [filters, setFilters] = useState({
        name: '',
        email: '',
        address: '',
        role: '',
    });

    const [newUser, setNewUser] = useState({
        name: '',
        email: '',
        password: '',
        address: '',
        role: 'user',
    });





    const handleUserInput = (e) => {
        setNewUser({ ...newUser, [e.target.name]: e.target.value });
    };

    const addNewUser = async (e) => {
        e.preventDefault();
        addUser({ name: newUser.name, email: newUser.email, password: newUser.password, address: newUser.address, role: newUser.role })
        setNewUser({ name: '', email: '', password: '', address: '', role: 'user' });
    };

    return (
        <div className="p-6 space-y-8">
            <header className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">Admin Dashboard</h1>
                <button onClick={logout} className="bg-red-500 text-white px-4 py-2 rounded" >
                    Logout
                </button>
            </header>

            <div className="grid grid-cols-3 gap-4">
                <div className="bg-white shadow p-4 rounded-lg">
                    <h2 className="text-lg font-semibold">Total Users</h2>
                    <p>{allUsers.length}</p>
                </div>
                <div className="bg-white shadow p-4 rounded-lg">
                    <h2 className="text-lg font-semibold">Total Stores</h2>
                    <p>{sampleStores.length}</p>
                </div>
                <div className="bg-white shadow p-4 rounded-lg">
                    <h2 className="text-lg font-semibold">Total Ratings</h2>
                    <p>{ratingCount}</p>
                </div>
            </div>

            <form className="bg-white p-6 rounded-lg shadow space-y-4" onSubmit={addNewUser}>
                <h2 className="text-xl font-semibold">Add New User</h2>
                <div className="grid grid-cols-2 gap-4">
                    <input type="text" name="name" value={newUser.name} onChange={handleUserInput} placeholder="Name" className="border p-2 rounded" required />
                    <input type="email" name="email" value={newUser.email} onChange={handleUserInput} placeholder="Email" className="border p-2 rounded" required />
                    <input type="password" name="password" value={newUser.password} onChange={handleUserInput} placeholder="Password" className="border p-2 rounded" required />
                    <input type="text" name="address" value={newUser.address} onChange={handleUserInput} placeholder="Address" className="border p-2 rounded" required />
                    <select name="role" value={newUser.role} onChange={handleUserInput} className="border p-2 rounded col-span-2">
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                        <option value="store">Store</option>
                    </select>
                </div>
                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Add User</button>
            </form>



            <div className="bg-white shadow p-4 rounded-lg">
                <h2 className="text-lg font-semibold mb-2">Stores</h2>
                <table className="w-full table-auto border-collapse">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="border p-2 text-left">Name</th>
                            <th className="border p-2 text-left">Email</th>
                            <th className="border p-2 text-left">Address</th>
                            <th className="border p-2 text-left">Rating</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sampleStores.map((store) => (
                            <tr key={store.id}>
                                <td className="border p-2">{store.name}</td>
                                <td className="border p-2">{store.email}</td>
                                <td className="border p-2">{store.address}</td>
                                <td className="border p-2">{store.overallRating || 0}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="bg-white shadow p-4 rounded-lg">
                <h2 className="text-lg font-semibold mb-2">Users</h2>
                <table className="w-full table-auto border-collapse">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="border p-2 text-left">Name</th>
                            <th className="border p-2 text-left">Email</th>
                            <th className="border p-2 text-left">Address</th>
                            <th className="border p-2 text-left">Role</th>
                        </tr>
                    </thead>
                    <tbody>
                        {allUsers?.map((user) => (
                            <tr key={user.id}>
                                <td className="border p-2">{user.name}</td>
                                <td className="border p-2">{user.email}</td>
                                <td className="border p-2">{user.address}</td>
                                <td className="border p-2">{user.role}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};


export default Admin;