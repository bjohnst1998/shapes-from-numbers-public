const bcrypt = require('bcryptjs');
const userController = require('../controller/UserController');
exports.signUpHelper = async(req,res,next) =>{
    const saltRound =12;
    const salt = await bcrypt.genSalt(saltRound);

    var pass = req.body.password;
    const hashPassword = await bcrypt.hash(pass,salt);
    req.body.password = hashPassword;
    next();
}

exports.IncrementCreated = async(username) => {
    userController.UpdateShapeCount(username);
}


