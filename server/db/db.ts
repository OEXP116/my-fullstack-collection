import { GameConsoleData } from '../../models/gameConsoles'
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

export async function addGameConsole(consoleData: GameConsoleData) {
  const result = await db('game_consoles').insert({
    name: consoleData.name,
    region: consoleData.region,
    manufacturer: consoleData.manufacturer,
    release_year: consoleData.releaseYear,
    color: consoleData.color,
    storage_capacity: consoleData.storageCapacity,
    is_portable: consoleData.isPortable,
    has_online_support: consoleData.hasOnlineSupport,
    supported_resolutions: consoleData.supportedResolutions,
    price: consoleData.price
  })
  return result[0] as number
}


export async function updateGameConsoleById(id: number, consoleData: GameConsoleData) {
  const result = await db('game_consoles')
    .update({
      name: consoleData.name,
      region: consoleData.region,
      manufacturer: consoleData.manufacturer,
      release_year: consoleData.releaseYear,
      color: consoleData.color,
      storage_capacity: consoleData.storageCapacity,
      is_portable: consoleData.isPortable,
      has_online_support: consoleData.hasOnlineSupport,
      supported_resolutions: consoleData.supportedResolutions,
      price: consoleData.price
    })
    .where('id', id)
  return result
}


export async function deleteGameConsoleById(id: number) {
  const result = await db('game_consoles').where('id', id).delete()
  return result
}
