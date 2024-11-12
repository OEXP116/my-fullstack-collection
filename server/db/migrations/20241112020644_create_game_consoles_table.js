export const up = function (knex) {
  return knex.schema.createTable('game_consoles', (table) => {
    table.increments('id').primary(); 
    table.string('name').notNullable();
    table.string('manufacturer'); 
    table.integer('release_year');
    table.string('region');
    table.string('color');
    table.integer('storage_capacity');
    table.boolean('is_portable');
    table.boolean('has_online_support');
    table.specificType('supported_resolutions', 'text[]'); 
    table.float('price');
  });
};

export const down = function (knex) {
  return knex.schema.dropTable('game_consoles');
};
