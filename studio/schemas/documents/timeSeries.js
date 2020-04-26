export default {
  name: 'timeSeries',
  title: 'Time Series',
  description:'Time Series for countries',
  type: 'document',
  fields: [
    {
      name: 'country',
      type: 'reference',
      to: [{type:'country'}]
    },
    {
      name: 'lastDate',
      title: 'Information related for the last date aggregaded',
      type : 'infoDate'
    }
  ]
}
