const { Deta } = require('deta');
const deta = Deta(process.env.DETA_PROJECT_KEY);
const db = deta.Base('ar2cht');

const handler = async (event) => {
  const { items } = await db.fetch();
  return {
    statusCode: 200,
    body: JSON.stringify(items)
  }
}

module.exports = { handler };