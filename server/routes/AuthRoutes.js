const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const router = express.Router();
const User = require('../models/User');
const authMiddleware = require('../middleware/authMiddleware')
const { findOne } = require('../models/Item');

router.post('/register', async (req, res) => {
    try{
        const {username, email, password} = req.body

        const existingUser = await User.findOne({email});

        if(existingUser){
            return res.status(400).json({
                message : "User already exists."
            });
        }

        const hashpassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            username,
            email,
            password : hashpassword
        })

        await newUser.save();

        res.status(201).json({
            message: "User Registered Successfully."
        })


    }catch(error){
        res.status(500).json({
            error : error.message
        })
    }
})


router.post('/login', async (req, res) => {
    try{
        const {email, password} = req.body

        const user = await User.findOne({email});

        if(!user){
            return res.status(400).json({
                message: "Invalid Email."
            })
        }


        const isMatch = await bcrypt.compare(password, user.password)

        if(!isMatch){
            return res.status(400).json({
                message : "Invalid Password."
            })
        }

        const token = jwt.sign(
            {id : user._id},
            process.env.JWT_SECRET,
            {expiresIn: '7d'}
        );

        res.status(201).json({
            message : "Login Successful.",
            token
        })


    }catch(error){
        res.status(500).json({
            message : error.message
        })
       
    }
});


router.get(
    '/google',

    passport.authenticate(
        'google',
        {
            scope: [
                'profile',
                'email'
            ]
        }
    )
);



router.get(
    '/google/callback',

    passport.authenticate(
        'google',
        {
            session: false
        }
    ),

    async (req, res) => {

        const token = jwt.sign(

            {
                id: req.user._id
            },

            process.env.JWT_SECRET,

            {
                expiresIn: '7d'
            }
        );

        res.redirect(
            `https://findy-campus-frontend.onrender.com/google-success?token=${token}`
        );

    }
);

router.get('/profile', authMiddleware, async (req, res) => {
    res.status(201).json({
        message: "Protected Content",
        user : req.user
    })
})

module.exports = router;