const express=require("express");
const router=express.Router();
const bcrypt=require("bcryptjs")
const jwt=require("jsonwebtoken")
const auth=require("../middleware/auth")
const User=require("../models/userModel");


router.post("/register", async(req,res)=>{
    try{
        let {email,password,passwordCheck,displayName}=req.body;

        //validating
        if(!email || !password || !passwordCheck){
            return res.status(400).json({msg:"Not all fields have been entered"})
        }
        if(password.length<5){
            return res.status(400).json({msg:"Password length should be atleast 5 characters"})
        }
        if(password !== passwordCheck){
            return res.status(400).json({msg:"Password doesn't match"})
        }

        const existingUser=await User.findOne({email:email}); //equavalent to "email":"cheery@gmail" in db
        if(existingUser){
            return res.status(400).json({msg:"Email already exists"})
        }

        if(!displayName) displayName=email;//if name doesn't exist use email as name
        
        const salt=await bcrypt.genSalt();
        const passwordHash=await bcrypt.hash(password,salt);
        console.log(passwordHash)

        const newUser= new User({
            email,
            password:passwordHash,
            displayName,
        });
        const savedUser=await newUser.save();
        res.json(savedUser);
    }
  

    catch(err){
        return res.status(500).json({error:err.message})
    }
    
})

router.post("/login", async(req,res)=>{
    try {
        let {email,password} = req.body;

        //validating
        if(!email){
            return res.status(400).json({msg:"Not all fields have been entered"})
        }

        const user = await User.findOne({email:email});
        if(!user){
            return res.status(400).json({msg:"No account exist with this email Id"})
        }

        const isMatch=await bcrypt.compare(password,user.password)
        if(!isMatch){
            return res.status(400).json({msg:"Invalid Credentials"})
        }

        //token
        const token=jwt.sign({id:user._id}, process.env.JWT_SECRET);
        res.json({
            token,
            user:{
                id:user._id,
                displayName:user.displayName,
                
            }
        })
    } catch (err) {
        res.status(500).json({error:err.message});
    }
})

router.delete("/delete", auth, async(req,res)=>{
    //console.log(req.user) //we will id of the particular user
    try {
        const deletedUser=await User.findByIdAndDelete(req.user);
        res.json(deletedUser)
    } catch (err) {
        res.status(500).json({error:err.message});
    }
})

router.post("/tokenIsValid", async(req,res)=>{
    try {
        const token = req.header("x-auth-token");
        if(!token){
            return res.json(false)
        }

        const verified = jwt.verify(token,process.env.JWT_SECRET);
        if(!verified){
            return res.json(false)
        }

        const user = await User.findById(verified.id)
        if(!user){
            return res.json(false)
        }
        return res.json(true);
    } catch (err) {
        res.status(500).json({error:err.message});
    }
})

//getting user data from frontend
router.get("/",auth, async(req,res)=>{
    const user=await User.findById(req.user);
   res.json({
       displayName:user.displayName,
       id:user._id
    });
})

module.exports=router;