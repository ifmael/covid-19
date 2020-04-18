export default {
  name: 'country',
  title: 'Country',
  type: 'document',
  description: 'Information related with the country',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: Rule => Rule.required().error('It is necessary a name')
    },
    {
      name: 'uid',
      title: 'UID',
      type: 'number',
      validation: Rule => [
        Rule.required().error('This field is necessary'),
        Rule.integer().error('It has to be a integer')
      ]
    },
    {
      name: 'iso2',
      title: 'ISO 2',
      type: 'string'
    },
    {
      name: 'iso3',
      title: 'ISO 3',
      type: 'string'
    },
    {
      name: 'population',
      title: 'Population',
      type: 'number'
    },
    {
      name: 'location',
      title: 'Location',
      type: 'geopoint'
    },
    {
      name: 'oneToOne',
      type: 'image',
      title: 'Flags with aspect ratio 1:1'
    },
    {
      name: 'fourToThree',
      type: 'image',
      title: 'Flags with aspect ratio 4:3'
    }
  ]
}
