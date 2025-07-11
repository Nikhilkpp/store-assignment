import db from "../db/db.js";

export const ratingsFinder=async(req,res)=>{
    try {
        const storeId=req.user.id;

        const query = 'SELECT u.name, u.email, r.rating FROM reviews r JOIN users u ON r.user_id = u.id WHERE r.store_id = ?';
        const [result]= await db.query(query,[storeId]);

        res.status(200).json({data:result})



    } catch (error) {
        res.status(500).json({error:'error at store raings finder backend'})
        
    }


}