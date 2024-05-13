const { findProducts, findProductById,createProduct } = require('../models/productsModels')
const { getPostData } = require('../utils.js')
// @desc gets all products 
// @route GET /api/products
async function getProducts(req, res){
    try{
        const products = await findProducts()
        res.writeHeader(200, {'content-type': 'appliction/json'})
        res.end(JSON.stringify(products))
    }catch(error){
        console.log(error)
    }
}

// @desc get a product with id
// @route GET /api/products/:id
async function getProductById(req, res, id){
    try{
        const productById = await findProductById(id)
        if(!productById){
            res.writeHeader(404, { 'content-type': 'appliction/json' })
            res.end(JSON.stringify({ "message": "Product not found" }))
        }else{
            res.writeHeader(200, {'content-type': 'appliction/json'})
            res.end(JSON.stringify(productById))
        }

    }catch(error){
        console.log(error)
    }
} 

//@desc adding new product to to the list
//@route GET /api/product/addproduct/:id
async function addProduct(req, res){
    try{
        const body = await getPostData(req)
        const { name, discription, price} = JSON.parse(body)
        const product = {
            name,
            discription,
            price
        }
        const newProduct = await createProduct(product)
        res.writeHeader(201, { "content-type": "application/json" })
        res.end(JSON.stringify(newProduct))
    }catch(error){
        console.log(error)
    }
}

//@desc updating a product 
//@route GET /api/product/update/:id
async function updateProduct(req, res,id){
    try {
        const body = await getPostData(req)
    } catch (error) {
        
    }
}

module.exports = {
    getProducts,
    getProductById,
    addProduct
}
