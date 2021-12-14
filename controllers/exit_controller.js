const User = require('../models/user');
const Entry = require('../models/entry');

// GET
// /exit
module.exports.renderExitPage = function(req, res){
    return res.render('exit', {
        title: 'College Hawk | Exit'
    });
};

// GET
// /exit/:email
module.exports.verifyUserExit = async function(req, res){
    try{
        // xhr requests only
        let user = await User.findOne({
            email: req.params.email
        });

        if(!user){
            return res.status(404).json({
                message: "This user does not exist in our Database"
            });
        }

        if(user.entered == false){
            return res.status(401).json({
                message: "This user has not entered the college!"
            });
        }

        // user exists and has entered the college
        user.entered = false;
        await user.save();
        await Entry.create({
            user: user._id,
            status: 'exit'
        });
        // req.flash('success', `${user.name} has exited the college!`);
        return res.status(200).json({
            message: `${user.name} has exited the college!`
        });
    } catch(err){
        console.log(err);
        res.redirect('back')
    }
};