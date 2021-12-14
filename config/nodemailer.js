const nodemailer = require('nodemailer');
const ejs = require('ejs');
const env = require('./environment');
const path = require('path');

let transporter = nodemailer.createTransport(env.smtp);

let renderTemplate = async (data, relativePath) => {
    try {
        let mailHTML = await ejs.renderFile(
            path.join(__dirname, '../views/mailers', relativePath),
            data
        );

        return mailHTML;
    } catch(err){
        console.log("Error in rendering template");
    }
};

module.exports = {
    transporter: transporter,
    renderTemplate: renderTemplate
};