import {ResultSetHeader} from "mysql2";
import CustomError from "../../classes/CustomError";
import {promisePool} from "../../database/db";
import {GetAddress} from "../../interfaces/Address";
import {GetAuxiliaryName} from "../../interfaces/AuxiliaryName";
import {GetBusinessIdChange} from "../../interfaces/BusinessIdChange";
import {GetBusinessLine} from "../../interfaces/BusinessLine";
import {CompanyDetails, GetCompany} from "../../interfaces/Company";
import {GetCompanyForm} from "../../interfaces/CompanyForm";
import {GetContactDetail} from "../../interfaces/ContactDetails";
import {GetLanguage} from "../../interfaces/Language";
import {GetLiquidation} from "../../interfaces/Liquidation";
import {GetName} from "../../interfaces/Name";
import {GetRegistedOffice} from "../../interfaces/RegistedOffice";
import {GetRegisterEntry} from "../../interfaces/RegisterEntry";

const postCompany = async (company: CompanyDetails, postalCode: string): Promise<number> => {

    // insert liquidation to liquidation table
    company.liquidation?.forEach(async (liquidation) => {
        const [headers] = await promisePool.execute<ResultSetHeader>(
            `
            INSERT INTO liquidations (businessId, name, type, version, registrationDate, endDate, language, source)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?);
            `,
            [
                company.businessId,
                liquidation.name,
                liquidation.type,
                liquidation.version,
                liquidation.registrationDate,
                liquidation.endDate,
                liquidation.language,
                liquidation.source
            ]
        );
        if (headers.affectedRows === 0) {
            throw new CustomError('No liquidation added', 400);
        }
    });

    // insert names to names table
    company.names?.forEach(async (name) => {
        const [headers] = await promisePool.execute<ResultSetHeader>(
            `
            INSERT INTO names (businessId, name, orders, version, registrationDate, endDate, source)
            VALUES (?, ?, ?, ?, ?, ?, ?);
            `,
            [
                company.businessId,
                name.name,
                name.order,
                name.version,
                name.registrationDate,
                name.endDate,
                name.source
            ]
        );
        if (headers.affectedRows === 0) {
            throw new CustomError('No name added', 400);
        }
    });

    // insert auxiliary names to auxiliaryNames table
    company.auxiliaryNames?.forEach(async (auxiliaryName) => {
        const [headers] = await promisePool.execute<ResultSetHeader>(
            `
            INSERT INTO auxiliaryNames (businessId, name, orders, version, registrationDate, endDate, source)
            VALUES (?, ?, ?, ?, ?, ?, ?);
            `,
            [
                company.businessId,
                auxiliaryName.name,
                auxiliaryName.order,
                auxiliaryName.version,
                auxiliaryName.registrationDate,
                auxiliaryName.endDate,
                auxiliaryName.source
            ]
        );
        if (headers.affectedRows === 0) {
            throw new CustomError('No auxiliary name added', 400);
        }
    });

    // insert addresses to addresses table
    company.addresses?.forEach(async (address) => {
        const [headers] = await promisePool.execute<ResultSetHeader>(
            `
            INSERT INTO addresses (businessId, careOf, street, postCode, type, version, city, country, registrationDate, endDate, language, source)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
            `,
            [
                company.businessId,
                address.careOf,
                address.street,
                address.postCode,
                address.type,
                address.version,
                address.city,
                address.country,
                address.registrationDate,
                address.endDate,
                address.language,
                address.source
            ]
        );
        if (headers.affectedRows === 0) {
            throw new CustomError('No address added', 400);
        }
    });

    // insert company forms to companyForms table
    company.companyForms?.forEach(async (companyForm) => {
        const [headers] = await promisePool.execute<ResultSetHeader>(
            `
            INSERT INTO companyForms (businessId, name, version, type, registrationDate, endDate, language, source)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?);
            `,
            [
                company.businessId,
                companyForm.name,
                companyForm.version,
                companyForm.type,
                companyForm.registrationDate,
                companyForm.endDate,
                companyForm.language,
                companyForm.source
            ]
        );
        if (headers.affectedRows === 0) {
            throw new CustomError('No company form added', 400);
        }
    });

    // insert business lines to businessLines table
    company.businessLines?.forEach(async (businessLine) => {
        const [headers] = await promisePool.execute<ResultSetHeader>(
            `
            INSERT INTO businessLines (businessId, name, version, orders, code, registrationDate, endDate, language, source)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);
            `,
            [
                company.businessId,
                businessLine.name,
                businessLine.version,
                businessLine.order,
                businessLine.code,
                businessLine.registrationDate,
                businessLine.endDate,
                businessLine.language,
                businessLine.source
            ]
        );
        if (headers.affectedRows === 0) {
            throw new CustomError('No business line added', 400);
        }
    });

    // insert language to languages table
    company.languages?.forEach(async (language) => {
        const [headers] = await promisePool.execute<ResultSetHeader>(
            `
            INSERT INTO languages (businessId, name, version, registrationDate, endDate, language, source)
            VALUES (?, ?, ?, ?, ?, ?, ?);
            `,
            [
                company.businessId,
                language.name,
                language.version,
                language.registrationDate,
                language.endDate,
                language.language,
                language.source
            ]
        );
        if (headers.affectedRows === 0) {
            throw new CustomError('No language added', 400);
        }
    });

    // insert registered office to registeredOffices table
    company.registedOffices?.forEach(async (registeredOffice) => {
        const [headers] = await promisePool.execute<ResultSetHeader>(
            `
            INSERT INTO registedOffices (businessId, orders, version, name, registrationDate, endDate, language, source)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?);
            `,
            [
                company.businessId,
                registeredOffice.order,
                registeredOffice.version,
                registeredOffice.name,
                registeredOffice.registrationDate,
                registeredOffice.endDate,
                registeredOffice.language,
                registeredOffice.source
            ]
        );
        if (headers.affectedRows === 0) {
            throw new CustomError('No registered office added', 400);
        }
    });

    // inser contact information to contactDetails table
    company.contactDetails?.forEach(async (contactDetail) => {
        const [headers] = await promisePool.execute<ResultSetHeader>(
            `
            INSERT INTO contactDetails (businessId, type, version, value, registrationDate, endDate, language, source)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?);
            `,
            [
                company.businessId,
                contactDetail.type,
                contactDetail.version,
                contactDetail.value,
                contactDetail.registrationDate,
                contactDetail.endDate,
                contactDetail.language,
                contactDetail.source
            ]
        );
        if (headers.affectedRows === 0) {
            throw new CustomError('No contact detail added', 400);
        }
    });

    // insert register entry to registerEntries table
    company.registerEntries?.forEach(async (registerEntry) => {
        const [headers] = await promisePool.execute<ResultSetHeader>(
            `
            INSERT INTO registerEntries (businessId, authority, register, status, registrationData, endDate, statusDate, language, description)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);
            `,
            [
                company.businessId,
                registerEntry.authority,
                registerEntry.register,
                registerEntry.status,
                registerEntry.registrationDate,
                registerEntry.endDate,
                registerEntry.statusDate,
                registerEntry.language,
                registerEntry.description
            ]
        );
        if (headers.affectedRows === 0) {
            throw new CustomError('No register entry added', 400);
        }
    });

    // insert businessIdchanges to businessIdChanges table
    company.businessIdChanges?.forEach(async (businessIdChange) => {
        const [headers] = await promisePool.execute<ResultSetHeader>(
            `
            INSERT INTO businessIdChanges (businessId, source, description, changeDate, changes, oldBusinessId, newBusinessId, language)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?);
            `,
            [
                company.businessId,
                businessIdChange.source,
                businessIdChange.description,
                businessIdChange.changeDate,
                businessIdChange.change,
                businessIdChange.oldBusinessId,
                businessIdChange.newBusinessId,
                businessIdChange.language
            ]
        );
        if (headers.affectedRows === 0) {
            throw new CustomError('No businessId change added', 400);
        }
    });

    // insert company to companies table
    const [headers] = await promisePool.execute<ResultSetHeader>(
        `
        INSERT INTO companies (businessId, postalCode, name, registrationDate, companyForm, detailsUri)
        VALUES (?, ?, ?, ?, ?, ?);
        `,
        [
            company.businessId,
            postalCode,
            company.name,
            company.registrationDate,
            company.companyForm,
            company.detailsUri
        ]
    );
    if (headers.affectedRows === 0) {
        throw new CustomError('No company added', 400);
    } else return headers.insertId;
}

