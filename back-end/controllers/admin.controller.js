import db from "../db/db.js"
import bcrypt from "bcryptjs"
export const totalUsers = () => { }
export const totalStores = () => { }
export const totalSubmittedRatings = async(req,res) => {
    try {
        const query='SELECT * FROM reviews'
        const [result] = await db.query(query)
        res.status(200).json({data:result.length})
        
    } catch (error) {
        res.status(500).json({error:"an error occoured"})
    }
 }
export const addUser = async (req, res) => {
    try {
        const { name, email, password, address, role } = req.body;
        const [existingUsers] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
        if (existingUsers.length > 0) {
            return res.status(400).json({ error: "User already exists." });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(password, salt);

        const [result] = await db.query(`INSERT INTO users (name, email, password, address, role) VALUES (?, ?, ?, ?, ?)`,
            [name, email, hashedPass, address, role]);

        return res.status(201).json({ message: "user created successfully" })
    } catch (error) {
        console.log('An error occured at admin ad user', error)
        res.status(500).json({ error: error.message })

    }
}