const User = require('../models/user');

// GET
// /qrcode
module.exports.getQRCodePage = function(req, res){
    return res.render('qrcode_scanner', {
        title: 'College Hawk | Scan QR Code'
    });
};

// GET
// /qrcode/:email
module.exports.getTemperaturePage = async function(req, res){
    try{
        let user = await User.findOne({
            email: req.params.email
        });

        if(!user){
            if(req.xhr){
                return res.status(404).json({
                    message: "This User is not present in our Database"
                });
            }

            return res.redirect('back');
        }

        // user is present in database
        if(user.entered){
            return res.status(401).json({
                message: "This user has already entered the college!"
            });
        }

        return res.status(200).json({
            data: {
                user: user
            },
            message: "Valid user, redirect to temperature page"
        });
    } catch(err){
        console.log(err);
        if(req.xhr){
            return res.status(500).json({
                message: "Internal Server Error while processing QR Code Details"
            });
        }

        return res.redirect('back');
    }
};