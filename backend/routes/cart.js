import express from 'express'
import { ObjectId } from 'mongodb'

import { cartCollection } from '../db.js'

const router = express.Router();

router.get('/cart', async (req, res) => {
    let cartItems = await cartCollection.find().toArray()
    
    res.status(200).send(cartItems)
})

router.post('/cart', async (req, res) => {
    const product = await cartCollection.findOne({id: req.body.id})

    if (product === null) {
        const { insertedId } = await cartCollection.insertOne({...req.body, quantity: 1})
        
        const product = await cartCollection.findOne({_id: insertedId})

        if (product === null) {
            return res.status(400).send('Oooops! Something went wrong')
        }

        return res.status(201).send(product)
    }

    res.status(204).send()
})

router.patch('/cart', async (req, res) => {
    const product = await cartCollection
        .findOneAndUpdate({id: req.body.id}, {$inc: {quantity: req.body.action}})

    if (product.value === null) {
        return res.status(400).send('Oooops! Something went wrong')
    }
    if (req.body.action < 0 && product.value.quantity < 2) {
        const product = await cartCollection.findOneAndDelete({id: req.body.id})
    
        if (product.value === null) {
            return res.status(400).send('Oh oh! Something went wrong')
        }

        return res.status(200).send(product.value)
    }

    res.status(201).send(product)
})

router.delete('/cart/:id', async (req, res) => {
    const product = await cartCollection.findOneAndDelete({_id: new ObjectId(req.params.id)})
    
    if (product.value === null) {
        return res.status(400).send('Oh oh! Something went wrong')
    }

    res.status(200).send(product.value)
})

export default router