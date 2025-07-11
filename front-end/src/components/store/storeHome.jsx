import React, { useState, useEffect } from 'react';
import { useAuthContext } from '../../context/authContext';
import useInfo from '../../hooks/useInfo.js';
import useLogout from '../../hooks/useLogout';
import useUpdatePassword from '../../hooks/useUpdatePassword.js';
const fetchRatings = async (setUserRatings) => {
    const res = await fetch("http://localhost:3000/api/v1/store/ratings", {
        method: "GET",
        credentials: "include"
    })
    const data = await res.json();
    setUserRatings(data.data);


}

const StoreHome = () => {
    const [userRatings, setUserRatings] = useState([]);
    const { authUser, sampleStores } = useAuthContext();
    const myId = authUser.id;
    const { getStores } = useInfo();
    const [matchedStore, setMatchedStore] = useState({})
    const { logout } = useLogout();

    const [currentPass, setCurrentPass] = useState("")
    const [newPass, setNewPass] = useState("")
    const [confPass, setConfPass] = useState("")
    useEffect(() => {
        getStores();
         fetchRatings(setUserRatings);
        console.log(userRatings)
        const intervalId = setInterval(() => {
            getStores();

            fetchRatings(setUserRatings);
        }, 3000);

        return () => clearInterval(intervalId);
    }, []);
    useEffect(() => {
        if (sampleStores.length > 0) {
            const matched = sampleStores.find(store => store.id === Number(myId));
            setMatchedStore(matched);
        }
    }, [sampleStores, myId]);

    const { updatePass } = useUpdatePassword()
    const handleSubmit = async (e) => {
        e.preventDefault();
        await updatePass({ currentPass, newPass, confPass })

    }







    return (
        <div className="max-w-4xl mx-auto p-6 space-y-6">
            <h1 className="text-2xl font-bold">Store Dashboard</h1>

            <div className="p-4 bg-blue-100 rounded">
                <h2 className="text-lg font-semibold">Average Store Rating</h2>
                <p className="text-3xl font-bold text-blue-600">{matchedStore.overallRating}</p>
            </div>

            <div className="p-4 bg-white shadow rounded">
                <h2 className="text-lg font-semibold mb-2">Users Who Rated Your Store</h2>
                <table className="w-full border text-left">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="p-2 border">Name</th>
                            <th className="p-2 border">Email</th>
                            <th className="p-2 border">Rating</th>
                        </tr>
                    </thead>
                    <tbody>
                        {userRatings.length === 0 ? (
                            <tr>
                                <td colSpan="3" className="p-2 text-center">No ratings yet</td>
                            </tr>
                        ) : (
                            userRatings.map((user) => (
                                <tr key={user.id}>
                                    <td className="p-2 border">{user.name}</td>
                                    <td className="p-2 border">{user.email}</td>
                                    <td className="p-2 border">{user.rating}</td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            <section className="bg-white rounded-2xl shadow p-6">
                <h2 className="text-2xl font-semibold mb-4">Update Password</h2>
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <input type="password" placeholder="Current Password" className="w-full border rounded-lg p-2" value={currentPass} onChange={(e) => setCurrentPass(e.target.value)} />
                    <input type="password" placeholder="New Password" className="w-full border rounded-lg p-2" value={newPass} onChange={(e) => setNewPass(e.target.value)} />
                    <input type="password" placeholder="Confirm New Password" className="w-full border rounded-lg p-2" value={confPass} onChange={(e) => setConfPass(e.target.value)} />
                    <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                        Update Password
                    </button>
                </form>
            </section>

            <button
                onClick={logout}
                className="bg-red-600 text-white px-4 py-2 rounded"
            >
                Logout
            </button>
        </div>
    );
};


export default StoreHome;