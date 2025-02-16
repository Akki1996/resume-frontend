
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import './App.css'
import 'antd/dist/reset.css';
import { lazy, Suspense } from 'react'
import MainRoute from './MainRoute'

function App() {
  return (
   <MainRoute/>
  )
}

export default App
