const {Router} = require('express')
const config = require('config')
const Order = require('../models/Order')
const auth = require('../middleware/auth.middleware')
const router = Router()

router.post('/create-order', auth, async (req, res) => {
    try {
        const {
            number,
            worksList,
            partsList,
            worksSum,
            partsSum,
            totalSum,
            carOdometr,
            clientName,
            clientPhone,
            carMark,
            carModel,
            worksRecomendation,
            car,
            client
        } = req.body

        // const baseUrl = config.get('baseUrl')

        // const existing = await Car.findOne({carMark}) 

        // if (existing) {
        //     return res.json({ car: existing})
        // }

        // console.log(client)

        const order = new Order({
            number: number,
            worksList,
            partsList,
            worksSum: worksSum,
            partsSum: partsSum,
            totalSum: totalSum,
            carOdometr: carOdometr,
            carMark: carMark,
            carModel: carModel,
            clientName: clientName,
            clientPhone: clientPhone,
            worksRecomendation: worksRecomendation,
            car: car,
            client: client,
            owner: req.user.userId
        })

        await order.save()
        res.json(order)

    } catch (e) {
        res.status(500).json({message: `Some server error... ${e}`})
    }
})

router.get('/', auth, async (req, res) => {
    try {
        const orders = await Order.find({owner: req.user.userId})    
        res.json(orders)
    } catch (e) {
        res.status(500).json({message: 'Some server error...'})
    }
})

router.get('/:id', auth, async (req, res) => {
    try {
        const order = await Order.findById(req.params.id)
        res.json(order)
    } catch (e) {
        res.status(500).json({message: 'Some server error...'})
    }
})

router.get('/clientOrders/:id', auth, async (req, res) => {
    try {
        const order = await Order.find({client: req.params.id})
        res.json(order)
    } catch (e) {
        res.status(500).json({message: 'Some server error...'})
    }
})

router.delete('/:id', auth, async(req, res) => {
    try {
        const order = await Order.findByIdAndDelete(req.params.id)
        res.json('ok')
    } catch {
        res.status(500).json({message: 'Some server error...'})
    }
})

module.exports = router
