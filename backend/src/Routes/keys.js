const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

const Key = require('../Models/Key');

// Ruta para obtener todas las llaves
router.get('/', async (req, res) => {
    try {
        const keys = await Key.find();
        res.json(keys);
    } catch (error) {
        res.json({message: error});
    }
}
);

// Ruta para obtener una llave por su ID
router.get('/:keyId', async (req, res) => {
    try {
        const key = await Key.findById(req.params.keyId);
        res.json(key);
    } catch (error) {
        res.json({message: error});
    }
}
);

// Ruta para crear una llave
router.post('/', async (req, res) => {
    const {position} = req.body;

    const newKey = new Key({
        position
    });

    try {
        await newKey.save();
        res.json({message: 'Llave creada exitosamente'});
    } catch (error) {
        res.json({message: error});
    }
}
);

module.exports = router;