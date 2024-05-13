const http = require('http')
const { getProducts, getProductById, addProduct, updateProduct } = require('./controller/productController')

function handleGetResquest(req, res){
    const path = req.url
    if(path === '/api/products'){
       return getProducts(req, res)
    }else if(path.match(/\/api\/products\/([0-9]+)/)){
        const id = req.url.split('/')[3]
        //console.log(id)
        return getProductById(req, res, id)
    }else{
        res.writeHeader(400, {'content-type': 'appliction/json'})
        res.end(JSON.stringify({"message": "Route not found"}))
    }
}
function handlePostRequest(req, res){
    if(req.url === '/api/products/addproduct'){
        return addProduct(req, res)
    }else{
        res.writeHeader(400, { 'sontent-type': 'application/json'})
        res.end(JSON.stringify({"message": "Route not found"}))
    }
}

function handlePutRequest(req, res){
    const path = req.url 
    if(path.match(/\/api\/products\/update\/([0-9]+)/)){
        const id = req.url.split('/')[4]
        return updateProduct(req,res,id)
    }else{
        res.writeHeader(400, { 'sontent-type': 'application/json'})
        res.end(JSON.stringify({"message": "Route not found"}))
    }
}

function handleResquest(req, res){
    const { method } = req 
    if(method === 'GET'){
        return handleGetResquest(req, res)
    }else if(method === 'POST'){
        return handlePostRequest(req, res)
    }else if(method === 'PUT'){
        return handlePutRequest(req,res)
    }else if(method === 'DELETE'){

    }
}

    
const server = http.createServer(handleResquest)

const PORT = process.env.PORT || 3000

server.listen(PORT, () =>{
    console.log(`Server listening on port ${PORT}`)
})