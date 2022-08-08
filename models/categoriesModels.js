const mongoose=require("../config/mongodb")

const categoriesSchema= mongoose.Schema({
    name:String,
},{collections:"categories"})

module.exports=mongoose.model("categories",categoriesSchema)