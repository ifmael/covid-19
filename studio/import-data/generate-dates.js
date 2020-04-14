(async () =>{
  try {
    const axios = require('axios');
    const csv = require('csvtojson');
    const _ = require('lodash');
    const fsp = require('fs').promises;
    const TIME_SERIES = 'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_confirmed_global.csv';
    var path = require('path');

    const confirmed = await axios.get(TIME_SERIES)
    const csvConfirmed = await csv().fromString(confirmed.data);
    const dates =  Object.keys(csvConfirmed[0])
                         .filter(key => key !== 'Province/State' && key !== 'Country/Region' && key !== 'Lat' & key !== 'Long')
                         .map(date => {
                           return {
                            name: `date_${date.replace(/\//gi, '_')}`,
                            title: `Info for date ${date}`,
                            type: 'infoDate',
                           }
                         });

    const currentDirectory = path.join(__dirname);
    const datesInJS = `export default{
      data: ${JSON.stringify(dates)}
    }`;
    await fsp.writeFile(`${currentDirectory}/assets/dates.js`,datesInJS)
    console.log(`File saved on: ${currentDirectory}/assets/dates.js`);
  } catch (error) {
    console.log(error);
  }
})()
