(async () =>{
  try {
    const axios = require('axios');
    const csv = require('csvtojson');
    const fsp = require('fs').promises;
    const TIME_SERIES = 'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_confirmed_global.csv';
    const path = require('path');

    const confirmed = await axios.get(TIME_SERIES)
    const csvConfirmed = await csv().fromString(confirmed.data);
    const dates =  Object.keys(csvConfirmed[0])
                         .filter(key => key !== 'Province/State' && key !== 'Country/Region' && key !== 'Lat' & key !== 'Long')
                         .map(date => {
                            const [month,day,year] = date.split('/');
                            const formattedDate = `date_${day}_${month}_${year}`;
                            return {
                              name: formattedDate,
                              title: `Info for date ${formattedDate.slice(5).replace(/_/gi, '/')}`,
                              type: 'infoDate',
                            }
                         });

    const currentDirectory = path.join(__dirname);
    const webDirectory = path.join(__dirname,'../../web/src/');
    const datesInJS = `export default{
      data: ${JSON.stringify(dates)}
    }`;
    const datesRequireWay = `module.exports = {
      data: ${JSON.stringify(dates)}
    }`;

    await fsp.writeFile(`${currentDirectory}/assets/dates.js`,datesInJS);
    await fsp.writeFile(`${currentDirectory}/assets/dates-require.js`,datesRequireWay);
    await fsp.writeFile(`${webDirectory}/assets/dates.js`,datesRequireWay);
    console.log(`File saved on: ${currentDirectory}/assets/dates.js`);
    console.log(`File saved on: ${currentDirectory}/assets/dates-require.js`);
    console.log(`File saved on: ${webDirectory}/assets/dates.js`);
  } catch (error) {
    console.log(error);
  }
})()
