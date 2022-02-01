//Se crea el modelo alumno, para preparar a la base de datos con los datos que tiene que recibir
const mongoose = require('mongoose');

const alumnoSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    nombre:  { type: String, required: true },
    apellido: { type: String, required: true },
    dni: { type: Number, required: true },
    direccion: { type: String, required: true }
});

module.exports = mongoose.model('Alumno', alumnoSchema);