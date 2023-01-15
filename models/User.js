const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    client: [{ type: Types.ObjectId, ref: 'Client' }]
})

module.exports = model('User', schema)