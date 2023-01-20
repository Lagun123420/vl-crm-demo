const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
    
    // number: {type: String},
    status: {type: String},
    worksList: {type: Array},
    partsList: {type: Array},
    worksSum: {type: Number},
    partsSum: {type: Number},
    totalSum: {type: Number},
    carOdometr: {type: Number},
    carMark: {type: String},
    carModel: {type: String},
    clientName: {type: String},
    clientPhone: {type: Number},
    worksRecomendation: {type: String},
    date: {type: Date, default: Date.now},
    car: [{type: Types.ObjectId, ref: 'Car'}], 
    client: [{type: Types.ObjectId, ref: 'Client'}],
    owner: [{type: Types.ObjectId, ref: 'User'}]
})

module.exports = model('Order', schema);