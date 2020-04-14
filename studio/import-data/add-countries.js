(async () => {
  try {
    const axios = require('axios');
    const csv = require('csvtojson');
    const sanityClient = require('@sanity/client');
    require('dotenv').config()
    const client = sanityClient({
      projectId: process.env.PROJECT_ID,
      dataset: process.env.DATASET,
      token: process.env.IMPORT_DATA_TOKEN, // or leave blank to be anonymous user
      useCdn: false // `false` if you want to ensure fresh data
    });

    //Get the countries from github and filter it (the condition of the filter get only the countries, not their regions)
    const URL_COUNTRIES = 'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/UID_ISO_FIPS_LookUp_Table.csv';
    const countriesResponse = await axios.get(URL_COUNTRIES);
    const csvCountries = await csv().fromString(countriesResponse.data);
    const countries = csvCountries.filter(csvCountry => csvCountry.FIPS === '' && csvCountry.Admin2 === '' && csvCountry.Province_State === '')
      .map(csvCountry => {
        return {
          _id: `country-${csvCountry.UID}`,
          _type: 'country',
          name: csvCountry.Country_Region,
          uid: parseInt(csvCountry.UID),
          iso2: csvCountry.iso2,
          iso3: csvCountry.iso3,
          location: {
            lat: parseFloat(csvCountry.Lat),
            lng: parseFloat(csvCountry.Long_),
            alt: 0
          },
          population: parseInt(csvCountry.Population)
        }
      });

    // Create a transacttion an insert all the countries in only one operation
    let transaction = client.transaction();
    countries.forEach(country => transaction.createOrReplace(country));
    const response = await transaction.commit();
    console.log(response);


  } catch (error) {
    console.log(error);
  }
})()
