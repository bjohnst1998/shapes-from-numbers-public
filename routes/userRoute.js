const express = require('express');
const userHelper = require('../util/userHelper');
const routing = express.Router();
const userController = require('../controller/UserController');
const shapeDefController = require('../controller/ShapeDefController');

routing.get('/logout',userController.Logout);
routing.get('/availableShapes',shapeDefController.GetShapes);

routing.post('/signup',userHelper.signUpHelper,userController.Signup);
routing.post('/login',userController.Login);
routing.post('/newShape',shapeDefController.AddShape);


routing.all('*',invalid);
//sends a 404 back to the user if any other URI is used.
async function invalid(req,res)
{
    res.status(404).json({
        message:'Resource not Found'
    })
}

module.exports = routing;