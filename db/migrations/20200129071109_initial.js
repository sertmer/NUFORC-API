exports.up = function(knex) {
  return knex.schema
    .createTable('locations', table => {
      table.increments('id').primary();
      table.string('city');
      table.string('state');
  
      table.timestamps(true, true);
    })
    .createTable('encounters', table => {
      table.increments('id').primary();
      table.string('description');
      table.string('shape');
      table.string('duration');
      table.string('report_link');
      table.string('date_time');
      table.string('date_posted');
      table.integer('location_id').unsigned()
      table.foreign('location_id')
        .references('locations.id');
      table.timestamps(true, true);
    })
 };
  
 exports.down = function(knex) {
  return knex.schema
    .dropTable('encounters')
    .dropTable('locations')
 };
  
 
 