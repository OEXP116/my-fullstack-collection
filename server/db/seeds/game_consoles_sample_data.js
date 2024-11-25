

export const seed = async function (knex) {
  
  await knex('game_consoles').del();

  
  await knex('game_consoles').insert([
    {
      name: 'PlayStation 5',
      manufacturer: 'Sony',
      release_year: 2020,
      region: 'Worldwide',
      color: 'White',
      price: 499.99,
    },
    {
      name: 'Xbox Series X',
      manufacturer: 'Microsoft',
      release_year: 2020,
      region: 'Worldwide',
      color: 'Black',
      price: 499.99,
    },
    {
      name: 'Nintendo Switch',
      manufacturer: 'Nintendo',
      release_year: 2017,
      region: 'Worldwide',
      color: 'Neon Red/Blue',
      price: 299.99,
    },
    {
      name: 'Xbox One S',
      manufacturer: 'Microsoft',
      release_year: 2016,
      region: 'Worldwide',
      color: 'White',
      price: 299.99,
    },
    {
      name: 'PlayStation 4 Pro',
      manufacturer: 'Sony',
      release_year: 2016,
      region: 'Worldwide',
      color: 'Jet Black',
      price: 399.99,
    },
  ]);
};
