// Make the `request` function generic

import {postCompany} from "../api/models/companyModel"
import CustomError from "../classes/CustomError"
import {promisePool} from "../database/db"
import {Company} from "../interfaces/Company"
import {PRHCompany, PRHCompanyDetails} from "../interfaces/PRHCompany"
import {baseUrlCompanyId, baseUrlPRH, postalCodes} from "./variables"

async function getData() {
    // init database
    initDB()

    // post data to database
    for (const postalCode of postalCodes) {
        await requestData<PRHCompany>(postalCode).then(async (data) => {
            const companies = data.results
            for (const company of companies) {
                await requestData<PRHCompanyDetails>(company.businessId, {}, false).then((data) => {
                    // post data to database
                    if (data.results.length > 0) {
                        postCompany(data.results[0], postalCode)
                    }
                })
            }
        })
    }
    console.log("Data is ready")
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
        await promisePool.execute("DROP TABLE IF EXISTS businessIdChanges;");

        // create new table for new data
        await promisePool.execute(
            `
            CREATE TABLE IF NOT EXISTS companies 
            (id INT NOT NULL AUTO_INCREMENT, name VARCHAR(255) NOT NULL, businessId VARCHAR(255) NOT NULL, postalCode VARCHAR(255) NOT NULL, registrationDate VARCHAR(255) NOT NULL, companyForm VARCHAR(255) NOT NULL, detailsUri VARCHAR(255), 
            PRIMARY KEY (id));`);

        await promisePool.execute(
            `
            CREATE TABLE IF NOT EXISTS liquidataions
            (id INT NOT NULL AUTO_INCREMENT, businessId VARCHAR(255) NOT NULL, name VARCHAR(255), type VARCHAR(255), version INT, registrationDate VARCHAR(255), endDate VARCHAR(255), language VARCHAR(255), source INT,
            PRIMARY KEY (id));`);

        await promisePool.execute(
            `
            CREATE TABLE IF NOT EXISTS names
            (id INT NOT NULL AUTO_INCREMENT, businessId VARCHAR(255) NOT NULL, name VARCHAR(255), orders INT, version INT, registrationDate VARCHAR(255), endDate VARCHAR(255), source INT,
            PRIMARY KEY (id));`);

        await promisePool.execute(
            `
            CREATE TABLE IF NOT EXISTS auxiliaryNames
            (id INT NOT NULL AUTO_INCREMENT, businessId VARCHAR(255) NOT NULL, name VARCHAR(255), orders INT, version INT, registrationDate VARCHAR(255), endDate VARCHAR(255), source INT,
            PRIMARY KEY (id));`);

        await promisePool.execute(
            `
            CREATE TABLE IF NOT EXISTS addresses
            (id INT NOT NULL AUTO_INCREMENT, businessId VARCHAR(255) NOT NULL, careOf VARCHAR(255), street VARCHAR(255), postCode VARCHAR(255), type VARCHAR(255), version INT, city VARCHAR(255), country VARCHAR(255), registrationDate VARCHAR(255), endDate VARCHAR(255), language VARCHAR(255), source INT,
            PRIMARY KEY (id));`);

        await promisePool.execute(
            `
            CREATE TABLE IF NOT EXISTS companyForms
            (id INT NOT NULL AUTO_INCREMENT, businessId VARCHAR(255) NOT NULL, version INT, name VARCHAR(255), type VARCHAR(255), registrationDate VARCHAR(255), endDate VARCHAR(255), language VARCHAR(255), source INT,
            PRIMARY KEY (id));`);

        await promisePool.execute(
            `
            CREATE TABLE IF NOT EXISTS businessLines
            (id INT NOT NULL AUTO_INCREMENT, businessId VARCHAR(255) NOT NULL, orders INT, version INT, code VARCHAR(255), name VARCHAR(255), registrationDate VARCHAR(255), endDate VARCHAR(255), language VARCHAR(255), source INT,
            PRIMARY KEY (id));`);

        await promisePool.execute(
            `
            CREATE TABLE IF NOT EXISTS languages
            (id INT NOT NULL AUTO_INCREMENT, businessId VARCHAR(255) NOT NULL, version INT, name VARCHAR(255), registrationDate VARCHAR(255), endDate VARCHAR(255), language VARCHAR(255), source INT,
            PRIMARY KEY (id));`);

        await promisePool.execute(
            `
            CREATE TABLE IF NOT EXISTS registedOffices
            (id INT NOT NULL AUTO_INCREMENT, businessId VARCHAR(255) NOT NULL, version INT, name VARCHAR(255), orders INT, registrationDate VARCHAR(255), endDate VARCHAR(255), language VARCHAR(255), source INT,
            PRIMARY KEY (id));`);

        await promisePool.execute(
            `
            CREATE TABLE IF NOT EXISTS contactDetails
            (id INT NOT NULL AUTO_INCREMENT, businessId VARCHAR(255) NOT NULL, version INT, value VARCHAR(255), type VARCHAR(255), registrationDate VARCHAR(255), endDate VARCHAR(255), language VARCHAR(255), source INT,
            PRIMARY KEY (id));`);

        await promisePool.execute(
            `
            CREATE TABLE IF NOT EXISTS registerEntries
            (id INT NOT NULL AUTO_INCREMENT, businessId VARCHAR(255) NOT NULL, authority INT, register INT, status INT, registrationDate VARCHAR(255), 
            endDate VARCHAR(255), statusDate VARCHAR(255), language VARCHAR(255), description VARCHAR(255),
            PRIMARY KEY (id));`);

        await promisePool.execute(
            `
            CREATE TABLE IF NOT EXISTS businessIdChanges
            (id INT NOT NULL AUTO_INCREMENT, businessId VARCHAR(255) NOT NULL, source INT, description VARCHAR(255), changeDate VARCHAR(255),
            changes VARCHAR(255), oldBusinessId VARCHAR(255), newBusinessId VARCHAR(255), language VARCHAR(255),
            PRIMARY KEY (id));`);


    } catch (error) {
        throw new CustomError("Error when creating table", 500)
    }
}

export {getData}