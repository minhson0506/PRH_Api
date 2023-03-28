interface PRHCompany {
    type: string;
    version: number;
    totalResults: number;
    resultsFrom: number;
    previousResultsUri: string | null;
    nextResultsUri: string | null;
    exceptionNoticeUri: string | null;
    results: Company[];
}

export { PRHCompany}