
const express = require('express')
const router = express.Router()
const { default: mongoose } = require('mongoose')
const {Home,createProduct,getAllProducts,getProductById,updateProductById,deleteProduct} = require('../controllers/productsControllers')


router.get("/",Home)

router.post('/products',createProduct)

//get all products
router.get("/products",getAllProducts)

//get product by id

router.get("/products/:id",getProductById)

//update a product
router.put("/products/:id",updateProductById)

//delete a product
router.delete("/products/:id",deleteProduct)
  module.exports = router