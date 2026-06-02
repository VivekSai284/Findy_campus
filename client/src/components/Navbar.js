import React from 'react';
import {Link} from 'react-router-dom';


const Navbar = () => {

    const token = localStorage.getItem('token')
    const logout = () => {
        localStorage.removeItem('token');

        window.location.reload();
    }
  return (
    <nav className='nav' >
        <div className='Header'>
            Findy
        </div>
        

        <div className='Links'>
            <Link className='Home' to={'/'}>Home</Link>
        <Link className='Dashboard' to={'/dashboard'}>Dashboard</Link>
        <Link className='CreateItem' to={'/create-item'}>Post</Link>

        <div></div>
        {token ? (
            <>
                <button className='Logout' onClick={logout}>Logout</button>
            </>): (
                <>
                    <Link className='Login' to={'/login'}>Login</Link>
                    <Link className='Register' to={'/register'}>Register</Link>
                </>
            )}
        </div>


    </nav>
  )
}

export default Navbar