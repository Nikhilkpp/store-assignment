import { useState } from "react";
import StoreCard from "./storeCard";
import { useEffect } from "react";
import { useAuthContext } from "../context/authContext";
import useInfo from "../hooks/useInfo.js";

function StoreSearch() {
    const [query, setQuery] = useState("");
    const { authUser } = useAuthContext()
    const {sampleStores}=useAuthContext();
    const { getStores } = useInfo();

    useEffect(() => {
    getStores();

    const intervalId = setInterval(() => {
      getStores();
    }, 3000);

    return () => clearInterval(intervalId);
  }, []);

    let [filteredValue, setFilteredValue] = useState(sampleStores);


    useEffect(() => {
        if (query.length > 3) {
            const filtered = sampleStores.filter(
                store => store.name.toLowerCase().includes(query.toLowerCase()) ||
                    store.address.toLowerCase().includes(query.toLowerCase())
            )
            filtered.length == 0 ? alert('No stores found') : "";
            filtered.length == 0 ? setQuery("") : "";
            setFilteredValue(filtered.length > 0 ? filtered : sampleStores);
        }

        else {
            setFilteredValue(sampleStores)
        }
    },
        [query,sampleStores]);



    return (
        <>
            <section className="bg-white rounded-2xl shadow p-6">
                <h2 className="text-2xl font-semibold mb-4">Search Stores</h2>
                <input
                    type="text"
                    placeholder="Search by Name or Address"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="w-full border rounded-lg p-2"
                />
            </section>



            <section className="space-y-6">
                <h2 className="text-2xl font-semibold">Store Listings</h2>

               
                {filteredValue.length === 0 ? (<p className="text-red-500">No stores found</p>) :
                    filteredValue.map((item) => (
                        <StoreCard key={item.id} id={item.id} name={item.name} overallRating={item.overallRating} yourRating={item.yourRating} address={item.address} />
                    ))
                }

            </section>
        </>
    )
}

export default StoreSearch;