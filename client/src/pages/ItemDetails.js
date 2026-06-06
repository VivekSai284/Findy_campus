import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const ItemDetails = () => {
  const { id } = useParams();


  const [item, setItem] = useState(null);

  useEffect(() => {
    fetchItem();
  }, []);

  const fetchItem = async () => {
    try {
      const response = await axios.get(`https://findy-campus-backend.onrender.com/items/${id}`);

      console.log(response.data);

      setItem(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  if (!item) {
    return (
      <div className="loader-container">
        <div className="loader"></div>
      </div>
    );
  }

  return (
   <div className="item-details">

  <div className="item-image-container">
    <img
      src={item.image}
      alt={item.title}
      className="item-image"
    />
  </div>

  <div className="item-content">

    <span className="item-category">
      {item.category}
    </span>

    <h1>{item.title}</h1>

    <p className="item-description">
      {item.description}
    </p>

    <div className="item-info">
      <h3>Location</h3>
      <p>{item.location}</p>

      <h3>Contact Information</h3>
      <p>{item.contact}</p>

      <h3>Posted By</h3>
      <p>{item.user?.username}</p>

      <h3>Posted On</h3>
      <p>{new Date(item.createdAt).toLocaleDateString()}</p>

    </div>

  </div>

</div>
  );
};

export default ItemDetails;
