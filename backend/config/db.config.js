const mongoose = require('mongoose');

module.exports = () => {
    mongoose.connect(process.env.DB_URL)
    .then(()=>{
        console.log("DB connected")
    }).catch((err)=>{
        console.log("Connection failed",err);
    })
}