const express = require('express');
const Joi = require('joi');

const app = express();

app.use(express.json());

app.get('/', (req,res) => {
  res.send('Hello World!');
});

app.post('/jeembo', (req, res) => {
const schema = {
  name: Joi.string().min(3).required()
}

const result = Joi.validate(req.body, schema);

if (result.error) {
  res.status(400).send(result.error.details[0].message);
  return
}

  res.send(req.body);
});


const port = process.env.PORT || 4200;
app.listen(port, () => console.log(`Listening on port ${port}...`));