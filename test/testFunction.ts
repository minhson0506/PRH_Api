import request from 'supertest';
import expect from 'expect';
import {CompanyWithPostCode} from '../src/interfaces/Company';

const getCompanies = async (url: string | Function, postalCode: string) => {
    return new Promise((resolve, reject) => {
        request(url)
            .get(`/postal_codes/${postalCode}/companies`)
            .expect(200)
            .end((err, res) => {
                if (err) {
                    console.log("error", err)
                    reject(err)
                } else {
                    expect(res.body).toBeInstanceOf(Array)
                    expect(res.body.length).toBeGreaterThan(0)
                    res.body.forEach((company: CompanyWithPostCode) => {
                        expect(company).toHaveProperty('postCode')
                        expect(company.postCode).toBe(postalCode)
                        expect(company).toHaveProperty('businessId')
                        expect(company).toHaveProperty('name')
                        expect(company).toHaveProperty('registrationDate')
                        expect(company).toHaveProperty('companyForm')
                        expect(company).toHaveProperty('detailsUri')
                        expect(company).toHaveProperty('names')
                        expect(company).toHaveProperty('businessLines')
                        expect(company).toHaveProperty('liquidations')
                        expect(company).toHaveProperty('auxiliaryName')
                        expect(company).toHaveProperty('addresses')
                        expect(company).toHaveProperty('companyForms')
                        expect(company).toHaveProperty('languages')
                        expect(company).toHaveProperty('registedOffices')
                        expect(company).toHaveProperty('contactDetails')
                        expect(company).toHaveProperty('registerEntries')
                        expect(company).toHaveProperty('businessIdChanges')
                    })
                    resolve(res)
                }
            })
    })
}

const getCompaniesNotFound = async (url: string | Function, postalCode: string) => {
    return new Promise((resolve, reject) => {
        request(url)
            .get(`/postal_codes/${postalCode}/companies`)
            .expect(404)
            .end((err, res) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(res)
                }
            })
    })

}

const getUrlNotFound = async (url: string | Function,) => {
    return new Promise((resolve, reject) => {
        request(url)
            .get(`/What-is-this`)
            .expect(404)
            .end((err, res) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(res)
                }
            })
    })
}

export {
    getCompanies,
    getCompaniesNotFound,
    getUrlNotFound,
}