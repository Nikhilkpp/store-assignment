import { Router } from "express";
import { storeInfo, usersInfo } from "../controllers/info.controller.js";
import protectRoute from "../middleware/protectRoute.middleware.js";

const router= Router();

router.get('/stores',protectRoute,storeInfo)
router.get('/users',protectRoute,usersInfo)
export default router;