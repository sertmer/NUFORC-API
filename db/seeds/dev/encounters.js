
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  try {
    await knex('encounters').del()
    await knex('locations').del()

    const locationId = await knex('locations').insert({
      city: 'Denver',
      state: 'CO'
    }, 'id')
    return knex('encounters').insert([
      {
        description: 'saw some weird lights',
        shape: 'lights',
        duration: '10 minutes',
        report_link: 'url.com',
        date_time: '12/12/12 12:00am',
        date_posted: 'today',
        location_id: locationId[0]
      }
    ])
  } catch (error) {
    console.log(`error seeding data: ${error}`)
  }
};
