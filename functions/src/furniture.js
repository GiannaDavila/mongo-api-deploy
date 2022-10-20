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
