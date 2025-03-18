import React from 'react'
import {Link} from 'react-router-dom'
import Header from '../components/Header'
import Search from '../components/Search'
const Home = () => {



  return (
    <div>
      <Header/><br/>
      <div>Home</div>
      <Search/>
      {/* <Link to={'/home'}>Home</Link>
      <Link to={'/profile'}>Profile</Link> */}
    </div>
  )
}

export default Home