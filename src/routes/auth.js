const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/AuthController');

router.post('/login', AuthController.login);
router.post('/register', AuthController.register);
router.put('/:id', AuthController.update); 

module.exports = router;
