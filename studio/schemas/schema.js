// First, we must import the schema creator
import createSchema from 'part:@sanity/base/schema-creator'

// Then import schema types from any plugins that might expose them
import schemaTypes from 'all:part:@sanity/base/schema-type'
import country from './documents/country'
import timeSeries from './documents/timeSeries'
import infoDate from './objects/infoDate'
import countryInfoAggregated from './documents/countryInfoAggregated'

import dates from '../import-data/assets/dates'

dates.data.forEach( fieldDate => timeSeries.fields.push(fieldDate));

// Then we give our schema to the builder and provide the result to Sanity
export default createSchema({
  // We name our schema
  name: 'default',
  // Then proceed to concatenate our document type
  // to the ones provided by any plugins that are installed
  types: schemaTypes.concat([
    country,
    countryInfoAggregated,
    infoDate,
    timeSeries
  ])
})
