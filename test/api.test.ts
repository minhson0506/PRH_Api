import app from "../src/app"
import {getCompanies, getCompaniesNotFound, getUrlNotFound} from "./testFunction"

describe('Get company in area', () => {
    // test get all companies in area
    it('should return all companies in area', async () => {
        await getCompanies(app, "01690")
    })

    // test get company in another area
    it('should return null', async () => {
        await getCompaniesNotFound(app, "0000")
    })

    // test url not found
    it('should return 404', async () => {
        await getUrlNotFound(app)
    })

})