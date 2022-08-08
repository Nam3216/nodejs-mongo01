const mongoose= require("mongoose")
//me conecto base de datos
mongoose.connect("mongodb://localhost/ecommerce",function(error){
    if(error){
        throw error
    }else{
        console.log("ok")
    }

})

//exporto mongoose
module.exports=mongoose


