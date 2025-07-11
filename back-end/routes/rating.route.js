import { Router } from "express";
import protectRoute from '../middleware/protectRoute.middleware.js'
import { ratingController } from "../controllers/rating.controller.js";

const router = Router();

router.post('/:id',protectRoute, ratingController )


export default router;