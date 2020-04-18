(async () => {
  try {
    const axios = require('axios');
    const csv = require('csvtojson');
    const { createReadStream } = require('fs');
    const sanityClient = require('@sanity/client');
    require('dotenv').config()
    const client = sanityClient({
      projectId: process.env.PROJECT_ID,
      dataset: process.env.DATASET,
      token: process.env.IMPORT_DATA_TOKEN, // or leave blank to be anonymous user
      useCdn: false // `false` if you want to ensure fresh data
    });
    const path = require('path');
    const { getDataForSchemaCountry }= require('./transform/country')

    //Get the countries from github and filter it (the condition of the filter get only the countries, not their regions)
    const URL_COUNTRIES = 'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/UID_ISO_FIPS_LookUp_Table.csv';
    const countriesResponse = await axios.get(URL_COUNTRIES);
    const csvCountries = await csv().fromString(countriesResponse.data);

    const path1x1 = path.join(__dirname,'../../assets/flags/1x1');
    const path4x3 = path.join(__dirname,'../../assets/flags/4x3');
    let countries = [];
    const countriesFiltered = csvCountries.filter(csvCountry => csvCountry.FIPS === '' && csvCountry.Admin2 === '' && csvCountry.Province_State === '');
    console.log(`Total countries: ${countriesFiltered.length}`);
    for (let index = 0; index < countriesFiltered.length; index++) {
      const country = countriesFiltered[index];
      console.log(`${index} - Country: ${country.Country_Region}, ISO2: ${country.iso2}, ISO3: ${country.iso3}`);
      const filename = `${country.iso2.toLowerCase()}.svg`
      let flag1x1 = undefined;
      let flag4x3 = undefined;

      if(country.iso2){
        flag1x1 = await client.assets
                                  .upload('image', createReadStream(`${path1x1}/${filename}`),{
                                    filename: `${filename}`
                                  });
        flag4x3 = await client.assets
                                  .upload('image', createReadStream(`${path4x3}/${filename}`),{
                                    filename: `${filename}`
                                  });
        }

      countries.push(getDataForSchemaCountry(country, flag1x1, flag4x3))

    }

    // Create a transacttion an insert all the countries in only one operation
    let transaction = client.transaction();
    countries.forEach(country => transaction.createOrReplace(country));
    const response = await transaction.commit();
    console.log(response);


  } catch (error) {
    console.log(error.message);
  }
})()
