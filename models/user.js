// jshint esversion:8

const mongoose = require('mongoose');
const { isEmail }  = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:[true,'Please enter a username'],
        unique:true,
        trim:true,
        lowercase:true
    },
    email:{
        type:String,
        required:[true,'Please enter an email'],
        unique:true,
        lowercase:true,
        validate:[isEmail,'Please enter a valid email']
    },
    password:{
        type:String,
        required:[true,'Please enter password'],
        minlength:[8,'Minimum password length must be 8 characters']
    },
    blogs:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Blog"
    },
    following:{
        type:Array
    },
    followers:{
        type:Array
    }
});

// fire a function before doc is saved to DB

userSchema.pre('save',async function(next){
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password,salt);
    next();
});


// static method to login user

userSchema.statics.login = async function(email,password){
    const user = await this.findOne({ email });
    if(user){
        const auth = await bcrypt.compare(password,user.password);
        if(auth){
            return user;
        }
        throw Error('Incorrect Password');
    }
    throw Error('Incorrect Email');
};



const User = mongoose.model('user',userSchema);
module.exports = User;