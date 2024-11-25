import { GameConsoleData } from '../../models/consoles'
import db from './connection'


export async function getAllGameConsoles() {
  const consoles = await db('game_consoles').select(
    'id',
    'name',
    'region',
    'manufacturer',
    'release_year as releaseYear',
    'color',
    'storage_capacity as storageCapacity',
    'is_portable as isPortable',
    'has_online_support as hasOnlineSupport',
    'supported_resolutions as supportedResolutions',
    'price'
  )
  return consoles as GameConsoleData[]
}


export async function getGameConsoleById(id: number) {
  const console = await db('game_consoles')
    .where('id', id)
    .select(
      'id',
      'name',
      'region',
      'manufacturer',
      'release_year as releaseYear',
      'color',
      'storage_capacity as storageCapacity',
      'is_portable as isPortable',
      'has_online_support as hasOnlineSupport',
      'supported_resolutions as supportedResolutions',
      'price'
    )
    .first()
  return console as GameConsoleData
}

// export async function addGameConsole(consoleData: GameConsoleData) {
//   const result = await db('game_consoles').insert({
//     name: consoleData.name,
//     region: consoleData.region,
//     manufacturer: consoleData.manufacturer,
//     release_year: consoleData.release_year,
//     color: consoleData.color,
//     storage_capacity: consoleData.storage_capacity,
//     is_portable: consoleData.is_portable,
//     has_online_support: consoleData.has_online_support,
//     supported_resolutions: consoleData.supported_resolutions,
//     price: consoleData.price
//   })
//   return result[0] as number
// }

export async function addGameConsole(consoleData: GameConsoleData): Promise<number> {
  const [id] = await db('game_consoles').insert(consoleData);
  return id; // Returns the single ID
}



export async function updateGameConsoleById(id: number, consoleData: GameConsoleData) {
  const result = await db('game_consoles')
    .update({
      name: consoleData.name,
      region: consoleData.region,
      manufacturer: consoleData.manufacturer,
      release_year: consoleData.release_year,
      color: consoleData.color,
      storage_capacity: consoleData.storage_capacity,
      is_portable: consoleData.is_portable,
      has_online_support: consoleData.has_online_support,
      supported_resolutions: consoleData.supported_resolutions,
      price: consoleData.price
    })
    .where('id', id)
  return result
}


export async function deleteGameConsoleById(id: number) {
  const result = await db('game_consoles').where('id', id).delete()
  return result
}
