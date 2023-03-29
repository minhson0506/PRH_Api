import {RowDataPacket} from "mysql2";

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
    auxiliaryNames: auxiliaryName[];
    addresses: Address[];
    companyForms: CompanyForm[];
    businessLines: BusinessLines[];
    languages: Languages[];
    registedOffices: RegistedOffices[];
    contactDetails: ContactDetails[];
    registerEntries: Registerentries[];
    businessIdChanges: BusinessIdChanges[];
}

interface BaseInformation {
    registrationDate: Date | null;
    endDate: Date | null;
    language: string | null;
    source: number | null;
}

interface Liquidation extends BaseInformation {
    version: number | null;
    name: string | null;
    type: number | null;
}

interface Name {
    order: number | null;
    version: number | null;
    name: string | null;
    registrationDate: Date | null;
    endDate: Date | null;
    source: number | null;
}

interface auxiliaryName {
    order: number | null;
    version: number | null;
    name: string | null;
    registrationDate: Date;
    endDate: Date | null;
    source: number | null;
}

interface Address extends BaseInformation {
    careOf: string | null;
    street: string | null;
    postCode: string | null;
    type: number | null;
    version: number | null;
    city: string | null;
    country: string | null;
}

interface CompanyForm extends BaseInformation {
    version: number | null;
    name: string | null;
    type: string | null;
}

interface BusinessLines extends BaseInformation {
    order: number | null;
    version: number | null;
    code: string | null;
    name: string | null;
}

interface Languages extends BaseInformation {
    version: number | null;
    name: string | null;
}

interface RegistedOffices extends BaseInformation {
    order: number | null;
    version: number | null;
    name: string | null;
}

interface ContactDetails extends BaseInformation {
    version: number | null;
    value: string | null;
    type: string | null;
}

interface Registerentries {
    authority: number | null;
    register: number | null;
    status: number | null;
    registrationDate: Date | null;
    endDate: Date | null;
    statusDate: Date | null;
    language: string | null;
    description: string | null;
}

interface BusinessIdChanges {
    source: number | null;
    description: string | null;
    changeDate: Date | null;
    change: string | null;
    oldBusinessId: string | null;
    newBusinessId: string | null;
    language: string | null;
}

interface CompanyWithPostCode extends CompanyDetails {
    postCode: string;
}

interface GetCompany extends RowDataPacket, CompanyWithPostCode {}

export {Company, CompanyDetails, BaseInformation, GetCompany}
