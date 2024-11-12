

export const seed = async function (knex) {
  
  await knex('game_consoles').del();

  
  await knex('game_consoles').insert([
    {
      name: 'PlayStation 5',
      manufacturer: 'Sony',
      release_year: 2020,
      region: 'Worldwide',
      color: 'White',
      storage_capacity: 825,
      is_portable: false,
      has_online_support: true,
      supported_resolutions: ['1080p', '1440p', '4K'],
      price: 499.99,
    },
    {
      name: 'Xbox Series X',
      manufacturer: 'Microsoft',
      release_year: 2020,
      region: 'Worldwide',
      color: 'Black',
      storage_capacity: 1000,
      is_portable: false,
      has_online_support: true,
      supported_resolutions: ['1080p', '1440p', '4K', '8K'],
      price: 499.99,
    },
    {
      name: 'Nintendo Switch',
      manufacturer: 'Nintendo',
      release_year: 2017,
      region: 'Worldwide',
      color: 'Neon Red/Blue',
      storage_capacity: 32,
      is_portable: true,
      has_online_support: true,
      supported_resolutions: ['720p', '1080p'],
      price: 299.99,
    },
    {
      name: 'Xbox One S',
      manufacturer: 'Microsoft',
      release_year: 2016,
      region: 'Worldwide',
      color: 'White',
      storage_capacity: 500,
      is_portable: false,
      has_online_support: true,
      supported_resolutions: ['1080p', '4K'],
      price: 299.99,
    },
    {
      name: 'PlayStation 4 Pro',
      manufacturer: 'Sony',
      release_year: 2016,
      region: 'Worldwide',
      color: 'Jet Black',
      storage_capacity: 1000,
      is_portable: false,
      has_online_support: true,
      supported_resolutions: ['1080p', '4K'],
      price: 399.99,
    },
  ]);
};
