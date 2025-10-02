import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg';
import './App.css';

import  NavBar  from './Components/navBar/NavBar';
import Banner from './Components/banner/Banner';


function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='App'>
      <NavBar className="navBar"/>
       <Banner clasName="Banner"/>
    </div>
  )
}

export default App
