import React from 'react'
import Grid from '@material-ui/core/Grid'
import CountryCard from './country-card'

const CountryList = ({list}) => {
  return (
    <Grid container spacing={3}>
      { list.length && list.map(country => {
        const countryWithPath = {
          ...country,
          path: `/country/${country.country.name.toLowerCase().replace(' ', '-').replace('*', '')}`
        }

        return (
          <Grid item xs={12} sm={6} key={country._id} >
            <CountryCard info={countryWithPath} />
          </Grid>)
      })
      }
    </Grid>
  )
}

export default CountryList
