const shapeDef = require('../model/shape-definition');

exports.FindShape = async (shape)=>{
    const transformedShape = await shapeDef.findOne({shapeNumber:shape});
    if(transformedShape)
    {
        return transformedShape.shapeName;
    } else return null;

}

exports.GetShapes = async(req,res) => {
    const allShapes = await shapeDef.find();
    res.status(200).send(allShapes);
}

exports.AddShape = async(req,res) => {
    try{
    const newShape = await shapeDef.create({shapeNumber:req.body.shapeNumber,shapeName:req.body.shapeName});
    res.status(201).send(`New shape created: ${newShape}`);
    }catch (err)
    {
        console.log(err);
        res.status(500).send(`An error has occurred`);
    }
}