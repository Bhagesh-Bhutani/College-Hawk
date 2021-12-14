const mongoose = require('mongoose');
const env = require('./environment');

const db = mongoose.connection;

db.on('error', function(err){
    console.log("Error while connecting to MongoDB");
    console.log(err);
});

db.once('open', function(){
    console.log("Successfully connected to MongoDB");
});

mongoose.connect(env.db, {useNewUrlParser: true, useUnifiedTopology: true})
.catch(err => {
    console.log("Initial error while connecting to MongoDB");
    console.log(err);
});

module.exports = db;