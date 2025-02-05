import './App.css'
import { Router1 } from './Router'
import { RouterProvider } from 'react-router-dom'
function App() {
  return (
    <>
      <header><RouterProvider router={Router1} /></header>
    </>
  )
}
export default App
