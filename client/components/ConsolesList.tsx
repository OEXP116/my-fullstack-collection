import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  fetchAllConsoles,
  addConsole,
  updateConsole,
  deleteConsole,
} from '../apis/consolesApi';
import { GameConsole } from '../../models/consoles';

function ConsolesList() {
  const queryClient = useQueryClient();
  const { data: consoles, error, isLoading } = useQuery<GameConsole[]>({
    queryKey: ['consoles'],
    queryFn: fetchAllConsoles,
  });

  const [formData, setFormData] = useState<Omit<GameConsole, 'id'>>({
    name: '',
    manufacturer: '',
    release_year: undefined,
    region: '',
    color: '',
    storage_capacity: undefined,
    is_portable: false,
    has_online_support: false,
    supported_resolutions: [],
    price: undefined,
  });
  const [editingConsoleId, setEditingConsoleId] = useState<number | null>(null);

  const addConsoleMutation = useMutation<number, Error, Omit<GameConsole, 'id'>>({
    mutationFn: (consoleData) => addConsole(consoleData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['consoles'] });
      setFormData({
        name: '',
        manufacturer: '',
        release_year: undefined,
        region: '',
        color: '',
        storage_capacity: undefined,
        is_portable: false,
        has_online_support: false,
        supported_resolutions: [],
        price: undefined,
      });
    },
  });

  const updateConsoleMutation = useMutation<void, Error, GameConsole>({
    mutationFn: (console) => updateConsole(console.id, console),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['consoles'] });
      setFormData({
        name: '',
        manufacturer: '',
        release_year: undefined,
        region: '',
        color: '',
        storage_capacity: undefined,
        is_portable: false,
        has_online_support: false,
        supported_resolutions: [],
        price: undefined,
      });
      setEditingConsoleId(null);
    },
  });

  const deleteConsoleMutation = useMutation<void, Error, number>({
    mutationFn: (id) => deleteConsole(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['consoles'] }),
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingConsoleId) {
      updateConsoleMutation.mutate({ id: editingConsoleId, ...formData });
    } else {
      addConsoleMutation.mutate(formData);
    }
  };

  const handleEditClick = (console: GameConsole) => {
    setEditingConsoleId(console.id);
    setFormData(console);
  };

  const handleDeleteClick = (id: number) => {
    deleteConsoleMutation.mutate(id);
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Failed to load consoles</p>;

  return (
    <div>
      <h2>Game Console Collection</h2>
      <ul>
        {consoles?.map((console) => (
          <li key={console.id}>
            {console.name} ({console.manufacturer})
            <button onClick={() => handleEditClick(console)}>Update</button>
            <button onClick={() => handleDeleteClick(console.id)}>Delete</button>
          </li>
        ))}
      </ul>

      <h3>{editingConsoleId ? 'Edit Console' : 'Add New Console'}</h3>
      <form onSubmit={handleFormSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </label>
        {/* Add more form fields for other properties */}
        <button type="submit">{editingConsoleId ? 'Update Console' : 'Add Console'}</button>
        {editingConsoleId && (
          <button type="button" onClick={() => setEditingConsoleId(null)}>
            Cancel
          </button>
        )}
      </form>
    </div>
  );
}

export default ConsolesList;
