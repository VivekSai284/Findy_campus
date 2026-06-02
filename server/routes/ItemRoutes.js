const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const Item = require("../models/Item");
const upload = require("../middleware/uploadMiddleware");

router.post("/", authMiddleware, upload.single("image"), async (req, res) => {
  try {
    const newItem = await new Item({
      title: req.body.title,
      description: req.body.description,
      category: req.body.category,
      location: req.body.location,
      contact: req.body.contact,
      image: req.file ? req.file.filename : "",
      user: req.user.id,
    });
    await newItem.save();

    res.status(201).json(newItem);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
});

router.get("/", async (req, res) => {
  try {
    const items = await Item.find().populate("user", "username email");

    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
});

router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);

    if (!item) {
      return res.status(404).json({
        message: "Item not Found",
      });
    }

    if (item.user.toString() !== req.user.id) {
      return res.status(403).json({
        message: "Not Authorized",
      });
    }

    const updatedItem = await Item.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    res.json(updatedItem);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
});

router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);

    if (!item) {
      return res.status(404).json({
        message: "Item not Found",
      });
    }

    if (item.user.toString() !== req.user.id) {
      return res.status(403).json({
        message: "Not Authorized",
      });
    }

    await item.deleteOne();

    res.json({
      message: "Item deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
});

router.get("/my-items", authMiddleware, async (req, res) => {
  try {
    const items = await Item.find({
      user: req.user.id,
    });

    res.json(items);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
});

router.get('/:id', async (req, res) => {

    try {

        const item = await Item.findById(req.params.id).populate('user', 'username email');

        if(!item){
            return res.status(404).json({
                message: 'Item not found'
            });
        }

        res.json(item);

    } catch(error){

        res.status(500).json({
            error: error.message
        });

    }

});

module.exports = router;
