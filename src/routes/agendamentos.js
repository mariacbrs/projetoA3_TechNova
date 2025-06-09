const express = require('express');
const router = express.Router();
const AgendamentoController = require('../controllers/AgendamentoController');

router.get('/:id', AgendamentoController.listarPorUsuario);
router.get('/', AgendamentoController.listarTodos); // Para admin
router.post('/', AgendamentoController.criar);
router.put('/:id', AgendamentoController.remarcar);
router.delete('/:id', AgendamentoController.excluir);

module.exports = router;
