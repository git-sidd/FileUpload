import express from "express";
import { Router } from "express";
import {localFileUpload,imageUpload,videoUpload} from "../controllers/fileUpload.js"

const router=Router();

router.post("/localFileUpload",localFileUpload)
router.post("/imageUpload",imageUpload)
router.post("/videoUpload",videoUpload)

export default router;