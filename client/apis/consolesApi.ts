import { GameConsole } from '../../models/consoles';

const BASE_URL = '/api/consoles';

export async function fetchAllConsoles(): Promise<GameConsole[]> {
  const response = await fetch(BASE_URL);
  if (!response.ok) throw new Error('Failed to fetch consoles');
  return response.json();
}

export async function fetchConsoleById(id: number): Promise<GameConsole> {
  const response = await fetch(`${BASE_URL}/${id}`);
  if (!response.ok) throw new Error('Failed to fetch console');
  return response.json();
}

export async function addConsole(consoleData: Omit<GameConsole, 'id'>): Promise<number> {
  const response = await fetch(BASE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(consoleData),
  });
  if (!response.ok) throw new Error('Failed to add console');
  const result = await response.json();
  return result.id;
}

export async function updateConsole(id: number, consoleData: Omit<GameConsole, 'id'>): Promise<void> {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(consoleData),
  });
  if (!response.ok) throw new Error('Failed to update console');
}

export async function deleteConsole(id: number): Promise<void> {
  const response = await fetch(`${BASE_URL}/${id}`, { method: 'DELETE' });
  if (!response.ok) throw new Error('Failed to delete console');
}
