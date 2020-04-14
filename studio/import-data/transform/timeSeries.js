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
      result[`date_${date.replace(/\//gi, '_')}`] = {
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
    return {
      _id: `time-series-${countryName.replace(/ /gi, '-').replace(/\(/gi,'').replace(/\)/gi,'').replace(/\'/gi,'-').replace(/\,/gi,'').replace(/\*/gi,'').toLocaleLowerCase()}`,
      _type: 'timeSeries',
      ...casesCountry,
      country: {_type: 'reference', _ref: infoCountry.id}
    }
  }

}