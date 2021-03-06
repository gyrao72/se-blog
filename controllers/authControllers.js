// jshint esversion:8

const User = require('../models/user');
const jwt = require('jsonwebtoken');

// Handle errors

const handleError = (err)=>{
    console.log(err.message,err.code);
    let errors = {username:'',email:'',password:''};

    if(err.code === 11000){
        errors.username = 'Username or Email is already registered';
    }

    // incorrect email
    if(err.message === 'Incorrect Email'){
        errors.email = 'Email not registered';
    }

    // incorrect password
    if(err.message === 'Incorrect Password'){
        errors.password = 'Incorrect Password';
    }


    if(err.code === 11000){
        errors.email = 'Username or Email is already registered';
        return errors;
    }

    if(err.message.includes('user validation failed')){
        Object.values(err.errors).forEach(({properties}) =>{
            errors[properties.path] = properties.message;
        });
    }

    return errors;
};

const maxAge = 7*3600*24;
const createToken = (id)=>{
    return jwt.sign({ id },"Gajendar",{
        expiresIn:maxAge
    });
};


module.exports.signup_get = (req,res)=>{
    res.render('signup');
};


module.exports.signup_post = async (req,res)=>{
    const {username,email,password} = req.body;

    try{
        const user =await User.create({username, email, password});
        const token = createToken(user._id);
        res.cookie('jwt',token,{httpOnly:true,maxAge:maxAge*1000});
        res.status(201).json({user:user._id});
    }
    catch(err){
        const errors = handleError(err);
        res.status(400).json({ errors });
    }
};





module.exports.login_get = (req,res)=>{
    res.render('login');
};


module.exports.login_post = async (req,res)=>{
    const {email,password} = req.body;

    try{
        const user = await User.login(email,password);
        const token = createToken(user._id);
        res.cookie('jwt',token,{httpOnly:true,maxAge:maxAge*1000});
        res.status(200).json({user:user._id});
    }
    catch(err){
        const errors = handleError(err);
        res.status(400).json({errors});
    }
};


module.exports.logout_get = (req,res)=>{
    res.cookie('jwt','',{maxAge:1});
    res.redirect("/");
};