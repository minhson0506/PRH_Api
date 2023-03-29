interface Company {
    businessId: string;
    name: string;
    registrationDate: Date;
    companyFrom: string;
    detailsUri: string | null;
    liquidation: Liquidation[];
    names: Name[];
    auxiliaryNames: auxiliaryName[];
    addresses: Address[];
    companyForm: CompanyForm[];
    businessLines: BusinessLines[];
    languages: Languages[];
    registerOffices: RegisterOffices[];
    contactDetails: ContactDetails[];
    registerentries: Registerentries[];
    budinessIdChanges: budinessIdChanges[];
}

interface CompanyDetails extends Company {
    liquidation: Liquidation[];
    names: Name[];
    auxiliaryNames: auxiliaryName[];
    addresses: Address[];
    companyForm: CompanyForm[];
    businessLines: BusinessLines[];
    languages: Languages[];
    registerOffices: RegisterOffices[];
    contactDetails: ContactDetails[];
    registerentries: Registerentries[];
    budinessIdChanges: budinessIdChanges[];
}

interface BaseInformation {
    registration: Date;
    endDate: Date | null;
    language: string;
    source: number;
}

interface Liquidation extends BaseInformation {
    version: number;
    name: string;
    type: number;
}

interface Name extends BaseInformation{
    order: number;
    version: number;
    name: string;
}

interface auxiliaryName extends BaseInformation {
    order: number;
    version: number;
    name: string;
}

interface Address extends BaseInformation{
    careOf: string | null;
    street: string;
    postalCode: string;
    type: number;
    version: number;
    city: string;
    country: string | null;
}

interface CompanyForm extends BaseInformation {
    version: number;
    name: string;
    type: string| null;
}

interface BusinessLines extends BaseInformation {
    order: number;
    version: number;
    code: string;
    name: string;
}

interface Languages extends BaseInformation {
    version: number;
    name: string;
}

interface RegisterOffices extends BaseInformation {
    order: number;
    version: number;
    name: string;
}

interface ContactDetails extends BaseInformation {
    version: number;
    value: string;
    type: string;
}

interface Registerentries {
    authority: number;
    register: number;
    status: number;
    registrationDate: Date;
    endDate: Date | null;
    statusDate: Date;
    language: string;
    description: string;
}

interface budinessIdChanges {
    source: number;
    description: string;
    reason: string;
    changedDate: Date;
    change: number;
    oldBusinessId: string;
    newBusinessId: string;
    language: string;
}

export {Company, CompanyDetails}
