import React from 'react'
import { Link, StaticQuery, graphql } from 'gatsby'
import Layout from '../components/layout'

const IndexPage = () => (
  <StaticQuery
    query ={ graphql`
      query{
        allSanityCountryInfoAggregated(sort: {fields: infoForLastDate___confirmed, order: DESC}) {
          nodes {
            lastDate
            infoForLastDate {
              confirmed
              deaths
              recovered
            }
            country {
              name
            }
            _id
          }
        }
      }`
    }
    render ={ data => {
      const countriesAggregated = data.allSanityCountryInfoAggregated.nodes
      const countries = countriesAggregated.map(countryInfo => {
        return (
          <div key={countryInfo._id} >
            <h1>Name: {countryInfo.country.name}</h1>
            <h2>Confirmed: {countryInfo.infoForLastDate.confirmed}</h2>
            <h2>Recovered: {countryInfo.infoForLastDate.recovered}</h2>
            <h2>Deaths: {countryInfo.infoForLastDate.deaths}</h2>
            <hr/>
          </div>
        )
      })
      return (
        <Layout>
          {countries}
          <Link to="/page-2/">Go to page 2</Link>
        </Layout>
      )
    }
    }
  />
)

export default IndexPage
