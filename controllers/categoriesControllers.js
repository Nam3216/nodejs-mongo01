const categoriesModel=require("../models/categoriesModels")

module.exports={

    get:async function(req,res,next){
        try{
            const items=await categoriesModel.find()
            res.status(200).json(items)

        }catch(error){
            res.status(400).json(error.message)
        }
    }
}