import { Router } from "express";
import { SignupUser, SignoutUser, LoginUser, updatePassword } from "../controllers/auth.controller.js";
import protectRoute from "../middleware/protectRoute.middleware.js";

const router = Router();

router.post('/signup', SignupUser)
router.post('/logout', SignoutUser)
router.post('/login', LoginUser)
router.post('/updatepassword', protectRoute,updatePassword);


export default router;