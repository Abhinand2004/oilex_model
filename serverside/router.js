import { Router } from "express";
import Auth from "./authentication/auth.js";
import * as rh from './reqhandler.js'
const router=Router();

router.route("/register").post(rh.register)
router.route("/login").post(rh.login)
router.route("/addpost").post(Auth,rh.createProductDetails)
router.route("/displayuser").get(Auth,rh.userDataDisplay)
router.route("/displayimages").get(Auth,rh.productData)
router.route("/productdetails/:id").get(rh.prductDetailspage)
router.route("/deleteproduct/:id").delete(rh.deleteproduct)
router.route("/update/:id").post(Auth,rh.updateproduct)
router.route("/homepage").get(Auth,rh.displaytohomepage)
router.route("/deleteaccount").delete(Auth,rh.deleteAccount)









export default router