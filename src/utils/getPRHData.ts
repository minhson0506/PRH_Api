// Make the `request` function generic

import CustomError from "../classes/CustomError"
import {promisePool} from "../database/db"
import {Company} from "../interfaces/Company"
import {PRHCompany} from "../interfaces/PRHCompany"
import {baseUrlCompanyId, baseUrlPRH, postalCodes} from "./variables"

async function getData() {
    initDB()
    for (const postalCode of postalCodes) {
        await requestData<PRHCompany>(postalCode).then(async (data) => {
            const companies = data.results
            for (const company of companies) {
                await requestData<Company>(company.businessId, {}, false).then((data) => {
                    console.log(data)
                })
            }
        })
    }
}

// to specify the return data type:
async function requestData<TResponse>(
    input: string,
    // `RequestInit` is a type for configuring 
    // a `fetch` request. By default, an empty object.
    config: RequestInit = {},
    // `isPostalCode` is a boolean that specifies that is postal code or not
    isPostalCode: boolean = true
    // This function is async, it will return a Promise:
): Promise<TResponse> {

    // Inside, we call the `fetch` function with 
    // a URL and config given:
    try {
        let url = baseUrlPRH + input
        if (!isPostalCode) {
            url = baseUrlCompanyId + input
        }
        await sleep(1000)
        console.log(url)
        const response = await fetch(url, config)
        const data = await response.json()
        return data as TResponse
    } catch (error) {
        console.log(error)
        throw new CustomError("Error when getting data from PRH", 404)
    }
}

function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const initDB = async () => {
    try {
        // drop table if it is exists
        await promisePool.execute("DROP TABLE IF EXISTS companies;");
        await promisePool.execute("DROP TABLE IF EXISTS liquidataions;");
        await promisePool.execute("DROP TABLE IF EXISTS names;");
        await promisePool.execute("DROP TABLE IF EXISTS auxiliaryNames;");
        await promisePool.execute("DROP TABLE IF EXISTS addresses;");
        await promisePool.execute("DROP TABLE IF EXISTS companyForm;");
        await promisePool.execute("DROP TABLE IF EXISTS businessLines;");
        await promisePool.execute("DROP TABLE IF EXISTS languages;");
        await promisePool.execute("DROP TABLE IF EXISTS registerOffices;");
        await promisePool.execute("DROP TABLE IF EXISTS contactDetails;");
        await promisePool.execute("DROP TABLE IF EXISTS registerentries;");
        await promisePool.execute("DROP TABLE IF EXISTS budinessIdChanges;");

        // create new table for new data
        await promisePool.execute(
            `
            CREATE TABLE IF NOT EXISTS baseInformation
            (id INT NOT NULL AUTO_INCREMENT, registrationDate VARCHAR(255) NOT NULL, endDate VARCHAR(255), language VARCHAR(255) NOT NULL, source INT NOT NULL,
            PRIMARY KEY (id));`);

        await promisePool.execute(
            `
            CREATE TABLE IF NOT EXISTS companies 
            (id INT NOT NULL AUTO_INCREMENT, name VARCHAR(255) NOT NULL, businessId VARCHAR(255) NOT NULL, registrationDate VARCHAR(255) NOT NULL, companyForm VARCHAR(255) NOT NULL, detaialUri VARCHAR(255), 
            PRIMARY KEY (id));`);

        await promisePool.execute(
            `
            CREATE TABLE IF NOT EXISTS liquidataions
            (businessId VARCHAR(255) NOT NULL, name VARCHAR(255) NOT NULL, type VARCHAR(255) NOT NULL, version INT NOT NULL, baseId INT NOT NULL,
            PRIMARY KEY (businessId));`);

        await promisePool.execute(
            `
            CREATE TABLE IF NOT EXISTS names
            (businessId VARCHAR(255) NOT NULL, name VARCHAR(255) NOT NULL, orders INT NOT NULL, version INT NOT NULL, baseId INT NOT NULL,
            PRIMARY KEY (businessId));`);

        await promisePool.execute(
            `
            CREATE TABLE IF NOT EXISTS auxiliaryNames
            (businessId VARCHAR(255) NOT NULL, name VARCHAR(255) NOT NULL, orders INT NOT NULL, version INT NOT NULL, baseId INT NOT NULL,
            PRIMARY KEY (businessId));`);

        await promisePool.execute(
            `
            CREATE TABLE IF NOT EXISTS addresses
            (businessId VARCHAR(255) NOT NULL, careOf VARCHAR(255), street VARCHAR(255) NOT NULL, postalCode VARCHAR(255) NOT NULL, type VARCHAR(255) NOT NULL, version INT NOT NULL, city VARCHAR(255) NOT NULL, country VARCHAR(255) NOT NULL, baseId INT NOT NULL,
            PRIMARY KEY (businessId));`);

        await promisePool.execute(
            `
            CREATE TABLE IF NOT EXISTS companyForm
            (businessId VARCHAR(255) NOT NULL, version INT NOT NULL, name VARCHAR(255) NOT NULL, type VARCHAR(255), baseId INT NOT NULL,
            PRIMARY KEY (businessId));`);

        await promisePool.execute(
            `
            CREATE TABLE IF NOT EXISTS businessLines
            (businessId VARCHAR(255) NOT NULL, orders INT NOT NULL, version INT NOT NULL, code VARCHAR(255) NOT NULL, name VARCHAR(255) NOT NULL, baseId INT NOT NULL,
            PRIMARY KEY (businessId));`);

        await promisePool.execute(
            `
            CREATE TABLE IF NOT EXISTS languages
            (businessId VARCHAR(255) NOT NULL, version INT NOT NULL, name VARCHAR(255) NOT NULL, baseId INT NOT NULL,
            PRIMARY KEY (businessId));`);

        await promisePool.execute(
            `
            CREATE TABLE IF NOT EXISTS registerOffices
            (businessId VARCHAR(255) NOT NULL, version INT NOT NULL, name VARCHAR(255) NOT NULL, orders INT NOT NULL, baseId INT NOT NULL,
            PRIMARY KEY (businessId));`);

        await promisePool.execute(
            `
            CREATE TABLE IF NOT EXISTS contactDetails
            (businessId VARCHAR(255) NOT NULL, version INT NOT NULL, value VARCHAR(255) NOT NULL, type VARCHAR(255) NOT NULL, baseId INT NOT NULL,
            PRIMARY KEY (businessId));`);

        await promisePool.execute(
            `
            CREATE TABLE IF NOT EXISTS registerentries
            (businessId VARCHAR(255) NOT NULL, authority INT NOT NULL, register INT NOT NULL, status INT NOT NULL, registrationDate VARCHAR(255) NOT NULL, 
            endDate VARCHAR(255), statusDate VARCHAR(255) NOT NULL, language VARCHAR(255) NOT NULL, description VARCHAR(255) NOT NULL,
            PRIMARY KEY (businessId));`);

        await promisePool.execute(
            `
            CREATE TABLE IF NOT EXISTS budinessIdChanges
            (businessId VARCHAR(255) NOT NULL, source INT NOT NULL, description VARCHAR(255) NOT NULL, reason VARCHAR(255) NOT NULL, changeDate VARCHAR(255) NOT NULL,
            changes INT NOT NULL, oldBusinessId VARCHAR(255) NOT NULL, newBusinessId VARCHAR(255) NOT NULL, language VARCHAR(255) NOT NULL,
            PRIMARY KEY (businessId));`);


    } catch (error) {
        throw new CustomError("Error when creating table", 500)
    }
}

export {getData}