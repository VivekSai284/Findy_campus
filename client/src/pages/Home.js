import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [items, setItems] = useState([]);
  const [loading, setloading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchItems = async () => {
      try {
        setloading(true);
        const res = await axios.get("http://localhost:5000/items");
        setItems(res.data);
      } catch (error) {
        console.log(error.response.data);
      } finally {
        setloading(false);
      }
    };

    fetchItems();
  }, []);

  const filteredItems = items.filter(
    (item) =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase()),
  );


  if (loading) {
    return (
      <div className="loader-container">
        <div className="loader"></div>
      </div>
    );
  }

  if (items.length === 0) {
    return <h2 className="ntgHome">No Posts Found.</h2>;
  }
  return (
    <div className="HomeItems">
      <h1>Lost & Found Items</h1>

      <div className="search-wrapper">
        <FaSearch className="search-icon" />

        <input
          type="text"
          className="search-input"
          placeholder="Search items..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="items-container">
        {(filteredItems.reverse()).map((item) => (
          <div
            className="item-card"
            key={item.id}
            onClick={() => navigate(`/item/${item._id}`)}
          >
            {item.image && (
              <img
                src={`http://localhost:5000/uploads/${item.image}`}
                alt={item.title}
                width="200"
              />
            )}
            <div className="item-card-content">
              <h3>{item.title}</h3>
              <p className="description">
                {item.description.length > 25
                  ? item.description.substring(0, 25) + "...."
                  : item.description}
              </p>

              <span className="category">{item.category}</span>

              {/* Add this class wrapper around your metadata tags in the Home Item card */}
              <div className="card-meta">
                <p>
                  Posted By: <span>{item.user?.username}</span>
                </p>
                <p>
                  Posted At:{" "}
                  <span>{new Date(item.createdAt).toLocaleDateString()}</span>
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
