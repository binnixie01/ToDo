import { useEffect, useState } from 'react'


import { TodoProvider, useTodo } from './contexts'
import Form from './components/Form'
import TodoItem from './components/TodoItem'
import {NextUIProvider} from "@nextui-org/react";

function App() {
  const [todos, setTodos] = useState([])
  const addTodo = (todo) => {
    setTodos((prev) => ([...prev, { id: Date.now(), ...todo }]))
  }
  const updateTodo = (id, todo) => { setTodos((prev) => (prev.map((prevTodo) => (prevTodo.id === id ? todo : prevTodo)))) }
  const deleteTodo = (id) => { setTodos((prev) => (prev.filter((prevTodo) => (prevTodo.id !== id)))) }
  const toggleComplete = (id) => { setTodos((prev) => prev.map((todo) => todo.id === id ? { ...todo, completed: !todo.completed } : todo)) }

  // To get todos stored in local storage and show it on load
  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem('todos'))
    if (storedTodos && storedTodos.length > 0) {
      setTodos(storedTodos)
    }
  }, [])

  // to set or update items when todos change
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos])

  return (
    <NextUIProvider>
    <TodoProvider value={{ todos, addTodo, updateTodo, deleteTodo, toggleComplete }}>
      <div className="min-h-screen py-8">
        <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
          <h1 className="text-2xl font-bold text-center mb-8 mt-2">Manage Your Todos</h1>
          <div className="mb-4">
            <Form submitTodo={addTodo} />
          </div>
          <div className="flex flex-wrap gap-y-3">
            {todos.map((todo) => (<TodoItem key={todo.id} todo={todo} toggleComplete={toggleComplete}
              updateTodo={updateTodo} deleteTodo={deleteTodo}
            />))}
          </div>
        </div>
      </div>
    </TodoProvider>
    </NextUIProvider>
  )
}

export default App
