import { Router } from "express";
import * as EducationController from "../controllers/education.controller";
import * as ExperienceController from "../controllers/experience.controller";
import * as PortfolioController from "../controllers/portfolio.controller";

// ROUTER CONFIG
const router = Router();

// EDUCATION
router.get("/educations", EducationController.getAllEducation);
router.post("/education", EducationController.createEducation);

// EXPERIENCE
router.get("/experiences", ExperienceController.getAllExperience);
router.post("/experience", ExperienceController.createExperience);

// PORTFOLIO
router.get("/portfolios", PortfolioController.getAllPortfolio);
router.post("/portfolio", PortfolioController.createPortfolio);

export default router;
