const encountersData = require('../../../data/encountersData')

const createLocation = async (knex, location) => {
  const locationId = await knex('locations').insert({
    city: location.city,
    state: location.state
  }, 'id');

  let encounterPromises = location.encounters.map(encounter => {
    const {description, shape, duration, report_link, date_time, date_posted} = encounter
    return createEncounter(knex, {
      description,
      shape, 
      duration,
      report_link,
      date_time,
      date_posted,
      location_id: locationId[0]
    })
  });
  
  return Promise.all(encounterPromises)
};

const createEncounter = (knex, encounter) => {
  return knex('encounters').insert(encounter)
};

exports.seed = async function(knex) {
  try {
    await knex('encounters').del()
    await knex('locations').del()

    let locationPromises = encountersData.map(location => {
      return createLocation(knex, location)
    })

    return Promise.all(locationPromises)

  } catch (error) {
    console.log(`error seeding data: ${error}`)
  }
};
