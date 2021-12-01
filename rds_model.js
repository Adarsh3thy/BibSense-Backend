const { Pool, Client } = require('pg')
const pool = new Pool({
  user: 'bibsense',
  host: 'team11bibsense.ckmsibai0sqs.us-east-2.rds.amazonaws.com',
  database: 'bib_sense',
  password: 'bibsense',
  port: 5432
});

pool.query('SELECT NOW()', (err, res) => {
  if (err) console.log(err, res);
  pool.end()
});

const client = new Client({
  user: 'bibsense',
  host: 'team11bibsense.ckmsibai0sqs.us-east-2.rds.amazonaws.com',
  database: 'bib_sense',
  password: 'bibsense',
  port: 5432
});

client.connect(function(err) {
  client.query('SELECT NOW()', (err, res) => {
    if (err) console.log(err, res);
    console.log("Connected!");
  });
});

const getImgs = () => {
  return new Promise(function(resolve, reject) {
    client.query('SELECT * FROM img_info;', (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(results.rows);
      })
  })
}

const query = 'SELECT img_name AS name, img_link FROM img_info WHERE bib_number = $1;'

const queryImgs = (req, res) => {
  const argument = parseInt(req, 10)
  return new Promise(function(resolve, reject) {
    client.query(query, [argument], (error, results) => {
      if (error) {
        reject(error)
        return
      }
      if (results === undefined) {
        reject("undefined results")
        return
      }
      resolve(results.rows);
    })
  })
}

module.exports = {
  getImgs,
  queryImgs,
}
