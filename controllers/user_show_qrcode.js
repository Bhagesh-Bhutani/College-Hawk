const User = require('../models/user');

module.exports.showUserQRCode = async function(req, res){
    try{
        let user = await User.findById(req.params.id);
        if(!user){
            return res.status(404).send('User for supplied ID not found!');
        }
        return res.render('user_show_qrcode', {
            title: `QR Code for ${user.name}`,
            user: user
        });
    } catch(err){
        console.log(err);
        return res.status(500).send('Internal Server Error');
    }
};