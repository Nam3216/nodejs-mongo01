var express = require('express');
var router = express.Router();
const usersControllers=require("../controllers/usersControllers")

/* GET users listing. */
router.get('/',usersControllers.get);

//crear usuario
router.post('/',usersControllers.create);

//login usuario
router.post("/login",usersControllers.login);

module.exports = router;
