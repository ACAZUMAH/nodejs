const products = require('../data/products')
const { v4: uuidv4 } = require('uuid')
const { writeDataToFile } = require('../utils')

function findProducts(){
    return new Promise((resolve, reject)=>{
        resolve(products)
    })
}

function findProductById(id){
    return new Promise((resolve,reject)=>{
        const product = products.find(item => item.id === id)
        resolve(product)
    })
}

function createProduct(product){
    return new Promise((resolve,reject) =>{
        const newProduct = {id:uuidv4(), ...product}
        products.push(newProduct)
        writeDataToFile('./data/products.json', products)
        resolve(newProduct)
    })
}
module.exports = {
    findProducts,
    findProductById,
    createProduct

}
