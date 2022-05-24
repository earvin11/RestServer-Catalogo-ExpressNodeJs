const { Categoria } = require("../models");



const existeCategoriaPorId = async( id ) => {

    const categoria = await Categoria.findById(id);

    if(!categoria){
        throw new Error('No existe la categoria');
    }

}

const coleccionesPermitidas = ( coleccion ='', colecciones = [] ) => {

    const incluida = colecciones.includes( coleccion );
    if( !incluida ) {
        throw new Error(`La coleccion ${ coleccion } no es permitida, ${ colecciones }`);
    }

    return true;

}


module.exports = {
    coleccionesPermitidas,
    existeCategoriaPorId
}