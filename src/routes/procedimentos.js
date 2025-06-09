const express = require('express');
const router = express.Router();
const ProcedimentosController = require('../controllers/ProcedimentosController');

router.get('/', ProcedimentosController.listar);
router.post('/', ProcedimentosController.criar);
router.put('/:id', ProcedimentosController.atualizar);
router.delete('/:id', ProcedimentosController.excluir);

module.exports = router;
