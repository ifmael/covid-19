async function createBlogPostPages(graphql, actions) {
  const {
    createPage
  } = actions;

  try {
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

/*     countriesTimeSeries.forEach(country => {
      createPage({
        path: `/country/${country.name.toLocaleLowerCase().replace(' ','-')}`,
        component: slash(countryComponentPath),
        context:{
          country: country,
        }
      })
    }); */



  } catch (error) {
    console.log(error);
  }

}

exports.createPages = async ({graphql, actions}) => {
  await createBlogPostPages(graphql, actions)
}
