import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [items, setitems] = useState([]);
  const [loading, setloading] = useState(true);

  const fetchItems = async () => {
    try {
      setloading(true);
      const res = await axios.get("https://findy-campus-backend.onrender.com/items/my-items", {
        headers: {
          Authorization: `${token}`,
        },
      });
      setitems(res.data);
    } catch (error) {
      console.log(error.response.data);
    } finally {
      setloading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(`https://findy-campus-backend.onrender.com/items/${id}`, {
        headers: {
          Authorization: `${token}`,
        },
      });

      fetchItems();
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const totalPosts = items.length;

  const lostPosts = items.filter((item) => item.category === "Lost").length;
  const foundPosts = items.filter((item) => item.category === "Found").length;

  const thisMonthPosts = items.filter((item) => {
    const postDate = new Date(item.createdAt);
    const currentDate = new Date();

    return (
      postDate.getMonth() === currentDate.getMonth() &&
      postDate.getFullYear() === currentDate.getFullYear()
    );
  }).length;

  if (loading) {
    return (
      <div className="loader-container">
        <div className="loader"></div>
      </div>
    );
  }
  if (items.length === 0) {
    return <h2 className="ntgDashboard">You haven't posted any items yet.</h2>;
  }
  return (
    <div className="Dashboard">
      <h1>My Posts</h1>

      <div className="stats-container">
        <div className="stat-card">
          <h2>{totalPosts}</h2>
          <p>Total Posts</p>
        </div>

        <div className="stat-card">
          <h2>{lostPosts}</h2>
          <p>Lost Items</p>
        </div>

        <div className="stat-card">
          <h2>{foundPosts}</h2>
          <p>Found Items</p>
        </div>

        <div className="stat-card">
          <h2>{thisMonthPosts}</h2>
          <p>Posts This Month</p>
        </div>
      </div>

      <Link to="/profile" className = "Profile-link">
        Profile
      </Link>

      <div className="dashboard-container">
        {items.map((item) => (
          <div className="dashboard-card" key={item._id}>
            <h3>{item.title}</h3>
            <p className="description">
              {item.description.length > 25
                ? item.description.substring(0, 25) + "...."
                : item.description}
            </p>
            <span className="category">{item.category}</span>
            <div className="action-buttons">
              <button
                className="edit-btn"
                onClick={() => navigate(`/edit-item/${item._id}`)}
              >
                Edit
              </button>
              <button
                className="delete-btn"
                onClick={() => handleDelete(item._id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
