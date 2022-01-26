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