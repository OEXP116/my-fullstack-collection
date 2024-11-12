
import { Bird, BirdData } from '../../models/birds'


const BASE_URL = '/api/birds'


export async function fetchAllBirds(): Promise<Bird[]> {
  const response = await fetch(BASE_URL)
  if (!response.ok) throw new Error('Failed to fetch birds')
  return response.json()
}


export async function fetchBirdById(id: number): Promise<Bird> {
  const response = await fetch(`${BASE_URL}/${id}`)
  if (!response.ok) throw new Error('Failed to fetch bird')
  return response.json()
}


export async function addBird(birdData: BirdData): Promise<number> {
  const response = await fetch(BASE_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(birdData),
  })
  if (!response.ok) throw new Error('Failed to add bird')
  const result = await response.json()
  return result.id
}


export async function updateBird(id: number, birdData: BirdData): Promise<void> {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(birdData),
  })
  if (!response.ok) throw new Error('Failed to update bird')
}


export async function deleteBird(id: number): Promise<void> {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: 'DELETE',
  })
  if (!response.ok) throw new Error('Failed to delete bird')
}
