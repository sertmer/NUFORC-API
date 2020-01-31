const environment = process.env.NODE_ENV || 'development'; // defines the environment for the server to run in - if we don't know, default to 'development'
const configuration = require('./knexfile')[environment]; //based on the environment, this gets the knex configuration file
const database = require('knex')(configuration); // connects the database 
const express = require('express'); // lets us use express  
const app = express(); // the instance of our express app

app.use(express.json()) // allows express to use and parse JSON data

app.set('port', process.env.PORT || 3000); // sets the port for the server to run on 
app.locals.title = 'NUFORC API'; // title of the api, stored in a temporary data storage obj that resets on server reset

app.get('/', (request, response) => {
  response.send('Welcome to NUFORC'); // get request route to localhost:3000/ to display on the browser
});

app.get('/api/v1/locations', async (req, res) => { // get route for all locations - defined as async to be non-blocking
  try { // if successful run try block
    const locations = await database('locations').select(); // waits for the database to return locations table, with all rows and columns
    res.status(200).json(locations) // sends a 200 (OK) status code and json'd locations 
  } catch(error) { // if error, run catch block
    res.status(500).json({ error }) // sends 500 (Internal server error) with the json'd error object
  }
})

app.get('/api/v1/locations/:id', async (req, res) => { // get route for specific location, async
  try { // if successful run try block
    const location = await database('locations') // waits for the selection of the locations table
      .where('id', req.params.id) // where the data in the id column matches the id coming through in the url
      .select(); // and selects that row
    if (location.length) { // if that location could be found
      res.status(200).json(location) // send 200 (ok) and the json'd location
    } else { // if no location found
      res.status(404).json({ // send 404 (not found) and json'd error
        error: `Could not find locations with id of ${req.params.id}.` // error specifically mentions what went wrong (no matching id)
      })
    }
  } catch(error) { // if server error 
    res.status(500).json({ error }) // send 500 (internal server error) and json'd error
  }
})

app.post('/api/v1/locations', async (req, res) => { // post new location route, async
  const location = req.body; // capture the body object (location to add to database)

  for (let requiredParameter of ['city', 'state']) { // loop through array of required parameter properties, assign each parameter to requiredParameter
    if (!location[requiredParameter]) { // if location does not have a either parameter
      return res.status(422).send( // send 422 (unprocessable entity) and error object
        {
          error: `expected format: { 
             city: <string>, state: <string> 
            }
            . You're missing the ${requiredParameter} property` //describes to the user which param is missing, and what is expected
        }
      )
    }
  }

  try { // if success run try block
    const id = await database('locations').insert(location, 'id') //  wait for the insertion of that location - returns the id of the posted location in an arry
    res.status(201).json(id[0]) // send 201 (ok) and json'd id of location posted
  } catch(error) { // run if error
    res.status(500).json({ error }) // sends 500 (internal server error) and json'd error object
  }
})

app.get('/api/v1/encounters', async (req, res) => { // route to get all encounters, async
  try { // if success run try block
    const encounters = await database('encounters').select(); // wait for the database to return the encounters table, all rows and columns
    res.status(200).json(encounters) // send 200 (ok) and json'd all encounters
  } catch(error) { // run if error
    res.status(500).json({ error }) // send 500 (internal server error) and json'd error object
  }
})

app.get('/api/v1/encounters/:id', async (req, res) => { // route to get specific encounter, async
  try { // run if success
    const encounter = await database('encounters') // wait for server to find encounter
    .where('id', req.params.id) // where the data in the id column matches the id that comes through in the url
    .select(); // and return it to us
    if (encounter.length) { // if there is an encounter
      res.status(200).json(encounter) // send 200 (ok) and json'd encounter
    } else { // if no encounter found
      res.status(404).json({ // send 404 (not found)
        error: `Could not find encounters with id of ${req.params.id}.` // and json'd error (no matching encounter found)
      })
    }
  } catch(error) { // run if error
    res.status(500).json({ error }) // send 500 (internal server error) and json'd error object
  }
})

app.post('/api/v1/encounters', async (req, res) => { // route to post new encounter, async
  const encounter = req.body; // capture body object (encounter to post)

  for (let requiredParameter of [
      'description',
      'shape',
      'duration',
      'report_link',
      'date_time',
      'date_posted',
      'location_id'
    ] // loop through array of required params, each time through, that param is assigned to variable 'requiredParameter'
  ) {
    if (!encounter[requiredParameter]) { // if the body object is missing any of the requirements...
      return res.status(422).send({ // send 422 (unprocessable entity)
          error: `expected format: {
            description: <string>, 
            shape: <string>, 
            duration: <string>, 
            report_link: <string>, 
            date_time: <string>, 
            date_posted: <string>, 
            location_id: <integer>
          }. You're missing the ${requiredParameter} property` // let the user know what they are missing
        }
      )
    }
  }

  try { // run if success
    const id = await database('encounters').insert(encounter, 'id') //wait for the insertion of the encounter - returns that encounter's id in array
    res.status(201).json(id[0]) // send 201 (ok), and json'd id
  } catch(error) { // run if error
    res.status(500).json({ error }) // send 500 (internal server error) and json'd error obj
  }
})

app.delete('/api/v1/encounters/:id', async (req, res) => { // route to delete specific encounter, async
  const { id } = req.params; // pull id out of url

  if (!id) { // if no id
    res.status(422).send({ error: 'Missing id in the url' }) // send 422 (unprocessable entity) and error object specifiying missing id
  }

  try { // run if success
    await database('encounters').where('id', id).del() // wait for database to locate encounter where id from url matches the id column, nuke it
    res.status(204).send() // send 204 (success, but nothing returned)
  } catch(error) { // run if error
    res.status(500).json({ error }) // send 500 (internal server error) and json'd error object
  }
})

app.listen(app.get('port'), () => { // tells express to listen for activity on port assigned on line 9
  console.log(
    `${app.locals.title} is running on http://localhost:${app.get('port')}.` // logs this message to the console
    );
});