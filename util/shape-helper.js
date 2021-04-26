const shapeDefController = require('../controller/ShapeDefController');

const transformShape = async (req,res,next) => {
    const shapeId = req.body.shape;
    const shapeName = await shapeDefController.FindShape(shapeId);
    if(shapeName)
    {
        req.body.shape = shapeName;
        next();
    }
    else{
        req.status(400).send(`No shape with number of ${shapeId} exists`);
    }

}

module.exports = transformShape;