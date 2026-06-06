import React, { useEffect } from "react";
import { useState } from "react";
import axios from 'axios'
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const EditItem = () => {
    const {id} = useParams()
    const navigate = useNavigate()
    const [itemData, setItemData] = useState({
        title: "",
        description: "",
        category: "",
        location: "",
        contact: "",
    });

    
    const fetchItems = async() => {
        try{
            const res = await axios.get('https://findy-campus-backend.onrender.com/items')

            const item = res.data.find(
                item => item._id == id
            )

            if(item){
                setItemData(item)
            }
        }catch(error){
            console.log(error.response.data);
        }
    }

    useEffect(()=> {
        fetchItems()
    }, [])




  const handleSubmit = async(e) => {
    e.preventDefault()

    try{
        const token = localStorage.getItem('token')

        const res = await axios.put(`https://findy-campus-backend.onrender.com/items/${id}`, itemData, {
            headers: {
                Authorization : `${token}`
            }
        })

        toast.success("Item Updated");
        navigate('/dashboard')
    }catch(error){
        toast.error(error.response.data);
    }
  }
  return (
    <div className="EditItemPage">
  <h1>Edit Item</h1>

  <form className="EditItemForm" onSubmit={handleSubmit}>
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
      <option value="Lost">Lost</option>
      <option value="Found">Found</option>
    </select>

    <input
      type="text"
      placeholder="Location"
      required
      value={itemData.location}
      onChange={(e) => {
        setItemData({
          ...itemData,
          location: e.target.value,
        });
      }}
    />

    <input
      type="text"
      placeholder="Contact"
      required
      value={itemData.contact}
      onChange={(e) => {
        setItemData({
          ...itemData,
          contact: e.target.value,
        });
      }}
    />

    <button className="update-btn" type="submit">
      Update Item
    </button>
  </form>
</div>
  );
};

export default EditItem;
