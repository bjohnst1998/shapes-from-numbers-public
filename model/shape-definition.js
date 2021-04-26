const mongoose = require('mongoose');

const shapeDefSchema = new mongoose.Schema({
    shapeNumber:{
        type:Number,
        required:true,
    },
    shapeName:{
        type:String,
        required:true
    }
});

module.exports = mongoose.model('ShapeDefinition',shapeDefSchema);