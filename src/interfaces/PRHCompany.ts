import {Company, CompanyDetails} from "./Company";

interface PRHBaseInformation {
    type: string;
    version: number;
    totalResults: number;
    resultsFrom: number;
    previousResultsUri: string | null;
    nextResultsUri: string | null;
    exceptionNoticeUri: string | null;
}
interface PRHCompany extends PRHBaseInformation{
    results: Company[];
}

interface PRHCompanyDetails extends PRHBaseInformation{
    results: CompanyDetails[];
}

export { PRHCompany, PRHCompanyDetails}