import {RowDataPacket} from "mysql2";
import {Address} from "./Address";
import {AuxiliaryName} from "./AuxiliaryName";
import {BusinessIdChanges} from "./BusinessIdChange";
import {BusinessLines} from "./BusinessLine";
import {CompanyForm} from "./CompanyForm";
import {ContactDetails} from "./ContactDetails";
import {Languages} from "./Language";
import {Liquidation} from "./Liquidation";
import {Name} from "./Name";
import {RegistedOffices} from "./RegistedOffice";
import {RegisterEntries} from "./RegisterEntry";

interface Company {
    businessId: string;
    name: string;
    registrationDate: Date;
    companyForm: string;
    detailsUri: string | null;
}

interface CompanyDetails extends Company {
    liquidation: Liquidation[];
    names: Name[];
    auxiliaryNames: AuxiliaryName[];
    addresses: Address[];
    companyForms: CompanyForm[];
    businessLines: BusinessLines[];
    languages: Languages[];
    registedOffices: RegistedOffices[];
    contactDetails: ContactDetails[];
    registerEntries: RegisterEntries[];
    businessIdChanges: BusinessIdChanges[];
}

interface CompanyWithPostCode extends CompanyDetails {
    postCode: string;
}

interface GetCompany extends RowDataPacket, CompanyWithPostCode {}

export {
    Company,
    CompanyDetails,
    CompanyWithPostCode,
    GetCompany,
};