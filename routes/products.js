var express = require('express');
var router = express.Router();

//const { verifyToken } = require('../app');

/* GET users listing. */

const productControllers=require("../controllers/productControllers")
//get destacados
router.get('/', productControllers.getDestacado);
//get all
router.get('/all', productControllers.getAll);
//get id
router.get('/detail/:id', productControllers.getById);

//recibo desde el front end ya el id del category
router.get('/category/:category', productControllers.getByCategory);
//create product
router.post('/',(req,res,next)=>{req.app.verifyToken(req,res,next)}, productControllers.create);
//update product
router.put('/update/:id', productControllers.updateItem);
//delete product
router.delete('/delete/:id', productControllers.delete);




module.exports = router;
