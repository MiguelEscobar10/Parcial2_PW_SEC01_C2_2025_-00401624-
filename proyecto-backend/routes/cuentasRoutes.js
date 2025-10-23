const express = require('express');
const router = express.Router();
const { obtenerCuentas, obtenerCuentaPorId, buscarCuentas, obtenerBalanceTotal } = require('../controllers/cuentasController');

// GET -> /api/cuentas
router.get('/cuentas', obtenerCuentas);

// GET -> /api/cuenta/:id
router.get('/cuenta/:id', obtenerCuentaPorId);

// GET -> /api/cuentas?param=valor
// Nota: Renombrada para claridad en la implementación, pero cumple la misma función.
router.get('/cuentas/search', buscarCuentas);

// Ruta para obtener el balance total de las cuentas activas
// GET -> /api/cuentasBalance
router.get('/cuentasBalance', obtenerBalanceTotal);

module.exports = router;