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

    const parseData = JSON.parse(fileData);
    parseData.count += 10;

    const writeResult = await new Promise((resolve, reject) => {
      fs.writeFile(path.join(__dirname, 'test.json'), JSON.stringify(parseData), err => {
        if(err) {
          console.log(err);
          reject(err);
        }

        resolve(true);
      });
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ message: `Wrote to test.json, incremented by 10` }),
    }
  } catch (error) {
    return { statusCode: 500, body: error.toString() }
  }
}

module.exports = { handler }
