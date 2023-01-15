const {Router} = require('express')
const config = require('config')
const Car = require('../models/Car')
const auth = require('../middleware/auth.middleware')
const router = Router()

router.post('/create-car', auth, async (req, res) => {
    try {
        const {
            carMark,
            carModel,
            carYear,
            carEngine,
            carNumber,
            carVinCode,
            carColor,
            client
        } = req.body

        // const baseUrl = config.get('baseUrl')

        // const existing = await Car.findOne({carMark}) 

        // if (existing) {
        //     return res.json({ car: existing})
        // }

        // console.log(client)

        const car = new Car({
            carMark: carMark,
            carModel: carModel,
            carYear: carYear,
            carEngine: carEngine,
            carNumber: carNumber,
            carVinCode: carVinCode,
            carColor: carColor,
            client: client,
            owner: req.user.userId
        })

        await car.save()
        res.json(car)

    } catch (e) {
        res.status(500).json({message: 'Some server error...'})
    }
})

router.get('/', auth, async (req, res) => {
    try {
        const cars = await Car.find({owner: req.user.userId})    
        res.json(cars)
    } catch (e) {
        res.status(500).json({message: 'Some server error...'})
    }
})

router.get('/:id', auth, async (req, res) => {
    try {
        const car = await Car.findById(req.params.id)
        res.json(car)
    } catch (e) {
        res.status(500).json({message: 'Some server error...'})
    }
})

router.get('/clientCars/:id', auth, async (req, res) => {
    try {
        const car = await Car.find({client: req.params.id})
        res.json(car)
    } catch (e) {
        res.status(500).json({message: 'Some server error...'})
    }
})

router.delete('/:id', auth, async(req, res) => {
    try {
        const car = await Car.findByIdAndDelete(req.params.id)
        res.json('ok')
    } catch {
        res.status(500).json({message: 'Some server error...'})
    }
})

module.exports = router
