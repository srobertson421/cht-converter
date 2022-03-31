const fs = require('fs');
const path = require('path');

const handler = async (event) => {
  try {
    const fileData = await new Promise((resolve, reject) => {
      fs.readFile(path.join(__dirname, 'test.json'), 'utf8', (err, data) => {
        if(err) {
          console.log(err);
          reject(err);
        }
  
        resolve(data);
      });
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ message: `Count is: ${JSON.parse(fileData).count}` }),
    }
  } catch (error) {
    return { statusCode: 500, body: error.toString() }
  }
}

module.exports = { handler }
