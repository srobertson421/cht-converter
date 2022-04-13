const { Deta } = require('deta');
const deta = Deta(process.env.DETA_PROJECT_KEY);
const db = deta.Base('ar2cht');

const categories = ['0-9','a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];

const handler = async (event) => {
  const category = event.queryStringParameters.category;

  if(!categories.includes(category)) {
    return {
      statusCode: 404,
      body: 'Category not found'
    }
  }

  let query = {'title?pfx': category.toUpperCase()}

  if(category === '0-9') {
    query = [
      {'title?pfx': '0'},
      {'title?pfx': '1'},
      {'title?pfx': '2'},
      {'title?pfx': '3'},
      {'title?pfx': '4'},
      {'title?pfx': '5'},
      {'title?pfx': '6'},
      {'title?pfx': '7'},
      {'title?pfx': '8'},
      {'title?pfx': '9'}
    ]
  }

  const { items } = await db.fetch(query);
  return {
    statusCode: 200,
    body: JSON.stringify(items)
  }
}

module.exports = { handler };