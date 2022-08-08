const usersModels=require("../models/usersModels")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")

module.exports={

    create:async function(req,res,next){
        try{
            const newUser= new usersModels({
                name:req.body.name,
                email:req.body.email,
                password:req.body.password
            })

            const item=await newUser.save()
            res.status(200).json(item)
        }
        catch(error){
            res.json(error.message)
        }
    },
    get:async function(req,res,next){
        try{
           
            const item=await usersModels.find()
            res.status(200).json(item)
        }
        catch(error){
            res.json(error.message)
        }

    },
//para el login,recibo desde front end email(username) y password
    login:async function(req,res,next){
        try{
           //busco metodo findone un email que coincida con el que ya esta en base de datos
            const checkUser=await usersModels.findOne({email:req.body.email})
            //si no encontro el mail, es undefined, entonces entra aca
            if(checkUser==undefined){
                return  res.json("error,no coincide mail")
                
            }
            //si no es undefined es q encontro mail, hace la comparacion del password que mando user y de la base de datos. si esta ok manda token, sino error
            else if(bcrypt.compareSync(req.body.password,checkUser.password)){
                const token=jwt.sign({userId:checkUser._id},"claveok2020",{expiresIn:"5h"})
                res.status(200).json({token})
            }else{
                return res.json("error,no coincide password")
                
            }
            
            
        }
        catch(error){
            res.json(error.message)
            
        }

    },



    
}