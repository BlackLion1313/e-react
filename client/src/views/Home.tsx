import React from 'react'
import { Button } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'

type Props = {}

function Home({}: Props) {
  return (
    <>
    <NavLink className='mx-4' to='/exercises'>Exercises</NavLink>
    <Button className='mx-4' variant="primary">Logout</Button>
    <Button className='mx-4' variant="danger">Delete Account</Button>
    <NavLink className='mx-4' to='/login'>
      Login
    </NavLink>
    <NavLink className='mx-4' to='/register'>
      Register
    </NavLink>
    <NavLink className='mx-4' to='/profile'>
     Profile
    </NavLink>
  
  </>
  ) 
}

export default Home