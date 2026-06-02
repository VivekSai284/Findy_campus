import { useEffect, useState } from 'react';
import axios from 'axios';

const Profile = () => {

    const [user, setUser] = useState(null);

    useEffect(() => {

        fetchUser();

    }, []);

    const fetchUser = async () => {

        try {

            const token =
                localStorage.getItem('token');
                console.log('TOKEN:', token);

            const res = await axios.get(
                'http://localhost:5000/users/me',
                {
                    headers: {
                        Authorization:
                        ` ${token}`
                    }
                }
            );

            console.log('USER DATA:', res.data);

            setUser(res.data);

        } catch(error) {

            console.log(error);

        }

    };

    if (!user) {
        return <div className="loader-container">
        <div className="loader"></div>
      </div>
    }

    return (

        /* Wrap your profile content inside a structured glass container */
<div className="ProfilePage">
    <div className="profile-container">
        <h1>Hello {user.username} 👋</h1>
        <hr className="profile-divider" />
        <h3>User Details</h3>
        <div className="profile-details">
            <p><strong>Username:</strong> {user.username}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Joined:</strong> {new Date(user.createdAt).toLocaleDateString()}</p>
        </div>
    </div>
</div>

    );
};

export default Profile;