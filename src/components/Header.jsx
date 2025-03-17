import React from 'react'
import {Link} from 'react-router-dom'

const Header = () => {
  return (
  <div className='flex gap-5'>
  
           <Link to={'/home'}>Home</Link>
           <Link to={'/profile'}>Profile</Link>
           </div>
  )
}

export default Header