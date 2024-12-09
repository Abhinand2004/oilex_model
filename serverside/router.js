import { Router } from "express";

import * as rh from './reqhandler.js'
const router=Router();

router.route("/").post(rh.register)
export default router