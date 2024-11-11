/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('birds').del()
  await knex('birds').insert([
    {
      name: 'Kiwi',
      family: 'Apterygidae',
      genus: 'Apteryx',
      region: 'NZ',
      color: 'brown',
      population: 68000,
      bill_size: 45,
      is_endangered: true,
      is_round: true,
    },
    {
      name: 'Kea',
    },
    {
      name: 'Pekapeka',
    },
    {
      name: 'Pīwakawaka',
    },
    {
      name: 'Kereru',
    },
    {
      name: 'Pukeko',
    },
    {
      name: 'Tui',
    },
    {
      name: 'Karearea',
    },
  ])
}
