// pages/GoogleSuccess.js

import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function GoogleSuccess() {
    const navigate = useNavigate();

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);

        const token = params.get('token');

        if(token){
            localStorage.setItem('token', token);
            navigate('/');
        }
    }, [navigate]);

    return <h2>Logging in...</h2>;
}

export default GoogleSuccess;