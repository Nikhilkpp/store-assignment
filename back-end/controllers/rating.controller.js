import db from "../db/db.js";

export const ratingController = async (req, res) => {
  try {
    const { id: storeId } = req.params;
    const { rating } = req.body;
    const userId = req.user.id;

    console.log('Fetched user id dynamically:', userId);

    const [existing] = await db.query(
      `SELECT * FROM reviews WHERE store_id = ? AND user_id = ?`,
      [storeId, userId]
    );

    if (existing.length > 0) {
      await db.query(
        `UPDATE reviews SET rating = ? WHERE store_id = ? AND user_id = ?`,
        [rating, storeId, userId]
      );
      return res.status(200).json({ message: 'Rating updated successfully.' });
    } else {
      await db.query(
        `INSERT INTO reviews (store_id, user_id, rating) VALUES (?, ?, ?)`,
        [storeId, userId, rating]
      );
      return res.status(200).json({ message: 'Rating submitted successfully.' });
    }

  } catch (error) {
    return res.status(500).json({
      message: "Rating couldn't be submitted",
      error: error.message
    });
  }
};
