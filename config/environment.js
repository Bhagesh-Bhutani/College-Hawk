const development = {
    name: 'development',
    asset_path: './assets',
    db: 'mongodb://localhost:27017/college_hawk_development',
    smtp: {
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: process.env.CODEIAL_GMAIL_USER,
            pass: process.env.CODEIAL_GMAIL_PASSWORD
        }
    },
    session_cookie_key: 'vl4uxgNnhy5Vjlr6kXFbNe2PSmQGRn3k'
};

const production = {
    name: 'production',
    asset_path: './assets',
    db: process.env.MONGODB_URI,
    smtp: {
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: process.env.CODEIAL_GMAIL_USER,
            pass: process.env.CODEIAL_GMAIL_PASSWORD
        }
    },
    session_cookie_key: process.env.HAWK_SESSION_COOKIE_KEY
};

module.exports = process.env.NODE_ENV == "production" ? production : development;