(async () => {
  try {
    const datesTypes = require('./assets/dates-require.js');
    const { getDataForSchemaCountryInfoAggregated } = require('./transform/countryInfoAggregated')
    const max = require('date-fns/max')
    const format = require('date-fns/format')
    require('dotenv').config()
    const sanityClient = require('@sanity/client');
    const client = sanityClient({
      projectId: process.env.PROJECT_ID,
      dataset: process.env.DATASET,
      token: process.env.IMPORT_DATA_TOKEN, // or leave blank to be anonymous user
      useCdn: false // `false` if you want to ensure fresh data
    });

    const dates = datesTypes.data.map(date => {
      const [day, month, year] = date.name.slice(5).split('_');
      return new Date(`20${year}`, Number(month) - 1, day);
    });
    const lastDate = max(dates);
    const formatedDate = `date_${format(lastDate, 'd_M_yy')}`;

    const query = `*[_type == 'timeSeries'] { country, ${formatedDate},"name":country->name }`;
    let transaction = client.transaction();
    const countriesInfoLastDate = await client.fetch(query);

    countriesInfoLastDate.forEach(countryInfo => {
      const {country, name } = countryInfo;
      const countryAggregatedSchemaFormated = getDataForSchemaCountryInfoAggregated(country, countryInfo[formatedDate], name, format(lastDate, 'yyyy-MM-dd'))
      transaction.createOrReplace(countryAggregatedSchemaFormated)
    })
    const response = await transaction.commit();
    console.log(response)

  } catch (error) {
    console.log(error.message)
  }
})()
