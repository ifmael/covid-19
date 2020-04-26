import React from 'react'
import { Link, StaticQuery, graphql } from 'gatsby'
import Layout from '../components/layout'
import CountryList from '../components/country-list'
import BasicTable from '../components/tables/basic-table'

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
              fourToThree {
                asset {
                  _id
                }
              }
              oneToOne {
                asset {
                  _id
                }
              }
            }
            _id
          }
        }
        allSanityTimeSeries {
          nodes {
            lastDate {
              recovered
              deaths
              confirmed
            }
            country {
              _id
              name
            }
          }
        }
      }`
    }
    render ={ data => {
      const countriesAggregated = data.allSanityCountryInfoAggregated.nodes
      const aggregatedCountriesRaw = data.allSanityTimeSeries.nodes
      const aggregatedCountries = aggregatedCountriesRaw.reduce((acc, infoCountry) => {
        return [...acc, {
          ...infoCountry.country,
          ...infoCountry.lastDate
        }]
      }, [])

      return (
        <Layout>
          <BasicTable data={aggregatedCountries} />
          <CountryList list={countriesAggregated} />
          <Link to="/page-2/">Go to page 2</Link>
        </Layout>
      )
    }
    }
  />
)

export default IndexPage
