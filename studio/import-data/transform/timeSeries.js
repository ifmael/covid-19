const max = require('date-fns/max')
const format = require('date-fns/format')

const groupByRegionsForCountry = (country) => {
  return country.reduce((result, value) => {
    Object.keys(value)
      .filter(key => key !== 'Province/State' && key !== 'Country/Region' && key !== 'Lat' & key !== 'Long')
      .forEach(keyDate => {
        return result[keyDate] = result[keyDate] !== undefined ? result[keyDate] + parseInt(value[keyDate]) : parseInt(value[keyDate])
      });
    return result;
  }, {});
};

module.exports = {
  groupCasesByCountry: (confirmedCases, recoveredCases, deathsCases) => {
    const confirmedCountry = groupByRegionsForCountry(confirmedCases);
    const recoveredCountry= groupByRegionsForCountry(recoveredCases);
    const deathsCountry = groupByRegionsForCountry(deathsCases);
    const dates = Object.keys(confirmedCountry);

    return dates.reduce((result, date )=>{
      const [month,day,year] = date.split('/');
      result[`date_${day}_${month}_${year}`] = {
        confirmed: confirmedCountry[date],
        recovered: recoveredCountry[date],
        deaths: deathsCountry[date]
      }
      return result;
    },{});
  },

  getDataForSchemaTimeSeries: (countryName, listCountries, casesCountry) => {
    const infoCountry = listCountries.find(country => country.name === countryName);
    if(infoCountry === undefined)
      console.log(countryName)

    //Get te last date
    const dates = Object.keys(casesCountry).map(date =>{
      const [day, month, year] = date.slice(5).split('_');
      return new Date(`20${year}`, Number(month) - 1, day);
    })
    const lastDate = max(dates);
    const formatedDate = `date_${format(lastDate, 'd_M_yy')}`;

    return {
      _id: `time-series-${countryName.replace(/ /gi, '-').replace(/\(/gi,'').replace(/\)/gi,'').replace(/\'/gi,'-').replace(/\,/gi,'').replace(/\*/gi,'').toLocaleLowerCase()}`,
      _type: 'timeSeries',
      ...casesCountry,
      country: {_type: 'reference', _ref: infoCountry.id},
      lastDate: casesCountry[formatedDate]
    }
  }
}
