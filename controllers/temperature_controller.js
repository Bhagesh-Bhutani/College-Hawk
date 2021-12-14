const User = require('../models/user');
const Entry = require('../models/entry');

// GET
// /temperature/:id
module.exports.renderTemperaturePage = async function(req, res){
    try{
        let user = await User.findById(req.params.id);
        return res.render('temperature', {
            title: 'College Hawk | Temperature Check',
            user: user
        });
    } catch(err){
        console.log(err);
        return res.redirect('back');
    }
};

// POST
// /temperature/:id
module.exports.verifyUserTemperature = async function(req, res){
    try{
        let user = await User.findById(req.params.id);
        if(req.body.temperature > 37.8){
            req.flash('error', `${user.name} has recorded an abnormally high temperature, so he/she is not allowed in college. It
            is advised to take a covid19 test as soon as possible and produce the report on entry gate.`);
            return res.redirect('/');
        }

        user.entered = true;
        await user.save();
        await Entry.create({
            user: req.params.id,
            status: 'entry',
            temperature: req.body.temperature
        });

        // entry granted
        req.flash('success', `${user.name} has been granted entry to college!`);
        return res.redirect('/');
    } catch(err){
        console.log(err);
        if(req.xhr){
            return res.status(500).json({
                message: "Internal Server Error while checking temperature"
            });
        }
        return res.redirect('back');
    }
};