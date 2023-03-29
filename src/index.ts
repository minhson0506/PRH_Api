import app from './app';
import CustomError from './classes/CustomError';
import {PRHCompany} from './interfaces/PRHCompany';
import {getData} from './utils/getPRHData';
import {baseUrlPRH, postalCodes} from './utils/variables';

const port = process.env.PORT || 3000;

app.listen(port, async () => {
    /* eslint-disable no-console */
    console.log(`Listening: http://localhost:${port}`);
    /* eslint-enable no-console */

    // get all data from PRH and post it to database
    getData()

});


