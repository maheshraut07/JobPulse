import {User} from '../models/user.model.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'


// business logic for registering the user

export const register = async (req,res) => {
    try{
        const {fullname, email, phoneNumber, password, role} = req.body
        if(!fullname || !email || !phoneNumber || !password || !role){
            return res.status(400).json({
                message:"Somethinng is Missing",
                success:false
            });
        }

        const user = await User.findOne({email})
        if(user){
            return res.status(400).json({
                message:"User already exist with this email",
                success:false,
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        await User.create({
            fullname,
            email,
            phoneNumber,
            password:hashedPassword,
            role,
        })

        return res.status(201).json({
            message:"Account created Successfully !!!",
            success:true
            
        })

    }catch(error){
        console.log(error)
    }
}

// business logic for logggin in the user 

export const login = async (req,res) =>{
    try {
        const {email, password, role} = req.body
        if(!email || !password || !role){
            return res.status(400).json({
                message:"Something is Missing !!!",
                success:false
            })
        }

        let userToBeLoggedIn = await User.findOne({email})

        if(!userToBeLoggedIn){
            return res.status(400).json({
                message:"User does not Exists !!!",
                success:false
            })
        }

        const isPasswordMatch = await bcrypt.compare(password, userToBeLoggedIn.password)
        if(!isPasswordMatch){
            return res.status(400).json({
                message:"Incorrect Email of Password !!!",
                success:false
            })
        }
        
        if(role !== userToBeLoggedIn.role){
            return res.status(400).json({
                message:"User does not exist with this role !!!",
                success:false
            })
        }

        const tokenData = {
            userId: userToBeLoggedIn._id
        }

        const token = await jwt.sign(tokenData, process.env.SECRET_KEY, {expiresIn:'1d'})

        userToBeLoggedIn = {
            _id:userToBeLoggedIn._id,
            fullname:userToBeLoggedIn.fullname,
            email:userToBeLoggedIn.email,
            phoneNumber:userToBeLoggedIn.phoneNumber,
            role:userToBeLoggedIn.role,
            profile:userToBeLoggedIn.profile
        }

        return res.status(200).cookie("token", token, {maxAge:1*24*60*60*1000, httpsOnly:true, sameSite:'strict'})
        .json({
            message:`Welcome back ${userToBeLoggedIn.fullname}`,
            userToBeLoggedIn,
            success:true
        })

    } catch (error) {
        console.log(error)
    }
}


// Buiness Logic for the logout 

export const logout = async (req,res) => {
    try {
        return res.status(200).cookie("token", "", {maxAge:0}).json({   // for setting the value of the cookie to blank and setting the expiration time to 0 means deleting the cookie 
            message:"Logged Out successfully !!!",
            success:true
        })
        
    } catch (error) {
        console.log(error)
    } 
}

// Business Logic for updating the profile

export const updateProfile = async (req,res) => {
    try {
        const {fullname, email, phoneNumber, bio, skills} = req.body
        const file = req.file
        // cludinary will be here for accessing the files 
        let skillsArray
        if(skills) skillsArray = skills.split(",")
        const userId = req.id // the req.id will be fetched by the middleware authentication

        
        let user = await User.findOne(userId)

        if(!user){
            return res.status(400).json({
                message:"User not found !!!",
                success:false
            })
        }
        

        // updating the data
        if(fullname) user.fullname = fullname
        if(email) user.email = email
        if(phoneNumber) user.phoneNumber = phoneNumber
        if(bio) user.profile.bio = bio
        if(skills) user.profile.skills = skillsArray

        //saving the user in the mongodDB collection
        await user.save()
        user = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile
        }

        return res.status(200).json({
            message:"profile updated successfully !!!",
            user,
            success:true
        })
        
    } catch (error) {
        console.log(error)
    }
}