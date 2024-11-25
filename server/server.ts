import * as Path from 'node:path';
import express, { Request, Response } from 'express';


import { GameConsole, GameConsoleData } from '../models/consoles';



// Import database functions for consoles
import {
  getAllGameConsoles,
  getGameConsoleById,
  addGameConsole,
  updateGameConsoleById,
  deleteGameConsoleById,
} from '../server/db/db.ts';

const server = express();
server.use(express.json());



// Game Console Routes
server.get('/api/consoles', async (req: Request, res: Response) => {
  try {
    const consoles = await getAllGameConsoles();
    res.json(consoles);
  } catch (error) {
    console.error('Error fetching consoles:', error);
    res.status(500).json({ error: 'Failed to fetch consoles' });
  }
});

server.get('/api/consoles/:id', async (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10);
  try {
    const console = await getGameConsoleById(id);
    if (console) {
      res.json(console);
    } else {
      res.status(404).json({ error: 'Console not found' });
    }
  } catch (error) {
    console.error(`Error fetching console with ID ${id}:`, error);
    res.status(500).json({ error: 'Failed to fetch console' });
  }
});

// server.post('/api/consoles', async (req: Request, res: Response) => {
//   const consoleData: GameConsoleData = req.body;
//   try {
//     const [newConsoleId] = await addGameConsole(consoleData);
//     res.status(201).json({ id: newConsoleId });
//   } catch (error) {
//     console.error('Error adding console:', error);
//     res.status(500).json({ error: 'Failed to add console' });
//   }
// });

server.post('/api/consoles', async (req: Request, res: Response) => {
  const consoleData: GameConsoleData = req.body;

  // Validate required fields
  if (!consoleData.name) {
    return res.status(400).json({ error: 'Name is required' });
  }

  try {
    const result = await addGameConsole(consoleData);
    const newConsoleId = Array.isArray(result) ? result[0] : result; // Handles array or single value
    res.status(201).json({ id: newConsoleId });
  } catch (error) {
    console.error('Error adding console:', error);
    res.status(500).json({ error: 'Failed to add console' });
  }
});


server.put('/api/consoles/:id', async (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10);
  const consoleData: GameConsole = { id, ...req.body };
  try {
    const updateCount = await updateGameConsoleById(id, consoleData);
    if (updateCount) {
      res.json({ message: 'Console updated successfully' });
    } else {
      res.status(404).json({ error: 'Console not found' });
    }
  } catch (error) {
    console.error(`Error updating console with ID ${id}:`, error);
    res.status(500).json({ error: 'Failed to update console' });
  }
});

server.delete('/api/consoles/:id', async (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10);
  try {
    const deleteCount = await deleteGameConsoleById(id);
    if (deleteCount) {
      res.json({ message: 'Console deleted successfully' });
    } else {
      res.status(404).json({ error: 'Console not found' });
    }
  } catch (error) {
    console.error(`Error deleting console with ID ${id}:`, error);
    res.status(500).json({ error: 'Failed to delete console' });
  }
});

// Serve static files in production
if (process.env.NODE_ENV === 'production') {
  server.use(express.static(Path.resolve('public')));
  server.use('/assets', express.static(Path.resolve('./dist/assets')));
  server.get('*', (req, res) => {
    res.sendFile(Path.resolve('./dist/index.html'));
  });
}

export default server;
