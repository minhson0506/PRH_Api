import express from "express";
import {companyGetByPostalCode} from "../controllers/companyController";

const router = express.Router();

router.route('/:postalCode/companies').get(companyGetByPostalCode);

export default router;