import { ObjectId } from "mongodb"
import dbConnect from "./dbconnect.js"



export async function getAllFurniture(req, res) {
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
    res.set('cache-control', 'public, max-age=300, ,s-maxage=600')
    res.send(collection)
}

export async function addNewFurniture(req, res) {
    // get new furniture from the body of the request 
    const { brand, model } = req.body
    const addNewFurniture = { brand, model }
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
    res.status(201).send({ message: 'furniture added' })
}

export async function updateFurniture(req, res) {
    const { furnitureId } = req.params
    const db = dbConnect()
    await db.collection('furniture')
        .findOneAndUpdate({_id: new ObjectId(furnitureId)}, { $set: req.body })
                .catch(err => {
                    res.status(500).send(err)
                    return
                })
    res.status(202).send({ message: "update furniture" })
        }