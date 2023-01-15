const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
    carMark: {type: String, required: true},
    carModel: {type: String, required: true},
    carYear: {type: String},
    carEngine: {type: String},
    carNumber: {type: String},
    carVinCode: {type: String},
    carColor: {type: String},
    // phoneNumber: {type: Number, required: true},
    date: {type: Date, default: Date.now},
    client: [{type: Types.ObjectId, ref: 'Client'}],
    owner: [{type: Types.ObjectId, ref: 'User'}]
})

module.exports = model('Car', schema);