import express from 'express'
import {
  getAllGameConsoles,
  getGameConsoleById,
  addGameConsole,
  updateGameConsoleById,
  deleteGameConsoleById,
} from '../db/db'
import { GameConsole } from '../../models/consoles'

const router = express.Router()

// GET /api/consoles - Fetch all consoles
router.get('/', async (req, res) => {
  try {
    const consoles = await getAllGameConsoles()
    res.json(consoles)
  } catch (error) {
    console.error('Error fetching consoles:', error)
    res.status(500).json({ error: 'Failed to fetch consoles' })
  }
})

// GET /api/consoles/:id - Fetch a console by ID
router.get('/:id', async (req, res) => {
  const id = parseInt(req.params.id, 10)
  try {
    const console = await getGameConsoleById(id)
    if (console) {
      res.json(console)
    } else {
      res.status(404).json({ error: 'Console not found' })
    }
  } catch (error) {
    console.error(`Error fetching console with ID ${id}:`, error)
    res.status(500).json({ error: 'Failed to fetch console' })
  }
})

// POST /api/consoles - Add a new console
router.post('/', async (req, res) => {
  const consoleData: Omit<GameConsole, 'id'> = req.body
  try {
    const newConsoleId = await addGameConsole(consoleData)
    res.status(201).json({ id: newConsoleId })
  } catch (error) {
    console.error('Error adding console:', error)
    res.status(500).json({ error: 'Failed to add console' })
  }
})

// PUT /api/consoles/:id - Update a console by ID
router.put('/:id', async (req, res) => {
  const id = parseInt(req.params.id, 10)
  const consoleData: GameConsole = { id, ...req.body }
  try {
    const updateCount = await updateGameConsoleById(id, consoleData)
    if (updateCount) {
      res.json({ message: 'Console updated successfully' })
    } else {
      res.status(404).json({ error: 'Console not found' })
    }
  } catch (error) {
    console.error(`Error updating console with ID ${id}:`, error)
    res.status(500).json({ error: 'Failed to update console' })
  }
})

// DELETE /api/consoles/:id - Delete a console by ID
router.delete('/:id', async (req, res) => {
  const id = parseInt(req.params.id, 10)
  try {
    const deleteCount = await deleteGameConsoleById(id)
    if (deleteCount) {
      res.json({ message: 'Console deleted successfully' })
    } else {
      res.status(404).json({ error: 'Console not found' })
    }
  } catch (error) {
    console.error(`Error deleting console with ID ${id}:`, error)
    res.status(500).json({ error: 'Failed to delete console' })
  }
})

export default router
