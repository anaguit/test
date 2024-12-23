import { useState } from 'react'
import './App.css'
import { LoginForm } from './components/loginForm'
import { TasksForm } from './components/TasksForm'
import { TaskList } from './components/TasksList' 
import { Dashboard } from './components/Dashboard'
import { Route, Routes } from 'react-router-dom'

function App() {
  return (
    <Routes>
      {/* Ruta raíz */}
      <Route path="/" element={<LoginForm />} />
      {/* Ruta lista tareas */}
      <Route path="/tasksList" element={<TaskList />} />
      {/* Ruta para crear tarea */}
      <Route path="/createTasks" element={<TasksForm />} />
      {/* Ruta para el Dashboard */}
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );   
}

export default App
