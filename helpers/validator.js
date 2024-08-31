const { ExpressValidator } = require("express-validator");

const {check}= ExpressValidator


exports.registerValidator=[
    check('name').not().isEmpty().withMessage('Name is required'),
    check('email').isEmail().normalizeEmail({
        gmail_remove_dots:true
    }).withMessage('Invalid email'),
    check('password').isLength({min:8}).withMessage('Password must be at least 8 digits long')
]

