const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const checkAuth = require('../middleware/check-auth');


const Curso = require('../models/curso');

//GET a cursos, para poder listar todos los cursos

router.get('/', (req, res, next) => {
    Curso.find()
    .select('tema anioDictado duracion _id')
    .exec()
    .then(docs => {
        /*const cursosTotales = {
            count: docs.length,
            alumnos: docs
        };*/
        console.log("Buscando a todos los cursos en la base de datos", docs);
        if (docs.length <= 0) {
            res.status(404).json({
                message: 'No se encontraron cursos en la base de datos'
            });
        } else {
            res.status(200).json(docs/*cursosTotales*/);
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error:err
        });
    });
});


//POST a cursos, para poder listar todos los alumnos

router.post('/', checkAuth, (req, res, next) => {
    const curso = new Curso({
        _id: new mongoose.Types.ObjectId(),
        tema: req.body.tema,
        anioDictado: req.body.anioDictado,
        duracion: req.body.duracion,
        alumnoId: req.body.alumnoId
    });
    curso.save()
    .then(result =>{
        console.log(result);
        res.status(201).json({
            message: 'Agregando curso/s a la base de datos',
            crearCurso: result
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });

});

//GET a un curso en especifico buscando por ID

router.get('/:cursoId', (req, res, next) => {
    const id = req.params.cursoId;
    Curso.findById(id)
    .select('tema anioDictado duracion _id')
    .exec()
    .then(doc => {
        console.log("Buscando por ID en la base de datos", doc);
        if (doc){
            res.status(200).json(doc);
        } else {
            res.status(404).json({message: 'No hay cursos registrados con esa ID'});
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error: err})
    });
});

//Actualizar a un curso en especifico por ID

router.patch('/:cursoId', checkAuth, (req, res, next) => {
    const id = req.params.cursoId;
    Curso.updateOne({ _id: id }, { $set: { tema: req.body.nuevoTema, anioDictado: req.body.nuevoAnioDictado, duracion: req.body.nuevaDuracion } })
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


//Eliminar a un curso en especifico por ID

router.delete('/:cursoId', checkAuth, (req, res, next) => {
    const id = req.params.cursoId;
    Curso.remove({ _id: id}).exec()
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

module.exports = router;