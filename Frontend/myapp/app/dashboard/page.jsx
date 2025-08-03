'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function Dashboard() {
  const router = useRouter()
  const [tasks, setTasks] = useState([])
  const [taskInput, setTaskInput] = useState('')
  const [editingId, setEditingId] = useState(null)
  const [editingText, setEditingText] = useState('')

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn')
    if (isLoggedIn !== 'true') {
      router.push('/login')
    }
  }, [router])

  const addTask = () => {
    if (!taskInput.trim()) return
    setTasks([...tasks, { id: Date.now(), text: taskInput }])
    setTaskInput('')
  }

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id))
  }

  const startEditing = (id, currentText) => {
    setEditingId(id)
    setEditingText(currentText)
  }

  const saveEdit = () => {
    setTasks(tasks.map(task =>
      task.id === editingId ? { ...task, text: editingText } : task
    ))
    setEditingId(null)
    setEditingText('')
  }

  const cancelEdit = () => {
    setEditingId(null)
    setEditingText('')
  }

  const logout = () => {
    localStorage.removeItem('isLoggedIn')
    router.push('/login')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-100 to-blue-900 p-4">
      <div className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Your To-Do List</h1>
          <button onClick={logout} className="text-sm text-red-600 hover:underline">Logout</button>
        </div>

        <div className="flex gap-2 mb-4">
          <input
            type="text"
            value={taskInput}
            onChange={e => setTaskInput(e.target.value)}
            placeholder="Enter a task"
            className="flex-1 border p-2 rounded"
          />
          <button onClick={addTask} className="bg-blue-600 text-white px-4 rounded hover:bg-blue-700">Add</button>
        </div>

        <ul className="space-y-2">
          {tasks.map(task => (
            <li key={task.id} className="flex justify-between items-center bg-gray-100 p-2 rounded">
              {editingId === task.id ? (
                <input
                  type="text"
                  value={editingText}
                  onChange={e => setEditingText(e.target.value)}
                  className="flex-1 mr-2 p-1 border rounded"
                />
              ) : (
                <span className="flex-1">{task.text}</span>
              )}

              {editingId === task.id ? (
                <>
                  <button onClick={saveEdit} className="text-green-600 hover:underline mx-1">Save</button>
                  <button onClick={cancelEdit} className="text-gray-600 hover:underline">Cancel</button>
                </>
              ) : (
                <>
                  <button onClick={() => startEditing(task.id, task.text)} className="text-yellow-600 hover:underline mx-1">Edit</button>
                  <button onClick={() => deleteTask(task.id)} className="text-red-600 hover:underline">Delete</button>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
