import express from "express";
import { Router } from "express";
import {localFileUpload,imageUpload} from "../controllers/fileUpload.js"

const router=Router();

router.post("/localFileUpload",localFileUpload)
router.post("/imageUpload",imageUpload)

export default router;