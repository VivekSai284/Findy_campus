const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({

    
    title : {
        type : String,
        required : true
    },
    
    image: {
        type : String,
        default : ''
    },

    description : {
        type : String,
        required : true
    },

    category : {
        type : String,
        enum : ['Lost', 'Found'],
        required : true
    },

    location : {
        type : String,
        required : true
    },

    contact: {
        type : Number,
        required : true,
        match: /^[0-9]{10}$/
    },

    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Item', itemSchema)