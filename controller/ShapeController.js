const shapeModel = require('../model/shape');
const userHelper = require('../util/userHelper');

exports.ViewAll = async(req,res) =>{
    try{
    var allShapes = await shapeModel.find();
    res.status(200).send(allShapes);

    }catch(err){
        console.log(err);
        res.status(500).send(`An error has occurred`);
    }
}

exports.View = async(req,res) =>{
    try{
    var shape = await shapeModel.find({shapeId:req.params.id});
    res.status(200).send(shape);

    }catch(err){
        console.log(err);
        res.status(500).send(`An error has occurred`);
    }
}

exports.Create = async(req,res) =>{
    try{
        var shapeName =  req.body.shape;
        var createdBy = req.session.user;
        console.log(req.session);
        const newShape = await shapeModel.create({shapeName:shapeName,createdBy:createdBy});
        userHelper.IncrementCreated();
        res.status(201).send(newShape);
    }catch(err){
        console.log(err);
        res.status(500).send(`An error has occurred`);
    }
}

exports.Update = async (req,res)=>{
    try{
        console.log(req.params.id);
        var shapeName = req.body.shape;
        var updatedBy =req.session.user;
        console.log(updatedBy);
        console.log(shapeName);
        const updatedShape = await shapeModel.findOneAndUpdate({shapeNumber:req.params.id},{shapeName:shapeName,lastModifiedBy:updatedBy},{new:true})

        res.status(200).send(`Shape updated successfully ${updatedShape}`);
    }catch(err){
        console.log(err);
        res.status(500).send(`An error has occurred`);
    }
}

exports.Delete = async (req,res) =>{
    try{
        const shapeToDelete = await shapeModel.findOne({shapeNumber:req.params.id});
        const sesUser = req.session;
        if(shapeToDelete)
        {
            if(shapeToDelete.createdBy ==sesUser.user || shapeToDelete.lastModifiedBy == sesUser.user)
            {
                const deleted = await shapeModel.findOneAndDelete({shapeNumber:req.params.id});
                res.status(202).send(deleted);
            }
            else{
                res.status(400).send('You do not have permission to delete this resource')
            }
        }
    }catch(err){
        console.log(err);
        res.status(500).send(`An error has occurred`);
    }
}