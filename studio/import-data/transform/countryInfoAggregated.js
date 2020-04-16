 module.exports = {
  getDataForSchemaCountryInfoAggregated: (countryRef, casesDate, name, date) => {
    return {
      _id: `country-info-aggregated-${name.replace(/ /gi, '-').replace(/\(/gi,'').replace(/\)/gi,'').replace(/\'/gi,'-').replace(/\,/gi,'').replace(/\*/gi,'').toLocaleLowerCase()}`,
      _type: 'countryInfoAggregated',
      infoForLastDate:casesDate,
      country: countryRef,
      lastDate: date
    }
  }
}

