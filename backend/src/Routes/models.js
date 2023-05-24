const express = require('express');
const router = express.Router();
const fs = require('fs');
const multer = require('multer');

const Model = require('../Models/Model');

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, 'uploads/models/');
    },
    filename: function(req, file, cb){
        cb(null, new Date().toISOString() + file.originalname);
    }
});

const upload = multer({storage})

// Ruta para crear un modelo
router.post('/', upload.single("model"), async (req, res) =>{
	const newModel = new Model({
        name: req.body.name,
        model: req.file.path
    }
	)
	try{
		await newModel.save()
		console.log("Si se subio el modelo creo...")
	} catch(err){

        console.log(err)
    }
	
});


// Ruta para obtener un modelo por su id
router.get('/:model', async (req, res) =>{
    try{
        const {model} = req.params
        // const filePath = "${process.cwd()}\src\Uploads\ ${model}"
        const filePath = `uploads/models/${model}.glb`

        fs.readFile(filePath, (err, data) => {
            if (err) {
              console.error('Error al leer el archivo:', err);
              res.status(500).send('Error al leer el archivo');
            } else {
              res.setHeader('Content-Disposition', `attachment; filename="${model}"`);
              res.setHeader('Content-Type', 'model/gltf-binary');
              res.send(data);
            }
          });
    } catch(err){
        res.json({message: err})
    }
}
)


module.exports = router;


