const contact = require("../models/contact")

exports.addContact = async(req,res)=>{
    try {
        const found = await contact.findOne({email : req.body.email})
        if(found){
            return res.status(400).send('email already used')
        }
        const contactToSave = new contact(req.body)
        await contactToSave.save()
        res.status(200).send({msg:'user added',contactToSave})
    } catch (error) {
        res.status(500).send('could not add user')
    }
}