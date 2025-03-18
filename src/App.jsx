// import { useEffect, useState } from 'react'

// function App() {
//   const [show, setShow] = useState(true);

//   return (
//     <div>
//       <button onClick={() => setShow(!show)}>Toggle Component</button>
//       {show && <ChildComponent />}
//     </div>
//   );
// }
// function ChildComponent() {
//   useEffect(() => {
//     console.log("Mounted");

//     return () => {
//       console.log("Unmounted");
//     };
//   }, []);

//   return <div>I'm the child component</div>;
// }

// export default App

import React from 'react'
import Login from './Pages/Login'
import Home from './Pages/Home'
import './App.css'
import { Route, Routes } from "react-router-dom";
import Profile from './Pages/Profile';
const App = () => {
  return (
    <div className=' flex justify-center'>
          <Routes>
          <Route index element={<Login />} />
          <Route path='/home' element={<Home />} />
          <Route path='/profile' element={<Profile />} />
          </Routes>
    </div>
  )
}

export default App