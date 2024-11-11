import { Bird, BirdData } from '../../models/birds'
import db from './connection'

// Read - All
export async function getAllBirds() {
  const birds = await db('birds').select(
    'id',
    'name',
    'family',
    'genus',
    'region',
    'color',
    'population',
    'bill_size as billSize',
    'is_endangered as isEndangered',
    'is_round as isRound',
  )
  // console.log(birds)
  return birds as Bird[]
}

// Read - One
export async function getBirdById(id: number) {
  const bird = await db('birds')
    .where('id', id)
    .select(
      'id',
      'name',
      'family',
      'genus',
      'region',
      'color',
      'population',
      'bill_size as billSize',
      'is_endangered as isEndangered',
      'is_round as isRound',
    )
    .first()
  // console.log(birds)
  return bird as Bird
}

// Create
export async function addBird(bird: BirdData) {
  const result = await db('birds').insert({
    name: bird.name,
    family: bird.family,
    genus: bird.genus,
    region: bird.region,
    color: bird.color,
    population: bird.population,
    bill_size: bird.billSize,
    is_endangered: bird.isEndangered,
    is_round: bird.isRound,
  })
  // console.log(birds)
  return result as number[]
}

export async function addBirdDestructure({
  name,
  family,
  genus,
  region,
  color,
  population,
  billSize,
  isEndangered,
  isRound,
}: BirdData) {
  const result = await db('birds').insert({
    name,
    family,
    genus,
    region,
    color,
    population,
    bill_size: billSize,
    is_endangered: isEndangered,
    is_round: isRound,
  })
  // console.log(birds)
  return result as number[]
}

// Update
// export async function updateBirdPopulationById(id number, bird: Bird){
//   const result = await db('birds').update({
//     population: bird.population
//   })
// }

export async function updateBirdById(id: number, bird: Bird) {
  const result = await db('birds')
    .update({
      name: bird.name,
      family: bird.family,
      genus: bird.genus,
      region: bird.region,
      colour: bird.color,
      population: bird.population,
      bill_size: bird.billSize,
      is_endangered: bird.isEndangered,
      is_round: bird.isRound,
    })
    .where('id', id)
  // console.log(birds)
  return result as number
}

// Delete
export async function deleteBirdById(id: number) {
  const result = await db('birds').where('id', id).delete()
  // console.log(birds)
  return result as number
}
