import { useState, useEffect } from 'react';
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
    release_year: '', 
    region: '',
    color: '',
    price: 0.00, 
  });
  const [editingConsoleId, setEditingConsoleId] = useState<number | null>(null);

  const addConsoleMutation = useMutation({
    mutationFn: addConsole,
    onSuccess: () => {
      queryClient.invalidateQueries(['consoles']);
      resetFormData();
    },
  });

  const updateConsoleMutation = useMutation({
    mutationFn: (console: GameConsole) => updateConsole(console.id, console),
    onSuccess: () => {
      queryClient.invalidateQueries(['consoles']);
      resetFormData();
      setEditingConsoleId(null);
    },
  });

  const deleteConsoleMutation = useMutation({
    mutationFn: deleteConsole,
    onSuccess: () => {
      queryClient.invalidateQueries(['consoles']);
    },
  });

  const resetFormData = () => {
    setFormData({
      name: '',
      manufacturer: '',
      release_year: '',
      region: '',
      color: '',
      price: 0.00,
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingConsoleId) {
      updateConsoleMutation.mutate({ id: editingConsoleId, ...formData });
    } else {
      addConsoleMutation.mutate(formData);
    }
  };

  const handleEditClick = (gameConsole: GameConsole) => {
    setEditingConsoleId(gameConsole.id);
    setFormData({
      name: gameConsole.name,
      manufacturer: gameConsole.manufacturer,
      release_year: gameConsole.release_year ?? '',
      region: gameConsole.region,
      color: gameConsole.color,
      price: gameConsole.price ?? 0.00
    });
    console.log(gameConsole.release_year)
  };

  const handleDeleteClick = (id: number) => {
    deleteConsoleMutation.mutate(id);
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading consoles.</p>;

  return (
    <div>
      <h2>Game Console Collection</h2>
      <ul>
        {consoles?.map((console) => (
          <li key={console.id}>
            {console.name} ({console.manufacturer})
            <button onClick={() => handleEditClick(console)}>Edit</button>
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
        <br />
        <label>
          Manufacturer:
          <input
            type="text"
            name="manufacturer"
            value={formData.manufacturer}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Release Year:
          <input
            type="text"
            name="release_year"
            value={formData.release_year}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Region:
          <input
            type="text"
            name="region"
            value={formData.region}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Color:
          <input
            type="text"
            name="color"
            value={formData.color}
            onChange={handleInputChange}
          />
        </label>
        
        <br />
        <label>
          Price (USD):
          <input
            type="text"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
          />
        </label>
        <br />
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
