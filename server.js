const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);
const express = require('express');
const app = express();

app.use(express.json())

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
    const location = await database('locations')
      .where('id', req.params.id)
      .select();
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

app.post('/api/v1/locations', async (req, res) => {
  const location = req.body;

  for (let requiredParameter of ['city', 'state']) {
    if (!location[requiredParameter]) {
      return res.status(422).send(
        {
          error: `expected format: {
             city: <string>, state: <string> 
            }
            . You're missing the ${requiredParameter} property`
        }
      )
    }
  }

  try {
    const id = await database('locations').insert(location, 'id')
    res.status(201).json(id[0])
  } catch(error) {
    res.status(500).json({ error })
  }
})

app.get('/api/v1/locations', async (req, res) => {
  try {
    const locations = await database('locations').select();
    res.status(200).json(locations)
  } catch(error) {
    res.status(500).json({ error })
  }
})

app.get('/api/v1/encounters/:id', async (req, res) => {
  try {
    const encounter = await database('encounters')
    .where('id', req.params.id)
    .select();
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

app.post('/api/v1/encounters', async (req, res) => {
  const encounter = req.body;

  for (let requiredParameter of [
      'description',
      'shape',
      'duration',
      'report_link',
      'date_time',
      'date_posted',
      'location_id'
    ]
  ) {
    if (!encounter[requiredParameter]) {
      return res.status(422).send({
          error: `expected format: {
            description: <string>, 
            shape: <string>, 
            duration: <string>, 
            report_link: <string>, 
            date_time: <string>, 
            date_posted: <string>, 
            location_id: <integer>
          }. You're missing the ${requiredParameter} property`
        }
      )
    }
  }

  try {
    const id = await database('encounters').insert(encounter, 'id')
    res.status(201).json(id[0])
  } catch(error) {
    res.status(500).json({ error })
  }
})

app.delete('/api/v1/encounters/:id', async (req, res) => {
  const { id } = req.params;

  if (!id) {
    res.status(422).send({ error: 'Missing id in the url' })
  }

  try {
    await database('encounters').where('id', id).del()
    res.status(204).send()
  } catch(error) {
    res.status(500).json({ error })
  }
})

app.listen(app.get('port'), () => {
  console.log(
    `${app.locals.title} is running on http://localhost:${app.get('port')}.`
    );
});