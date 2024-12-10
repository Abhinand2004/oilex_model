import { Router } from "express";
import Auth from "./authentication/auth.js";
import * as rh from './reqhandler.js'
const router=Router();

router.route("/register").post(rh.register)
router.route("/login").post(rh.login)
router.route("/addpost").post(Auth,rh.createProductDetails)



export default router