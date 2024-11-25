export const up = function (knex) {
  return knex.schema.createTable('game_consoles', (table) => {
    table.increments('id').primary(); 
    table.string('name').notNullable();
    table.string('manufacturer'); 
    table.string('release_year');
    table.string('region');
    table.string('color');
    table.float('price');
  });
};

export const down = function (knex) {
  return knex.schema.dropTable('game_consoles');
};
