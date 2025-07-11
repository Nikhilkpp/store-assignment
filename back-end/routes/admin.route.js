import { Router } from "express";
import { storeInfo, usersInfo } from "../controllers/info.controller.js";
import protectRoute from "../middleware/protectRoute.middleware.js";
import { addUser, totalSubmittedRatings } from "../controllers/admin.controller.js";

const router= Router();

router.post('/adduser',protectRoute,addUser)
router.get('/getallrating',protectRoute,totalSubmittedRatings)


export default router;