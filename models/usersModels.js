const mongoose=require("../config/mongodb")
const errors=require("../services/errors")
const validators=require("../services/validators")

const bcrypt=require("bcrypt")

const usersSchema= mongoose.Schema({
    name:{
        type:String,
        required:[true,errors.general.requiredError]
    },
    email:{
        type:String,
        unique:[true,errors.general.unicoMail],
        required:[true,errors.general.requiredError],
    },
    password:{
        type:String,
        required:[true,errors.general.requiredError],
        //validar que el email cuente con los requisitos que pide en el archivo validators
        //la funcion recibe value que es el password que posteo el user
       validate:{validator:function (value){
            return validators.passwordOk(value)
        },
        message:"El password es incorrecto"},
        
       
    }   
},{collection:"users"})

//encritp el password
//tambien se puede aplicar el encriptado en un setter

usersSchema.pre("save",function(next){
    this.password=bcrypt.hashSync(this.password,10)
    next()
})

usersSchema.set("toJSON",{setters:true})
module.exports=mongoose.model("users",usersSchema)