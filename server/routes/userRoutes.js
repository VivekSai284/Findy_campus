const express = require('express');
const router = express.Router();

const User = require('../models/User');
const Item = require('../models/Item');
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



router.delete(
    '/delete-account',
    authMiddleware,
    async (req, res) => {

        try {

            await Item.deleteMany({
                user: req.user.id
            });

            await User.findByIdAndDelete(
                req.user.id
            );

            res.json({
                message:
                'Account and all posts deleted'
            });

        } catch(error) {

            res.status(500).json({
                error: error.message
            });

        }

    }
);

module.exports = router;