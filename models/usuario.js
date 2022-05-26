const { Schema, model } = require('mongoose');

const UsuarioSchema = Schema({
    nombre: {
        type: String,
        required: true
    },
    apellido: {
        type: String,
        required: true
    },
    nick: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    estado: {
        type: Boolean,
        default: true,
        required: true
    },
    rol: {
        type: String
    }
});

UsuarioSchema.methods.toJSON = function() {

    const { __v, ...usuario } = this.toObject();
    return usuario;

}

module.exports = model('Usuario', UsuarioSchema);