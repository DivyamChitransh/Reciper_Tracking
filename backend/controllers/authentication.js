const User = require('../models/Usermodel.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = '1234567'

const signup = async(req,res) => {
    try{
        const {name,email,role,password} = req.body;
        const hashpass = await bcrypt.hash(password,10);
        const user = new User({name,email,role,password:hashpass});
        await user.save();
        res.status(201).json({message:'User Singed-up',user});
    }
    catch(error){
        res.status(500).json({error:error.message})
    }
}

const login = async(req,res) => {
    try{
        const {email,password} = req.body;
        const user = await User.findOne({email});
        if(!user){

        }
        const match = await bcrypt.compare(password,user.password);
        if(!match){
            return res.status(404).json({message:'Invalid Credentials!'});
        }
        const token = jwt.sign({userId:user._id},JWT_SECRET,{expiresIn:'1hr'});
        res.status(200).json({message:'Login Successful',token});
    }
    catch(error){
        res.status(500).json({error:error.message})
    }
};

module.exports = {signup,login};