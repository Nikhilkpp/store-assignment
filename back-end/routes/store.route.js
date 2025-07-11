import { Router } from "express";
import protectRoute from '../middleware/protectRoute.middleware.js'
import { ratingsFinder } from "../controllers/store.controller.js";

const router = Router();

router.get('/ratings',protectRoute, ratingsFinder );


export default router;