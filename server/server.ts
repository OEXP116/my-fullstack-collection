import * as Path from 'node:path'

import express from 'express'
import { Request, Response } from 'express'

import { Bird, BirdData } from '../models/birds'

import { getAllBirds, getBirdById, addBird, updateBirdById, deleteBirdById } from '../server/db/db'



const server = express()
server.use(express.json())





server.get('/api/birds', async (req: Request, res: Response) => {
  try {
    const birds = await getAllBirds()
    res.json(birds)
  } catch (error) {
    console.error('Error fetching birds:', error)
    res.status(500).json({ error: 'Failed to fetch birds' })
  }
})


server.get('/api/birds/:id', async (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10)
  try {
    const bird = await getBirdById(id)
    if (bird) {
      res.json(bird)
    } else {
      res.status(404).json({ error: 'Bird not found' })
    }
  } catch (error) {
    console.error(`Error fetching bird with ID ${id}:`, error)
    res.status(500).json({ error: 'Failed to fetch bird' })
  }
})


server.post('/api/birds', async (req: Request, res: Response) => {
  const birdData: BirdData = req.body
  try {
    const [newBirdId] = await addBird(birdData)
    res.status(201).json({ id: newBirdId })
  } catch (error) {
    console.error('Error adding bird:', error)
    res.status(500).json({ error: 'Failed to add bird' })
  }
})


server.put('/api/birds/:id', async (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10)
  const birdData: Bird = { id, ...req.body }
  try {
    const updateCount = await updateBirdById(id, birdData)
    if (updateCount) {
      res.json({ message: 'Bird updated successfully' })
    } else {
      res.status(404).json({ error: 'Bird not found' })
    }
  } catch (error) {
    console.error(`Error updating bird with ID ${id}:`, error)
    res.status(500).json({ error: 'Failed to update bird' })
  }
})


server.delete('/api/birds/:id', async (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10)
  try {
    const deleteCount = await deleteBirdById(id)
    if (deleteCount) {
      res.json({ message: 'Bird deleted successfully' })
    } else {
      res.status(404).json({ error: 'Bird not found' })
    }
  } catch (error) {
    console.error(`Error deleting bird with ID ${id}:`, error)
    res.status(500).json({ error: 'Failed to delete bird' })
  }
})





if (process.env.NODE_ENV === 'production') {
  server.use(express.static(Path.resolve('public')))
  server.use('/assets', express.static(Path.resolve('./dist/assets')))
  server.get('*', (req, res) => {
    res.sendFile(Path.resolve('./dist/index.html'))
  })
}

export default server
