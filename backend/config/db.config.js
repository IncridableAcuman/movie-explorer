const mongoose = require('mongoose');

module.exports = () => {
    mongoose.connect(process.env.DB_URI)
    .then(()=>{
        console.log("DB connected")
    }).catch((err)=>{
        console.log("Connection failed",err);
    })
}