// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
 import './App.css'
import Homee from './component/Homee'
import { Router1 } from './Router'
import { RouterProvider } from 'react-router'



function App()
{
  return (
    <>
   <Homee></Homee>
    <RouterProvider router={Router1}/>
   
    </>
  )
}
export default App