const getCompaniesByPostalCode = async (postalCode: string) => {
    let [response] = await promisePool.execute<GetCompany[]>(
        `
        SELECT businessId, postalCode, name, registrationDate, companyForm, detailsUri
        FROM companies 
        WHERE postalCode = ?;`
        , [postalCode]
    );

    if (response.length === 0) {
        throw new CustomError('No companies found', 404);
    }
    const companies = Promise.all(response.map(async (company) => {
        // get data from another tables
        const [liquidations] = await promisePool.execute<GetLiquidation[]>(
            `SELECT * FROM liquidations WHERE businessId = ?;`, [company.businessId]
        );

        const [names] = await promisePool.execute<GetName[]>(
            `SELECT * FROM names WHERE businessId = ?;`, [company.businessId]
        );

        const [auxiliaryName] = await promisePool.execute<GetAuxiliaryName[]>(
            `SELECT * FROM auxiliaryNames WHERE businessId = ?;`, [company.businessId]
        );

        const [addresses] = await promisePool.execute<GetAddress[]>(
            `SELECT * FROM addresses WHERE businessId = ?;`, [company.businessId]
        );

        const [companyForms] = await promisePool.execute<GetCompanyForm[]>(
            `SELECT * FROM companyForms WHERE businessId = ?;`, [company.businessId]
        );

        const [businessLines] = await promisePool.execute<GetBusinessLine[]>(
            `SELECT * FROM businessLines WHERE businessId = ?;`, [company.businessId]
        );

        const [languages] = await promisePool.execute<GetLanguage[]>(
            `SELECT * FROM languages WHERE businessId = ?;`, [company.businessId]
        );

        const [registedOffices] = await promisePool.execute<GetRegistedOffice[]>(
            `SELECT * FROM registedOffices WHERE businessId = ?;`, [company.businessId]
        );

        const [contactDetails] = await promisePool.execute<GetContactDetail[]>(
            `SELECT * FROM contactDetails WHERE businessId = ?;`, [company.businessId]
        );

        const [registerEntries] = await promisePool.execute<GetRegisterEntry[]>(
            `SELECT * FROM registerEntries WHERE businessId = ?;`, [company.businessId]
        );

        const [businessIdChanges] = await promisePool.execute<GetBusinessIdChange[]>(
            `SELECT * FROM businessIdChanges WHERE businessId = ?;`, [company.businessId]
        );

        return {
            businessId: company.businessId,
            postCode: company.postalCode,
            name: company.name,
            registrationDate: company.registrationDate,
            companyForm: company.companyForm,
            detailsUri: company.detailsUri,
            liquidations: liquidations,
            names: names,
            auxiliaryName: auxiliaryName,
            addresses: addresses,
            companyForms: companyForms,
            businessLines: businessLines,
            languages: languages,
            registedOffices: registedOffices,
            contactDetails: contactDetails,
            registerEntries: registerEntries,
            businessIdChanges: businessIdChanges
        };
    }));
    return companies;
}


export {postCompany, getCompaniesByPostalCode};



