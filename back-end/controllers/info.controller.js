//store info for both
import db from "../db/db.js"
export const storeInfo = async (req, res) => {
    try {
        const query = 'SELECT * FROM users WHERE role=?';
        const userId = req.user.id;
        const [result] = await db.query(query, ['store']);
        const cleanedResult = result.map(({ password, ...rest }) => rest);
      

        
        const query2 = 'SELECT rating FROM reviews WHERE store_id=?';
        const query3='SELECT rating FROM reviews WHERE store_id = ? AND user_id=?'
        for (const store of cleanedResult) {
            const [ratings] = await db.query(query2, [store.id]);
            const [myrating]= await db.query(query3,[store.id, userId])
            if (ratings.length === 0) {
                store.overallRating = 0; // or 0, depending on how you want to show "no ratings"
            } else {
                const total = ratings.reduce((sum, row) => sum + row.rating, 0);
                const avg = total / ratings.length;
                store.overallRating = parseFloat(avg.toFixed(1)); // Round to 1 decimal
            }
            if(myrating.length ===0 ){
                store.yourRating=0;
            }else{
                store.yourRating=myrating[0].rating;
            }
        }
        res.status(200).json({ data: cleanedResult })
    } catch (error) {
        res.status(500).json({ error })

    }
}
//users info for admin
export const usersInfo = async (req, res) => {
    try {
        const query = 'SELECT * FROM users WHERE role IN (?, ?)';
        const userId = req.user.id;
        const [result] = await db.query(query, ['user', 'admin']);
        const cleanedResult = result
            .map(({ password, ...rest }) => rest)
            .filter(user => user.id !== userId);

        res.status(200).json({ data: cleanedResult })
    } catch (error) {
        res.status(500).json({ error })

    }
}