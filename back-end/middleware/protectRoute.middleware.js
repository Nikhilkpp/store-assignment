import jwt from "jsonwebtoken";
import db from "../db/db.js";

const protectRoute= async (req,res,next)=>{

    try {
        const token=req.cookies.jwt;
    
        if(!token){
            return res.status(401).json({error:"Unauthorised request: Invalid token. Login FIrst"})
        }
    
        const decoded= await jwt.verify(token,process.env.JWT_SECRET);
    
        if(!decoded){
            return res.status(401).json({error:"Unauthorised request: Invalid token"})
        }
       

        const query='SELECT * FROM users WHERE id = ?';

        const [user]= await db.query(query,[decoded.userId]);
        if(user.length === 0){
            return res.status(404).json({ error: "User not found." });

        }
        if(!user){
            return res.status(404).json({error:"User not found"})
    
        }
    
        req.user=user[0];
        // console.log('user is',user[0])
        next();
    
    } catch (error) {
        console.log("Error in protectRoute middleware: ", error.message);
		res.status(500).json({ error: "Internal server error" });

        
    }
}
export default protectRoute;