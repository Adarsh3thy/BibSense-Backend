const express = require('express')
const app = express()
const port =  3001

const rds_model = require('./rds_model')

app.use(express.json())
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers');
  next();
});

app.get('/', (req, res) => {
	  rds_model.getImgs()
	  .then(response => {
	    res.status(200).send(response);
	  })
	  .catch(error => {
	    res.status(500).send(error);
	  });
});

app.get('/:argument', (req, res) => {
	// console.log(`index bib: ` + req.params.argument)
  rds_model.queryImgs(req.params.argument)
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})


app.listen(process.env.PORT || port, () => {
  console.log(`App running on port ${port}.`)
})