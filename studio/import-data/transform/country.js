module.exports = {
  getDataForSchemaCountry: (country, flag1x1, flag4x3) => {
    const {
      UID,
      Country_Region,
      iso2,
      iso3,
      Lat,
      Long_,
      Population
    } = country;

    const countryInfo = {
      _id: `country-${UID}`,
      _type: 'country',
      name: Country_Region,
      uid: parseInt(UID),
      iso2: iso2,
      iso3: iso3,
      location: {
        lat: parseFloat(Lat),
        lng: parseFloat(Long_),
        alt: 0
      },
      population: parseInt(Population),
    };

    if(flag1x1){
      countryInfo.oneToOne ={
        _type: `image`,
        asset: {
          _type: 'reference',
          _ref: flag1x1._id
        }
      }
    }
    if(flag4x3){
      countryInfo.fourToThree ={
        _type: `image`,
        asset: {
          _type: 'reference',
          _ref: flag4x3._id
        }
      }
    }

    return countryInfo;
  }
}
