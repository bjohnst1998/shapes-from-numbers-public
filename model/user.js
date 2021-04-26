const mongoose = require('mongoose');


const userSchema = mongoose.Schema(
    {
        username:{
            type:String,
            required:[true,'Required Field']
        },
        password:{
            type:String,
            required:[true,'Required Field']
        },
        shapesCreated: {
            type:Number,
        }
    }
)

module.exports = mongoose.model('users',userSchema);