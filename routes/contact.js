const express = require('express')
const contact = require('../models/contact')
const { addContact } = require('../controllers/contact')
const contactRouter = express.Router()

contactRouter.post('/addContact', addContact)

contactRouter.get('/getContacts', async(req,res)=>{
    try {
        const contacts = await  contact.find()
        res.status(200).send({msg :'users list',contacts})
    } catch (error) {
        res.status(500).send('users not found')
    }
})

contactRouter.get('/getContact/:id', async(req,res)=>{
    try {
        const {id}=req.params
      const found =  await contact.findById(id)
      res.status(200).send({msg : 'user found',found})
    } catch (error) {
        res.status(500).send('users not found')
    }
})

contactRouter.delete('/deleteContact/:id',async(req,res)=>{
    try {
        const {id}= req.params
        await contact.findByIdAndDelete(id)
        res.status(200).send('user deleted')
    } catch (error) {
        res.status(500).send('could not delete user')
    }
})

contactRouter.put('/modUser/:id', async(req,res)=>{
    try {
        const {id} = req.params
        await contact.findByIdAndUpdate(id,{$set : req.body})
        const found =  await contact.findById(id)
        res.status(200).send({msg : 'user modified', found})
    } catch (error) {
        res.status(500).send('user not modified')
    }
})
module.exports = contactRouter