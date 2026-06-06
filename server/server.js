const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db')
const ItemRoutes = require('./routes/ItemRoutes')
const AuthRoutes = require('./routes/AuthRoutes')
const userRoutes = require('./routes/userRoutes');
const passport = require('passport');
require('./config/passport');
require('dotenv').config();

const app = express();

connectDB();

app.use(cors());
app.use(express.json());
app.use(passport.initialize());

app.use('/items', ItemRoutes);
app.use('/auth', AuthRoutes);
app.use('/users', userRoutes);

app.get('/', (req, res) =>{
    res.send('Findy backend is running...')
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
});