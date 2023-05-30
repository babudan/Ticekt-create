const mongoose = require("mongoose")

const userModel = new mongoose.Schema({
     
    name : {type : String ,require : true },
    
    email: { type: String, required: true, unique: true },
   
    password: { type: String, required: true}
},
    { timestamps: true }
)

module.exports = mongoose.model("user_ticket",userModel)
