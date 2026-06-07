import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Profile = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const token = localStorage.getItem("token");
      console.log("TOKEN:", token);

      const res = await axios.get(
        "https://findy-campus-backend.onrender.com/users/me",
        {
          headers: {
            Authorization: ` ${token}`,
          },
        },
      );

      console.log("USER DATA:", res.data);

      setUser(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteAccount = async () => {
    const confirmDelete = window.confirm(
      "Are you sure? This action cannot be undone.",
    );

    if (!confirmDelete) {
      return;
    }

    try {
      const token = localStorage.getItem("token");

      const res = await axios.delete(
        "https://findy-campus-frontend.onrender.com/users/delete-account",
        {
          headers: {
            Authorization: `${token}`,
          },
        },
      );

      toast.success("Account deleted successfully");

      localStorage.removeItem("token");

      navigate("/");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  if (!user) {
    return (
      <div className="loader-container">
        <div className="loader"></div>
      </div>
    );
  }

  return (
    /* Wrap your profile content inside a structured glass container */
    <div className="ProfilePage">
      <div className="profile-container">
        <h1>Hello {user.username} 👋</h1>
        <hr className="profile-divider" />
        <h3>User Details</h3>
        <div className="profile-details">
          <p>
            <strong>Username:</strong> {user.username}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <p>
            <strong>Joined:</strong>{" "}
            {new Date(user.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>
      <button onClick={deleteAccount}>Delete Account</button>
    </div>
  );
};

export default Profile;
