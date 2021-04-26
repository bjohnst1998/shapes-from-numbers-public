const userModel = require('../model/user');
const session = require('express-session');
const bcrypt = require('bcryptjs');
const SESS_NAME = 'user';
exports.Signup = async(req,res) => {
    const userName = req.body.username;
    const pass = req.body.password;

    //Check username & password to make sure the match conditions:
    try{
        const existingUser = await userModel.findOne({username:userName});
        console.log(`Found user? ${existingUser}`);
        if(existingUser == null)
        {
            const createdUser = await userModel.create({username:userName,password:pass,shapesCreated:0});
            res.status(201).json({
                status:'success',
                message:`User created successfully: ${createdUser.username}`
            });   
        }
        else{
            console.log(`User already exists with Username ${userName}`);
            res.status(400).json({
                status:'fail',
                message:`User already exists with Username ${userName}, please try again with a different username.`
            });
        }
    }catch(err)
    {
        console.log(err);
        res.status(500).json({
            message:`An error has occured: ${err}`
        });
    }
}

exports.Login = async(req,res) => {
    const user = req.body.username;
    const pass = req.body.password;
    try{      
        const existingUser = await userModel.findOne({username:user});
        if(existingUser)
        {
            const match = await bcrypt.compare(pass,existingUser.password);
            //Check to see if user is already logged in using session.
            if(req.session.user == user)
            {
                res.status(200).json({
                message:`You're already logged in!`
                });
            }
            else{
                if(match)
                {
                    req.session.user = existingUser;
                    res.status(200).json({
                    message:"You've been signed in!"
                    });
                }      
            }
        }
        else{
            res.status(401).json({
                message:"Username/password is incorrect"
            })
        }
    } catch(err) {
        console.log(err);
        res.status(500).json({
            message:`An error has occured: ${err}`
        });
    }
    
}

exports.Logout = async (req,res) => {
    const user = req.session.user;
    if(user)
    {
        req.session.destroy((err)=>{
            res.clearCookie(SESS_NAME);
        })
        res.status(200).send("Logged out!");
    }else{
        res.status(400).send("You're not logged in!");
    }
}

exports.UpdateShapeCount = async(username) =>{
    try{
        const user = username;
        const userToUpdate = await userModel.findOne({username:user});
        console.log(user);
        var count = userToUpdate.shapesCreated + 1;
        const updatedValue = await userModel.findOneAndUpdate({username:user},{shapesCreated:count},{new:true});
        console.log(updatedValue);
    }catch(err)
    {
        throw new Error(`An Error has occurred: ${err}`);
    }

    
}

