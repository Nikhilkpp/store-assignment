import { useState } from "react";
import useInfo from "../hooks/useInfo.js";

const StarRating = ( {rating} ) => {
    const fullStars = Math.floor(rating);
    
    const stars = [];

    for (let i = 0; i < 5; i++) {
        stars.push(
        <span key={i} className={i < fullStars ? "text-yellow-500" : "text-gray-300"}>
            ★
        </span>
        );
    }
    return <div className="inline-block">{stars}</div>;
    }
function StoreCard({id,name,overallRating,yourRating,address}){
const {submitRating}=  useInfo();
const [rating, setRating] = useState(0);
const handleChange = (e) => {
    setRating(e.target.value);
  };
  const handleRateSubmit=async()=>{
    if(rating<1) return;
    await submitRating(id,rating);
  }



    

    
    return(
        <>
        <div className="bg-white rounded-2xl shadow p-6 space-y-3">
      <h3 className="text-xl font-bold">{name}</h3>
      <p className="text-gray-600">{address}</p>
      
    <div>Overall rating: <StarRating  rating={overallRating} /></div>
    <div>Your rating: <StarRating  rating={yourRating} /></div>
        

      <div className="flex items-center space-x-4 mt-2">
        
        <select 
        className="border rounded-lg p-2" 
        value={rating}
        onChange={handleChange}
      >
        <option value="">Rate</option>
        {[1, 2, 3, 4, 5].map((val) => (
          <option key={val} value={val}>{val}</option>
        ))}
      </select>
        <button onClick={handleRateSubmit} className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
          Submit / Update Rating
        </button>
      </div>
    </div>
        </>
    )
}


export default StoreCard;