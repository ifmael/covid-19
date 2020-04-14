module.exports = transformCountriesTimeSeries = (countriesTimeSeries) => {
  return countriesTimeSeries.map(country => {
    const keysDates = Object.keys(country).filter(key => key !== 'country');

    return keysDates.reduce((acc, date) => {
      const renameKey = {
        [`${date.slice(5).replace(/_/gi,'-')}`]: country[date]
      };

      return {
        ...acc,
        ...renameKey
      }
    }, {
      name: country.country.name
    });
  });
}
