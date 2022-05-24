const { Schema, model } = require('mongoose');

const CategoriaSchema = Schema({

    nombre: {
        type: String,
        required: true,
        unique: true
    },
    estado: {
        type: Boolean,
        required: true,
        default: true
    }

});

CategoriaSchema.methods.toJSON = function() {
    const { __v, estado, ...data } = this.toObject();
    return data;
}


module.exports = model('Categoria', CategoriaSchema);