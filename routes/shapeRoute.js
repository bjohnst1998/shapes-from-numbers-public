const express = require('express');
const shapeHelper = require('../util/shape-helper');
const shapeController = require('../controller/ShapeController');
const routing = express.Router();

routing.get('/view',shapeController.ViewAll);
routing.get('/view/:id',shapeController.View);

routing.post('/create',shapeHelper,shapeController.Create);

routing.put('/update/:id',shapeHelper,shapeController.Update);

routing.delete('/delete/:id',shapeController.Delete);

module.exports = routing;