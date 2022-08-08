const mongoose=require("../config/mongodb")
const errorsOk=require("../services/errors")

const ecommerceSchema= mongoose.Schema({
    name:{
     
      type:String,
      required:[true,errorsOk.general.requiredError],
      lowercase:true

    },
    price:{
        type:Number,
        required:true,
        //getter para incluir el iva
        get:(value)=>{
            return value * 1.21
        }
    },
    quantity:{
        type:Number,
            
        required:true,
        min:[1,errorsOk.general.minNumber]
    },      
    description:String,
    category:{
        type:mongoose.Schema.ObjectId,
        ref:"categories"
    },
    codigo:Number,
    destacado:Boolean
},{collection:"products"})

//virtual incluye campo tax, para decir que esta incluido
ecommerceSchema.virtual("tax").get(()=>{
    return `incluido`
} )

ecommerceSchema.set("toJSON",{getters:true,virtuals:true})
module.exports=mongoose.model("products",ecommerceSchema) 