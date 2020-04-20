import React from 'react'
import { Link, StaticQuery, graphql } from 'gatsby'
import Layout from '../components/layout'
import CountryList from '../components/country-list'

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
      }`
    }
    render ={ data => {
      const countriesAggregated = data.allSanityCountryInfoAggregated.nodes
      return (
        <Layout>
          <CountryList list={countriesAggregated} />
          <Link to="/page-2/">Go to page 2</Link>
        </Layout>
      )
    }
    }
  />
)

export default IndexPage
