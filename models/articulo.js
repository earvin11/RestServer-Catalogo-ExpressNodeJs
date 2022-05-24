const { Schema, model } = require('mongoose');


const ArticuloSchema = Schema({

    nombre: {
        type: String,
        required: true
    },
    categoria:{
        type: Schema.Types.ObjectId,
        ref: 'Categoria',
        required: true
    },
    descripcion: {
        type: String
    },
    estado: {
        type: Boolean,
        required: true,
        default: true
    },
    img: {
        type: String
    },


});

// Modificar el metodo toJSON
ArticuloSchema.methods.toJSON = function() {

    const { __v, ...articulo } = this.toObject();
    return articulo;

}


module.exports = model('Articulo', ArticuloSchema);