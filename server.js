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

app.get('/api/v1/locations', async (req, res) => {
  try {
    const locations = await database('locations').select();
    res.status(200).json(locations)
  } catch(error) {
    res.status(500).json({ error })
  }
})

app.get('/api/v1/locations/:id', async (req, res) => {
  try {
    const location = await database('locations').where('id', req.params.id).select();
    if (location.length) {
      res.status(200).json(location)
    } else {
      res.status(404).json({
        error: `Could not find locations with id of ${req.params.id}.`
      })
    }
  } catch(error) {
    res.status(500).json({ error })
  }
})

app.get('/api/v1/encounters', async (req, res) => {
  try {
    const encounters = await database('encounters').select();
    res.status(200).json(encounters)
  } catch(error) {
    res.status(500).json({ error })
  }
})

app.get('/api/v1/encounters/:id', async (req, res) => {
  try {
    const encounter = await database('encounters').where('id', req.params.id).select();
    if (encounter.length) {
      res.status(200).json(encounter)
    } else {
      res.status(404).json({
        error: `Could not find encounters with id of ${req.params.id}.`
      })
    }
  } catch(error) {
    res.status(500).json({ error })
  }
})


app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on http://localhost:${app.get('port')}.`);
});