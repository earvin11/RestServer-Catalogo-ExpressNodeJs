const { response } = require("express");
const fs = require('fs');
const path = require('path');
const { subirArchivo } = require("../helpers/subir-archivo");
const { Articulo } = require("../models");



const cargarArchivo = async( req, res ) => {

    try {
        //si pasa la validacion envia la req.files a la funcion
        const nombre = await subirArchivo(req.files, undefined, 'articulo' );
    
    
        res.json({
            path: nombre
        })
        
    } catch (error) {
        console.log(error)
        res.status.json({
            msg: error
        })
    }  

}


const actualizarImagen = async( req, res = response ) => {

    const { id } = req.params;

    // console.log(req.files);

    const articulo = await Articulo.findById( id );

    // Limpiar archivos previos
    // Si el articulo tiene una propiedad img tiene imagen
    if( articulo.img ) {
        // Construye el path de esa img
        const pathImg = path.join( articulo.img );
        // Si existe ese archivo (fileSystem)

        if( fs.existsSync( pathImg ) ) {
            fs.unlinkSync(pathImg); // Borra el archivo que este en la ruta
        }
    }

    const nombre = await subirArchivo( req.files, undefined, 'articulos' );
    articulo.img = nombre;

    await articulo.save();

    res.json({
        ok: true,
        articulo 
    });

}


const mostrarImg = async( req, res ) => {

    const { id } = req.params;

    const articulo = await Articulo.findById( id );


    if( articulo.img ) {

        const img= articulo.img;
        // Si existe ese archivo (fileSystem)
        if( fs.existsSync( img ) ) {
            return res.sendFile( img );
        }
    }

    //En caso de no existir la imagen crea una const con el path de la img de no-image
    const noImgPath = path.join( __dirname, '../assets/no-image.jpg' );
    //Responde la imagen de no-image
    res.sendFile(noImgPath);

}




module.exports = {
    actualizarImagen,
    cargarArchivo,
    mostrarImg
}