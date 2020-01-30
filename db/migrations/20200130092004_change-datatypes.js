exports.up = function(knex) {
  return knex.schema.alterTable('encounters', (table) => {
    table.text('description').alter();
  })
  
 };
  
 exports.down = function(knex) {
  return knex.schema.alterTable('encounters', (table) => {
    table.string('description').alter();
  })
    
 };
  
 
 