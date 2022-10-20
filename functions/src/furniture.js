import dbConnect from "./dbconnect.js"



export async function getAllFurniture(req,res) {
    //connect to the database 
    const db = dbConnect()
    // get all whole furniture collection
    const collection = await db.collection("furniture").find().toArray()
    // catch any errors -> status 500
    .catch(err => {
        res.status(500).send(err)
        return
    })
    //send back array of furnitures
    res.send(collection)
}

export async function  addNewFurniture(req,res){
    // get new furniture from the body of the request 
    const { brand, model }= req.body
    const addNewFurniture = {brand, model}
    //connect to database
    const db = dbConnect()
    // put this new furniture into our furniture collection in out db
    await db.collection ('furniture').insertOne(addNewFurniture)
    // catch error and send with status 500
    .catch(err => {
        res.status(500).send(err)
        return 
    })
    //return response with 201
    res.status(201).send({message:'furniture added'})
}
