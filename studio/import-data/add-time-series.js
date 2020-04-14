(async () => {
  try {
    const axios = require('axios');
    const csv = require('csvtojson');
    const _ = require('lodash');
    const { groupCasesByCountry, getDataForSchemaTimeSeries } = require('./transform/timeSeries')
    const sanityClient = require('@sanity/client');
    require('dotenv').config()
    const client = sanityClient({
      projectId: process.env.PROJECT_ID,
      dataset: process.env.DATASET,
      token: process.env.IMPORT_DATA_TOKEN, // or leave blank to be anonymous user
      useCdn: false // `false` if you want to ensure fresh data
    });
    const TIME_SERIES_URL = [
      'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_confirmed_global.csv',
      'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_deaths_global.csv',
      'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_recovered_global.csv'
    ];


    const query = `*[_type == 'country'] |order(name){ 'id':_id, name}`;
    const countries = await client.fetch(query);

    Promise.all(TIME_SERIES_URL.map(timeSerie => axios.get(timeSerie)))
      .then(async ([ confirmed, deaths, recovered ]) => {
        const csvConfirmed = await csv().fromString(confirmed.data);
        const confirmedGroupByCountry = _.groupBy(csvConfirmed, 'Country/Region');
        const csvDeath = await csv().fromString(deaths.data);
        const deathGroupByCountry = _.groupBy(csvDeath, 'Country/Region');
        const csvRecovered = await csv().fromString(recovered.data);
        const recoveredGroupByCountry = _.groupBy(csvRecovered, 'Country/Region');

        // there should be the same name of countries for confirmed, dead and recovered.Selected one of them, this case confirmed
        let transaction = client.transaction();
        const nameCountries = Object.keys(confirmedGroupByCountry)
        for (let index = 0; index < nameCountries.length; index++) {
          const countryName = nameCountries[index];
          console.log(`${index} - ${countryName}`);
          const countryCases = groupCasesByCountry(confirmedGroupByCountry[countryName], recoveredGroupByCountry[countryName], deathGroupByCountry[countryName]);
          const countryShemaFormated = getDataForSchemaTimeSeries(countryName, countries, countryCases);
          transaction.createOrReplace(countryShemaFormated);
        }
        const response = await transaction.commit();
        console.log(response);
      })
  } catch (error) {
    console.log(error)
  }
})()
