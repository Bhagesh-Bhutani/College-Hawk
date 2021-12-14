const nodeMailer = require('../config/nodemailer');
const env = require('../config/environment');

module.exports.sendQRCode = async function(user){
    try{
        console.log('Inside QR Code for Create User Mailer');
        let htmlString = await nodeMailer.renderTemplate({
            user: user
        }, '/register_qrcode.ejs');

        let info = await nodeMailer.transporter.sendMail({
            from: env.smtp.auth.user,
            to: user.email,
            subject: 'Created User on College Hawk | QR Code',
            html: htmlString
        });

        console.log(info);
    } catch(err){
        console.log("Error while sending Qr Code User Mail");
    }
};