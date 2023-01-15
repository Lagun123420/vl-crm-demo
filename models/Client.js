const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
    
    firstName: {type: String, required: true},
    phoneNumber: {type: Number, required: true},
    date: {type: Date, default: Date.now},
    owner: [{type: Types.ObjectId, ref: 'User'}]
})

module.exports = model('Client', schema);