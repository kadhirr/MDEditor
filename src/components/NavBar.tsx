import React from 'react'
import {FaPlus} from 'react-icons/fa'
import { Link } from "react-router-dom";

type Props =  {
  showNewButton: boolean;
}


const NavBar = ({showNewButton}:Props) => {
  return (
          <div className="flex bg-lime-500 h-[10vh] items-center mb-5">
              <Link to={'/'} className="font-mono text-3xl pl-5">MDEditor</Link>
              {showNewButton ? <Link to={'/edit'}  className='absolute right-2 m-4 hover:text-white hover:scale-105 transition-all' ><FaPlus/></Link> : null}
          </div>
  )
}

export default NavBar