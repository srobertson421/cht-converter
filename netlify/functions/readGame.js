const { Deta } = require('deta');
const deta = Deta(process.env.DETA_PROJECT_KEY);
const db = deta.Base('ar2cht');

const handler = async (event) => {
  const gameId = event.queryStringParameters.id;

  if(!gameId) {
    return {
      statusCode: 500,
      body: 'Missing game id'
    }
  }

  const game = await db.get(gameId);
  return {
    statusCode: 200,
    body: JSON.stringify(game)
  }
}

module.exports = { handler };