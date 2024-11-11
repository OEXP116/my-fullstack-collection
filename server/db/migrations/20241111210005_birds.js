/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
// export function up(knex) {
export const up = function (knex) {
  return knex.schema.createTable('birds', (table) => {
    table.integer('id').primary()
    table.string('name').notNullable()
    table.string('family')
    table.string('genus')
    table.string('region')
    table.string('color')
    table.integer('population')
    table.float('bill_size')
    table.boolean('is_endangered')
    table.boolean('is_round')
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = function (knex) {
  return knex.schema.dropTable('birds')
}
