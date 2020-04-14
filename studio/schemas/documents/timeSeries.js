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
    }
  ]
}
