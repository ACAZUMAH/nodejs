const fs = require('fs')

async function writeDataToFile(fileName, content){
    fs.writeFileSync(fileName, JSON.stringify(content), 'utf8', (error) =>{
        if(error){
            console.log(error)
        }
        
    })
}

function getPostData(req){
    return new Promise((resolve,reject) =>{
        try {
            let body = ''
            req.on('data', (chunk) =>{
                body += chunk.toString()
            })

            req.on('end', () =>{
                resolve(body)
            })
        } catch (error) {
            console.log(error)
        }
    })
    
}

module.exports = {
    writeDataToFile,
    getPostData
}