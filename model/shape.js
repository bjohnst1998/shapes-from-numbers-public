const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');

var connection = mongoose.connection;
autoIncrement.initialize(connection);

const shapeSchema = new mongoose.Schema({
    shapeId:{
        type:Number,        
    },
    shapeName:{
        type:String,
        required:true
    },
    createdBy:{
        type: String,
        required:true
    },
    lastModifiedBy:{
        type:String,
        
        
    }
});

shapeSchema.plugin(autoIncrement.plugin,{
    model:'Shape',
    field:'shapeNumber',
    startAt:1000,
    incrementBy:1
});
module.exports = connection.model('Shape',shapeSchema);