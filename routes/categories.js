var express = require('express');
var router = express.Router();
const categoriesControllers=require("../controllers/categoriesControllers")

/* GET users listing. */


router.get('/', categoriesControllers.get);

//router.post('/', productControllers.create);

module.exports = router;
