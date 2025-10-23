const express = require('express');
const cuentasRoutes = require('./routes/cuentasRoutes');

const app = express();
const PORT = 3130;

// Middleware para entender JSON
app.use(express.json());

// Usar las rutas definidas con un prefijo /api
app.use('/api', cuentasRoutes);

// Ruta raíz de bienvenida
app.get('/', (req, res) => {
    res.send('¡Bienvenido a la API de Cuentas!');
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo exitosamente en http://localhost:${PORT}`);
});