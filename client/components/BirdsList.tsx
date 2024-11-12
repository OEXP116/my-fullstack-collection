
import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { fetchAllBirds, addBird, updateBird, deleteBird } from '../apis/birdsApi'
import { Bird, BirdData } from '../../models/birds'

function BirdsList() {
  const queryClient = useQueryClient()
  const { data: birds, error, isLoading } = useQuery<Bird[]>({
    queryKey: ['birds'],
    queryFn: fetchAllBirds,
  })

  const [formData, setFormData] = useState<BirdData>({ name: '', region: '' })
  const [editingBirdId, setEditingBirdId] = useState<number | null>(null)

  
  const addBirdMutation = useMutation<number, Error, BirdData>({
    mutationFn: (birdData: BirdData) => addBird(birdData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['birds'] })
      setFormData({ name: '', region: '' })
    },
  })

  
  const updateBirdMutation = useMutation<void, Error, Bird>({
    mutationFn: (bird: Bird) => updateBird(bird.id, bird),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['birds'] })
      setFormData({ name: '', region: '' })
      setEditingBirdId(null)
    },
  })

  
  const deleteBirdMutation = useMutation<void, Error, number>({
    mutationFn: (id: number) => deleteBird(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['birds'] }),
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (editingBirdId) {
      updateBirdMutation.mutate({ id: editingBirdId, ...formData })
    } else {
      addBirdMutation.mutate(formData)
    }
  }

  const handleEditClick = (bird: Bird) => {
    setEditingBirdId(bird.id)
    setFormData({ name: bird.name, region: bird.region })
  }

  const handleDeleteClick = (id: number) => {
    deleteBirdMutation.mutate(id)
  }

  if (isLoading) return <p>Loading...</p>
  if (error) return <p>Failed to load birds</p>

  return (
    <div>
      <h2>Bird Collection</h2>
      <ul>
        {birds?.map((bird) => (
          <li key={bird.id}>
            {bird.name} - {bird.region}
            <button onClick={() => handleEditClick(bird)}>Update</button>
            <button onClick={() => handleDeleteClick(bird.id)}>Delete</button>
          </li>
        ))}
      </ul>

      <h3>{editingBirdId ? 'Edit Bird' : 'Add New Bird'}</h3>
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
        <label>
          Region:
          <input
            type="text"
            name="region"
            value={formData.region}
            onChange={handleInputChange}
            required
          />
        </label>
        <button type="submit">{editingBirdId ? 'Update Bird' : 'Add Bird'}</button>
        {editingBirdId && (
          <button type="button" onClick={() => setEditingBirdId(null)}>
            Cancel
          </button>
        )}
      </form>
    </div>
  )
}

export default BirdsList
