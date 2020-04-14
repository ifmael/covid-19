(async () =>{
  try {
    const type = 'timeSeries';
    const sanityClient = require('@sanity/client');
    require('dotenv').config()
    const client = sanityClient({
      projectId: process.env.PROJECT_ID,
      dataset: process.env.DATASET,
      token: process.env.IMPORT_DATA_TOKEN, // or leave blank to be anonymous user
      useCdn: false // `false` if you want to ensure fresh data
    });


    // Get all the the countries id
    const query = `*[_type == '${type}' ]._id`;
    const typeIds = await client.fetch(query);

    //Create a transaction to delete all id in only one operation
    let transaction = client.transaction();
    typeIds.forEach( id => transaction.delete(id));
    const response = await transaction.commit();
    console.log(response)

  } catch (error) {
    console.log(error);
  }
})()
