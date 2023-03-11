const {Router} = require("express");
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const config = require('config')
const {check, validationResult} = require('express-validator')
const User = require('../models/User')
const router = Router()

// /api/auth/register
router.post(
    '/register', 
    [
        check('email', 'Email fault').isEmail(),
        check('password', 'Password fault').isLength({min: 6})
    ],    
    async (req, res) => {
    try {
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: `Incorrect register data`

            })
        }
        const {email, password} = req.body

        const candidate = await User.findOne({ email: email})

        if (candidate) {
            return res.status(400).json({message: "User exists"})
        }

        const hashedPassword = await bcrypt.hash(password, 12)
        const user = new User({ email, password: hashedPassword })
        
        await user.save()

        res.status(201).json({message: "User is created"})

    } catch (e) {
        res.status(500).json({message: 'Some server error...'})
    }
})

router.post(
    '/login', 
    [
        check('email', 'Enter correct email').normalizeEmail().isEmail(),
        check('password', 'Enter correct password').exists()
    ],
    async (req, res) => {
    try {
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: "Incorrect login data"
            })
        }

        const {email, password} = req.body
        
        const user = await User.findOne({ email })

        if (!user) {
            return res.status(400).json({message: "Email or Password error"})
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch) {
            return res.status(400).json({ message: "Email or Password error" })
        }

        const token = jwt.sign(
            { userId: user.id },
            config.get('jwtSecret'),
            { expiresIn: '3h' }
        )

        const tokenExpiresIn = new Date(new Date().setHours(new Date().getHours() + 3)).toISOString()

        res.json({token, userId: user.id, tokenExp: tokenExpiresIn})

    } catch (e) {
        res.status(500).json({message: 'Some server error...'})
    }
})

module.exports = router
