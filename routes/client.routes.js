const {Router} = require('express')
const config = require('config')
const Client = require('../models/Client')
const auth = require('../middleware/auth.middleware')
const router = Router()

router.post('/create-client', auth, async (req, res) => {
    try {
        const {firstName, phoneNumber} = req.body

        // const baseUrl = config.get('baseUrl')

        const existing = await Client.findOne({firstName}) 

        if (existing) {
            return res.json({ client: existing})
        }

        const client = new Client({
            firstName: firstName, phoneNumber: phoneNumber, owner: req.user.userId
        })

        await client.save()

    } catch (e) {
        res.status(500).json({message: 'Some server error...'})
    }
})

router.get('/', auth, async (req, res) => {
    try {
        const clients = await Client.find({ owner: req.user.userId})    
        res.json(clients)
    } catch (e) {
        res.status(500).json({message: 'Some server error...'})
    }
})

router.get('/:id', auth, async (req, res) => {
    try {
        const client = await Client.findById(req.params.id)
        res.json(client)
    } catch (e) {
        res.status(500).json({message: 'Some server error...'})
    }
})

router.delete('/:id', auth, async(req, res) => {
    try {
        const client = await Client.findByIdAndDelete(req.params.id)
        res.json('ok')
    } catch {
        res.status(500).json({message: 'Some server error...'})
    }
})

module.exports = router
