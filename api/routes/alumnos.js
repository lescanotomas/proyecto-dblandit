const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const checkAuth = require('../middleware/check-auth');

const Alumno = require('../models/alumno');

router.get('/', (req, res, next) => {
    Alumno.find()
    .select('nombre apellido dni direccion _id')
    .exec()
    .then(docs => {
        /*const alumnosTotales = {
            count: docs.length,
            alumnos: docs
        };*/
        console.log("Buscando a todos los alumnos en la base de datos", docs);
        if (docs.length <= 0) {
            res.status(404).json({
                message: 'No se encontraron alumnos en la base de datos'
            });
        } else {
            res.status(200).json(docs/*alumnosTotales*/);
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error:err
        });
    });
});

router.post('/', checkAuth, (req, res, next) => {
    const alumno = new Alumno({
        _id: new mongoose.Types.ObjectId(),
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        dni: req.body.dni,
        direccion: req.body.direccion
    });
    alumno.save()
    .then(result =>{
        console.log(result);
        res.status(201).json({
            message: 'Agregando alumno/s a la base de datos',
            crearAlumno: result
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });

});

//Buscar un alumno en especifico con ID
router.get('/:alumnoId', (req, res, next) => {
    const id = req.params.alumnoId;
    Alumno.findById(id)
    .select('nombre apellido dni direccion _id')
    .exec()
    .then(doc => {
        console.log("Buscando por ID en la base de datos", doc);
        if (doc){
            res.status(200).json(doc);
        } else {
            res.status(404).json({message: 'No hay alumnos registrados con esa ID'});
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error: err})
    });
});


/*router.get('/:alumnoDni', (req, res, next) => {
    const dni = req.params.alumnoDni;
    Alumno.find(dni)
    .exec()
    .then(doc => {
        console.log("buscando por dni desde la base de datos", doc);
        if (doc){
            res.status(200).json(doc);
        } else {
            res.status(404).json({message: 'no hay datos registrados con esa dni'});
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error: err})
    });
});
*/

//Update de un alumno en especifico
router.patch('/:alumnoId', checkAuth, (req, res, next) => {
    const id = req.params.alumnoId;
    Alumno.updateOne({ _id: id }, { $set: { nombre: req.body.nuevoNombre, apellido: req.body.nuevoApellido, dni: req.body.nuevoDni, direccion: req.body.nuevaDireccion } })
    .exec()
    .then(result => {
        console.log(result);
        res.status(200).json(result);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
});

//Eliminar un alumno en especifico por ID
router.delete('/:alumnoId', checkAuth, (req, res, next) => {
    const id = req.params.alumnoId;
    Alumno.remove({ _id: id}).exec()
    .then(result => {
        res.status(200).json(result);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error:err
        });
    });
});

/*ELIMINA A TODOS LOS ALUMNOS
router.delete('/', checkAuth, (req, res, next) => {
    Alumno.deleteMany()
    .exec()
    .then(docs => {
        console.log("eliminando a todos los alumnos de la base de datos", docs);
        if (docs.length <= 0) {
            res.status(404).json({
                message: 'no se encontraron datos'
            });
        } else {
            res.status(200).json(docs);
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error:err
        });
    });
});
*/

module.exports = router;