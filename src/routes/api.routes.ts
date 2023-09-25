import { Router } from "express";
import * as EducationController from "../controllers/education.controller";

const router = Router();

router.get("/educations", EducationController.getAllEducation);
router.post("/education", EducationController.createEducation);

export default router;
