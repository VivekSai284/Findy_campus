import React from 'react';
import {Link} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


const Navbar = ({ isLoggedIn, setIsLoggedIn }) => {

    const token = localStorage.getItem('token')
    const navigate = useNavigate();

    
    const logout = () => {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        navigate('/login');
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

         <>
            {isLoggedIn ? (
                <button className='Logout' onClick={logout}>
                    Logout
                </button>
            ) : (
                <>
                    <button className='Logout' onClick={() => navigate('/login')}>
                        Login
                    </button>

                    <button className='Logout' onClick={() => navigate('/register')}>
                        Register
                    </button>
                </>
            )}
        </>
        </div>


    </nav>
  )
}

export default Navbar