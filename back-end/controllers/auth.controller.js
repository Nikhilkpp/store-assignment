
import db from '../db/db.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken';
export const updatePassword = async(req,res)=>{
    try {
        const {currentPass, newPass, confPass}= req.body;
        if(newPass !== confPass){
            req.status(401).json({
                message:"Passwords do not match"
            })
        }
        const currUser=req.user.id;
        const query= 'SELECT * FROM USERS WHERE id = ?';
        const [result]=await db.query(query,[currUser]);

        if(result.length===0){
            throw new Error({message:'Unexpected error occured.'});
        }
        const isMatch = await bcrypt.compare(currentPass,result[0].password);

        if(!isMatch){
            return res.status(401).json({ error: "Invalid credentials." });

        }
        const query2='UPDATE users SET password= ? WHERE id = ?';
        const salt=await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(newPass,salt);
        await db.query(query2,[hashedPass,currUser])
        
        return res.status(200).json({message:"Updated successfully."})



        

        
    } catch (error) {
        res.status(500).json({
            message:"An error occured.",
            error:error.message
        })
        
    }
}
export const LoginUser = async(req,res)=>{
    try{

        const {email,password}=req.body;

        if (!email || !password) {
        return res.status(400).json({ error: "Email and password are required." });
        }

        const query='SELECT * FROM users WHERE email = ?';

        const [user]= await db.query(query,[email]);
        if(user.length === 0){
            return res.status(404).json({ error: "User not found." });

        }
        const isMatch = await bcrypt.compare(password,user[0].password);
        if(!isMatch){
        return res.status(401).json({ error: "Invalid credentials." });
        }
        const { password: _, ...userData } = user[0];
        generateTokenAndSetCookie(user[0].id,user[0].role,res)
        return res.status(200).json({ message: "Login successful", user: userData });
    }
    catch(error){
        
        return res.status(500).json({ message: "Internal server error", error: error.message });

    }
    
}
export const SignupUser = async(req,res)=>{
    try {
        const {name,email,password,confirmPassword,role,address}=req.body;
        
        if (!name || !email || !password || !confirmPassword || !address) {
            return res.status(400).json({ error: "All fields are required." });
        }

        if(password !== confirmPassword){
            return res.status(400).json({error:"Password don't match"});

        }
        const roleVal= role ? "store" : 'user';
        
        const [existingUsers] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
        if (existingUsers.length > 0) {
            return res.status(400).json({ message: "User already exists." });
        }


        const salt=await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(password,salt);


        const [result] = await db.query(`INSERT INTO users (name, email, password, address, role) VALUES (?, ?, ?, ?, ?)`,
            [name, email, hashedPass, address, roleVal]);
            
        const userId = result.insertId;
        const newUser = {
            id:userId,
            name,
            email,
            address,
            role:roleVal
        }

        await generateTokenAndSetCookie(userId,roleVal,res)
        return res.status(201).json({message:newUser})
        
    } catch (error) {
        return res.status(500).json({message : "error occured", error:error.message})
        
    }


}
export const SignoutUser = async(req,res)=>{

    res.cookie('jwt','')
    res.cookie('role','')
    res.status(200).json({message:"Logged out successfully"})

}






const generateTokenAndSetCookie=(userId,role,res)=>{
    const token =jwt.sign({userId}, process.env.JWT_SECRET,{
        expiresIn:"15d"

    })
    res.cookie("jwt",token,{
        maxAge:15 *24 * 60 * 60 * 1000, 
        httpOnly:true,
        sameSite:"strict",
        secure: false
    })
     res.cookie("role",role,{
        maxAge:15 *24 * 60 * 60 * 1000, 
        httpOnly:true,
        sameSite:"strict",
        secure: false
    })
}

