const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);
const express = require('express');
const app = express();

app.set('port', process.env.PORT || 3000);
app.locals.title = 'NUFORC API';

app.get('/', (request, response) => {
  response.send('Welcome to NUFORC');
});

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on http://localhost:${app.get('port')}.`);
});