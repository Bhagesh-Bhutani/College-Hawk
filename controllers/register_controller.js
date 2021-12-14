const User = require('../models/user');
const userMailer = require('../mailers/create_user_qrcode_mailer');
var shortUrl = require('node-url-shortener');

// GET
// /register
module.exports.getRegisterPage = function(req, res){
    return res.render('user_register', {
        title: 'College Hawk | Register'
    });
};

// POST
// /register
module.exports.createUser = async function(req, res){
    try{
        let findUser = await User.findOne({
            email: req.body.email
        });
        console.log(findUser);
        if(findUser){
            if(req.xhr){
                return res.status(401).json({
                    message: "This User's Email_ID already Exists!"
                });
            }
            req.flash('error', 'User with same Email-ID already Exists!');
            return res.redirect('back');
        }

        let user = await User.create(req.body);
        console.log(req.body);
        userMailer.sendQRCode(user);
        if(req.xhr){
            return res.status(200).json({
                data: {
                    user: user
                },
                message: "User created successfully!"
            });
        }
        return res.redirect(`/qrcode/show/${user._id}`);
    } catch(err){
        console.log(err);
        return res.status(500).send('Error while creating the user, please try again!');
    }
};