const productsModel=require("../models/productModels")

module.exports={

    getDestacado:async function(req, res, next) {
        
        try{//pongo el populate para que en campo category traiga un objeto con name id
            //en populate pongo el nombre del campo que quiero aparezca abierto
            const items= await productsModel.find({destacado:true}).populate("category")
            res.status(200).json(items)
            console.log("exito")

        }
        catch(error){
            res.json(error.mesage)
        }
        
      },

    getAll:async function(req, res, next) {
        
        try{//pongo el populate para que en campo category traiga un objeto con name id
            //en populate pongo el nombre del campo que quiero aparezca abierto
            const items= await productsModel.find().populate("category")
            res.status(200).json(items)
            console.log("exito")

        }
        catch(error){
            res.json(error.mesage)
        }
        
      },
      //devuelvo get by id
      getById:async function(req,res,next){
        let id=req.params.id
        try{
            const item= await productsModel.findById(id)
            res.status(200).json(item)
        }
        catch(error){
            res.json(error.message)
        }
      },
      //devuelvo get by category
      getByCategory:async function(req,res,next){
        let categoryOk=req.params.category
        try{
            const items= await productsModel.find({category:categoryOk})
            res.status(200).json(items)
        }
        catch(error){
            res.json(error.message)
        }
      },

      
      //crear producto
    create:async function(req, res, next) {
        
        try{
            const newProduct= new productsModel({
                name:req.body.name,
                price:req.body.price,
                quantity:req.body.quantity,
                description:req.body.description,
                category:req.body.category//recibe el id de la category
            })
            const item= await newProduct.save()
            res.status(200).json(item)

        }
        catch(error){
            res.json(error.message)
           
        }
        
      },

      updateItem:async function(req,res,next){
        try{
            const item=await productsModel.updateOne({_id:req.params.id},req.body)
            res.status(200).json(item)
        }   
        catch(error){
            res.json(error.message)
        }
      },

      delete:async function(req,res,next){
        try{
            const item=await productsModel.deletOne({_id:req.params.id})
            res.status(200).json(item)
        }   
        catch(error){
            res.json(error.message)
        }
      }
}