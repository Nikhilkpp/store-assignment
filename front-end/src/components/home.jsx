
import { useState } from "react";
import useLogout from "../hooks/useLogout";
import useUpdatePassword from "../hooks/useUpdatePassword";
import StoreSearch from "./storeSearch";

function Home() {
  const [currentPass, setCurrentPass] = useState("")
  const [newPass, setNewPass] = useState("")
  const [confPass, setConfPass] = useState("")

  const { loading, logout } = useLogout();
  const { updatePass } = useUpdatePassword()
  const handleSubmit = async (e) => {
    e.preventDefault();
    await updatePass({ currentPass, newPass, confPass })

  }
  return (
    <>
      <div className="max-w-5xl mx-auto p-6 space-y-10">

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

        <StoreSearch />



        <section className="text-right">
          <button onClick={logout} className="text-red-600 border border-red-600 px-4 py-2 rounded-lg hover:bg-red-50">
            Log Out
          </button>
        </section>

      </div>


    </>
  )
}
export default Home;