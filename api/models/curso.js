//Se crea el modelo curso, para preparar a la base de datos con los datos que tiene que recibir

const mongoose = require('mongoose');

const cursoSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    tema:  { type: String, required: true },
    anioDictado: { type: String, required: true },
    duracion: { type: String, required: true },
    alumnoId: { type: String },
    alumnos: { type: mongoose.Schema.Types.ObjectId, ref: 'Alumno' }
});

module.exports = mongoose.model('Curso', cursoSchema);