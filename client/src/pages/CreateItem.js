import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const CreateItem = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");
  console.log(token);

  const [image, setImage] = useState(null);
  const [itemData, setItemData] = useState({
    title: "",
    description: "",
    category: "Lost",
    location: "",
    contact: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();

      formData.append("title", itemData.title);
      formData.append("description", itemData.description);
      formData.append("category", itemData.category);
      formData.append("location", itemData.location);
      formData.append("contact", itemData.contact);

      if (image) {
        formData.append("image", image);
      }

      const resp = await axios.post("https://findy-campus-backend.onrender.com/items", formData, {
        headers: {
          Authorization: `${token}`,
        },
      });

      toast.success("Item Created Successfully");

      navigate("/");
    } catch (error) {
      console.log(error.response.data);
      toast.error("Failed to create Item");
    }finally{
      setLoading(false);
    }
  };

  return (
    <div className="CreateItemPage">
      <h1>Post Item</h1>

      <form className="CreateItemForm" onSubmit={handleSubmit}>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
        />
        <input
          type="text"
          placeholder="Title"
          required
          value={itemData.title}
          onChange={(e) => {
            setItemData({
              ...itemData,
              title: e.target.value,
            });
          }}
        />

        <textarea
          type="text"
          placeholder="Description"
          required
          value={itemData.description}
          onChange={(e) => {
            setItemData({
              ...itemData,
              description: e.target.value,
            });
          }}
        />

        <select
          value={itemData.category}
          onChange={(e) => {
            setItemData({
              ...itemData,
              category: e.target.value,
            });
          }}
        >
          <option value={"Lost"}>Lost</option>
          <option value={"Found"}>Found</option>
        </select>

        <input
          type="text"
          placeholder="Location"
          value={itemData.location}
          onChange={(e) => {
            setItemData({
              ...itemData,
              location: e.target.value,
            });
          }}
        />

        <input
          type="tel"
          placeholder="Phone Number"
          maxLength="10"
          pattern="[0-9]{10}"
          value={itemData.contact}
          onChange={(e) => {
            setItemData({
              ...itemData,
              contact: e.target.value,
            });
          }}
        />


        <button type="submit" disabled={loading}>
          {loading ? "Creating..." : "Create Item"}
        </button>
      </form>
    </div>
  );
};

export default CreateItem;
