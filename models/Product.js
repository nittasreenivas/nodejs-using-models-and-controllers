
const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    quantity:{
        type:Number,
        required:true,
        default:0
    },
    active:{
        type:Boolean,
        default:true
    },
    category:{
        type:String,
        required:true,
        enum:["Electronics","Food","Clothing","Books"]
    }
})

exports.Product = mongoose.model('Product',productSchema)