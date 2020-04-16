export default {
  name: 'countryInfoAggregated',
  title: 'Country Info Aggregated',
  type: 'document',
  description: 'Information aggregated for last date',
  fields: [{
      name: 'country',
      type: 'reference',
      to: [{
        type: 'country'
      }]
    },
    {
      "name": "infoForLastDate",
      "title": "Info for the date",
      "type": "infoDate"
    },
    {
      title: 'Last Date',
      name: 'lastDate',
      type: 'date',
      options: {
        dateFormat: 'D-M-YY'
      }
    }
  ]
}
