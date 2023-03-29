import {RowDataPacket} from "mysql2";
import BaseInformation from "./BaseInformation";

interface CompanyForm extends BaseInformation {
    version: number | null;
    name: string | null;
    type: string | null;
}

interface CompanyFormWithId extends CompanyForm {
    businessId: string;
}

interface GetCompanyForm extends RowDataPacket, CompanyFormWithId {}


export {CompanyForm, CompanyFormWithId, GetCompanyForm};