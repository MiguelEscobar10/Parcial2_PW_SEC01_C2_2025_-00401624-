// Simulación de una base de datos con los datos generados
const db = [
    {
      "id": "60d21b4667d0d8992e610c85",
      "isActive": true,
      "picture": "https://files.consumerfinance.gov/f/images/protected-money_1140x642_ai_fw_io.original.png",
      "balance": "$2,525.23",
      "client": "Katie Woodard",
      "gender": "female"
    },
    {
      "id": "60d21b4679413d3e6b215810",
      "isActive": false,
      "picture": "https://files.consumerfinance.gov/f/images/protected-money_1140x642_ai_fw_io.original.png",
      "balance": "$3,291.89",
      "client": "John Doe",
      "gender": "male"
    },
    {
      "id": "60d21b46a2e4b4a115e5a8c2",
      "isActive": true,
      "picture": "https://files.consumerfinance.gov/f/images/protected-money_1140x642_ai_fw_io.original.png",
      "balance": "$1,452.77",
      "client": "Jane Smith",
      "gender": "female"
    },
    {
      "id": "60d21b46e8c7c9c0b8b2e1b9",
      "isActive": true,
      "picture": "https://files.consumerfinance.gov/f/images/protected-money_1140x642_ai_fw_io.original.png",
      "balance": "$5,876.54",
      "client": "Peter Jones",
      "gender": "male"
    },
    {
      "id": "60d21b46f3a3a4b9c1d0f8f6",
      "isActive": false,
      "picture": "https://files.consumerfinance.gov/f/images/protected-money_1140x642_ai_fw_io.original.png",
      "balance": "$9,123.45",
      "client": "Mary Williams",
      "gender": "female"
    },
    {
      "id": "60d21b46b3f8e5d7c4a9a2a1",
      "isActive": true,
      "picture": "https://files.consumerfinance.gov/f/images/protected-money_1140x642_ai_fw_io.original.png",
      "balance": "$4,567.89",
      "client": "David Brown",
      "gender": "male"
    },
    {
      "id": "60d21b46c9d8a7b5e3f1e4d7",
      "isActive": true,
      "picture": "https://files.consumerfinance.gov/f/images/protected-money_1140x642_ai_fw_io.original.png",
      "balance": "$7,890.12",
      "client": "Susan Davis",
      "gender": "female"
    }
];

// Función para obtener todas las cuentas
const obtenerCuentas = (req, res) => {
    res.json({
        count: db.length,
        data: db
    });
};

// Función para obtener una cuenta por su ID
const obtenerCuentaPorId = (req, res) => {
    const { id } = req.params;
    const cuenta = db.find(cuenta => cuenta.id === id);

    if (cuenta) {
        res.json({
            finded: true,
            account: cuenta
        });
    } else {
        res.status(404).json({
            finded: false,
            account: {}
        });
    }
};

// Función para buscar cuentas por un parámetro de consulta (ID o nombre)
const buscarCuentas = (req, res) => {
    const parametro = req.query.param;
    
    if (!parametro) {
        return res.status(400).json({ error: 'Se requiere un parámetro de búsqueda "param".' });
    }

    const resultados = db.filter(cuenta =>
        cuenta.id.toLowerCase().includes(parametro.toLowerCase()) ||
        cuenta.client.toLowerCase().includes(parametro.toLowerCase())
    );

    if (resultados.length > 0) {
        if (resultados.length === 1) {
            res.json({
                finded: true,
                account: resultados[0]
            });
        } else {
            res.json({
                finded: true,
                data: resultados
            });
        }
    } else {
        res.status(404).json({
            finded: false,
            data: []
        });
    }
};

const obtenerBalanceTotal = (req, res) => {
    // 1. Filtrar las cuentas que tienen el estado isActive = true
    const cuentasActivas = db.filter(cuenta => cuenta.isActive);

    // 2. Verificar si se encontraron cuentas activas
    if (cuentasActivas.length === 0) {
        return res.json({
            status: false,
            accountBalance: 0
        });
    }

    // 3. Sumar los balances de las cuentas activas
    const balanceTotal = cuentasActivas.reduce((total, cuenta) => {
        // Convertir el string del balance a un número
        // Ejemplo: "$2,525.23" -> "2525.23" -> 2525.23
        const valorNumerico = parseFloat(cuenta.balance.replace('$', '').replace(',', ''));
        return total + valorNumerico;
    }, 0); // El 0 es el valor inicial del total

    // 4. Devolver la respuesta exitosa
    res.json({
        status: true,
        accountBalance: balanceTotal.toFixed(2) // .toFixed(2) para asegurar dos decimales
    });
};

module.exports = {
    obtenerCuentas,
    obtenerCuentaPorId,
    buscarCuentas,
    obtenerBalanceTotal
};