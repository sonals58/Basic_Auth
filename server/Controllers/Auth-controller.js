const User = require('../Models/user-models');
const bcrypt = require("bcrypt");

const home = async (req, res) =>{
    try{
        res
       .status(200)
       .json("authwala");
    }
    catch(error){
        console.log(error);
    }
}
const registeration = async(req, res) =>{
    try{
        console.log(req.body);
        const {username, email, phone, password} = req.body;

        const UserExist =await User.findOne({email});
        if(UserExist != null){
            res.status(400).json("Email already exist.");
        }
        //if doesnt exist
        //now hash pw
        
        //const saltRound =10;
        //const hash_password= await bycrpt.hash(password, saltRound);
        const UserCreated = await User.create({username,email,phone,password});

        res
       .status(201)
       .json({msg: "Registration Successful", token: await UserCreated.generateToken(), userId: UserCreated._id.toString()});
    }
    catch(error){
        res
        .status(500)
        .json({message: "Internal Server Error" });
    }
}

const login = async (req, res) => {
    try{
        const {email, password} = req.body;

        const userExist = await User.findOne({email});
        console.log(userExist);
        if(!userExist){
            return res.status(400).json({message:"Invalid Credentials/do registration"});
        }
        //const validPassword = await bcrypt.compare(password, userExist.password);
        const validPassword = await userExist.comparepassword(password);
        if(validPassword){
         res.status(200).json({message: "Login Successful",token: await userExist.generateToken(),userId: userExist._id.toString()});
        }
        else{
            res.status(401).json({message:"Invalid email or password"});
        }
    }
    catch(error){
        //res
        //.status(500)
        //.json({message: "Internal Server Error" });
        next(error);
    };
}
module.exports={home, registeration, login};