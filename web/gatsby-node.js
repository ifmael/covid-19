async function createBlogPostPages(graphql, actions) {
  try {
    const { createPage } = actions;
    const path = require(`path`);
    const slash = require(`slash`);
    const dates = require('./src/assets/dates');
    const transformCountriesTimeSeries = require('./src/transform/time-series');

    let queryDates = ``;
    const cases = `confirmed deaths recovered`;
    dates.data.forEach(date => {
      queryDates += `${date.name} {
        ${cases}
      }
      `;
    });

    const query = `{
      allSanityTimeSeries {
        nodes {
          country {
            name
          }
          ${queryDates}
        }
      }
    }`;

    const result = await graphql(query)
    if (result.errors) {
      console.log("Error retrieving data from graphql api", result.errors);
      throw result.errors;
    }

    const countriesTimeSeries = transformCountriesTimeSeries(result.data.allSanityTimeSeries.nodes);
    const countryComponentPath = path.resolve('./src/templates/country.js');
    countriesTimeSeries.forEach(country => {
      const { name, ...datesInfo} = country;
      createPage({
        path: `/country/${country.name.toLowerCase().replace(' ','-').replace('*','')}`,
        component: slash(countryComponentPath),
        context: {
          name,
          datesInfo
        }
      })
    });

  } catch (error) {
    console.log(error);
  }

}

exports.createPages = async ({
  graphql,
  actions
}) => {
  await createBlogPostPages(graphql, actions)
}
