import {Request, Response, NextFunction} from "express";
import {getCompaniesByPostalCode} from "../models/companyModel";

const companyGetByPostalCode = async (req: Request<{postalCode: string}, {}, {}>, res: Response, next: NextFunction) => {
    try {
        const companies = await getCompaniesByPostalCode(req.params.postalCode)
        res.json(companies)
    } catch (error) {
        next(error)
    }
}

export {companyGetByPostalCode}
