const express = require('express');
const router = express.Router();

const User = require('../models/User');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/me', authMiddleware, async (req, res) => {

    try {

        const user = await User.findById(
            req.user.id
        ).select('-password');

        res.json(user);

    } catch(error) {

        res.status(500).json({
            error: error.message
        });

    }

});

module.exports = router;