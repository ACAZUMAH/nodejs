const http = require('http')
const { getProducts,
    getProductById, 
    addProduct, 
    updateProduct,
    modifyProduct,
    deleteProduct } = require('./controller/productController')

function handleGetResquest(req, res){
    const path = req.url
    if(path === '/api/products'){
       return getProducts(req, res)
    }else if(path.match(/\/api\/products\/([0-9]+)/)){
        const id = req.url.split('/')[3]
        return getProductById(req, res, id)
    }else{
        res.writeHeader(404, {'content-type': 'appliction/json'})
        res.end(JSON.stringify({"message": "Not found"}))
    }
}
function handlePostRequest(req, res){
    if(req.url === '/api/products/addproduct'){
        return addProduct(req, res)
    }else{
        res.writeHeader(404, { 'content-type': 'application/json'})
        res.end(JSON.stringify({"message": "Not found"}))
    }
}

function handlePutRequest(req, res){
    const path = req.url 
    if(path.match(/\/api\/products\/update\/([0-9]+)/)){
        const id = req.url.split('/')[4]
        return updateProduct(req,res,id)
    }else{
        res.writeHeader(404, { 'content-type': 'application/json'})
        res.end(JSON.stringify({"message": "Not found"}))
    }
}

function handlePatchRequest(req,res){
    const path = req.url 
    if(path.match(/\/api\/products\/update\/([0-9]+)/)){
        const id = req.url.split('/')[4]
        return modifyProduct(req,res,id)
    }else{
        res.writeHeader(404, { 'content-type': 'application/json'})
        res.end(JSON.stringify({"message": "Not found"}))
    }
}

function handleDeleteRequest(req, res){
    const path = req.url 
    if(path.match(/\/api\/products\/delete\/([0-9]+)/)){
        const id = req.url.split('/')[4]
        return deleteProduct(req,res,id)
    }else{
        res.writeHeader(404, { 'content-type': 'application/json'})
        res.end(JSON.stringify({"message": "Not found"}))
    }
}

function handleResquest(req, res){
    const { method } = req 
    if(method === 'GET'){
        return handleGetResquest(req, res)
    }else if(method === 'POST'){
        return handlePostRequest(req, res)
    }else if(method === 'PUT'){
        return handlePutRequest(req, res)
    }else if(method === 'PATCH'){
        return handlePatchRequest(req, res)
    }else if(method === 'DELETE'){
        return handleDeleteRequest(req, res)
    }else{
        res.writeHeader(400, { 'content-type': 'application/json' })
        res.end(JSON.stringify({"message": "Unsuported request"}))
    }
}

    
const server = http.createServer(handleResquest)

const PORT = process.env.PORT || 3000

server.listen(PORT, () =>{
    console.log(`Server listening on port ${PORT}`)
})