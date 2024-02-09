const mongoose = require("mongoose");

const { Product } = require("../models/Product");

exports.Home = (req, res) => {
  res.send(`Hii home page`);
};

exports.createProduct = async (req,res) => {
   
    try{
        if(!req.body.name){
            return res.status(422).json({error:"Name is required"})
        }
        if(!req.body.description){
            return res.status(422).json({error:"description is required"})
        }
        if(!req.body.price){
            return res.status(422).json({error:"price is required"})
        }
        if(!req.body.category){
            return res.status(422).json({error:"category is required"})
        } else if(!Product.schema.path('category').enumValues.includes(req.body.category)){
            return res.status(422).json({error:`category options must be of ${Product.schema.path('category').enumValues.join(', ')}`})
        }
        
        const newProd = await Product.create(req.body)
        return res.status(201).json({msg:"Product succesfully created",data:newProd})
    }catch(err){
      return res.status(500).json({msg:"Product failed to create",data:err.message})
    }
}

exports.getAllProducts =  async (req,res) => {
    try{
      const allProds = await Product.find()
      return res.status(200).json({msg:"fetching of all products",data:allProds})
    }catch(err){
        return res.status(500).json({msg:"Product failed to all products",data:err.message}) 
    }
}

exports.getProductById = async (req,res) => {
    try{
        if(!mongoose.isValidObjectId(req.params.id)){
            return res.status(404).json({error:"Parameter is not a valid id"})
        }
      const singleProd = await Product.findById(req.params.id)
      if(!singleProd){
        return res.status(404).json({error:"Product not created"})
      }
      return res.status(200).json({msg:"fetching of singleProd success",data:singleProd})
    }catch(err){
        return res.status(500).json({msg:"fetching of singleProd failed",data:err.message}) 
    }
}

exports.updateProductById = async (req,res) => {
    try{
        if(!mongoose.isValidObjectId(req.params.id)){
            return res.status(404).json({error:"Parameter is not a valid id"})
        }
      const singleProd = await Product.findByIdAndUpdate(req.params.id,req.body,{new:true})
      if(!singleProd){
        return res.status(404).json({error:"Product not created"})
      }
      return res.status(200).json({msg:"product updated success",data:singleProd})
    }catch(err){
        return res.status(500).json({msg:"product update failed ",data:err.message}) 
    }
}

exports.deleteProduct = async (req,res) => {
    Product.deleteOne({_id:req.params.id}).then((delProd) => {
        return res.status(200).json({msg:"Product deleted succesfully",data:delProd})
    }).catch((err) => {
        return res.status(500).json({error:"Product deletion failed",data:err.message})
    })
}