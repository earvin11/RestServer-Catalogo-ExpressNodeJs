const path = require('path');
const { v4: uuidv4 } = require('uuid');


const subirArchivo = ( files, extensionesValidas = ['png', 'jpg', 'jpeg', 'gif', 'webp'], carpeta ='' ) => {

    return new Promise( ( resolve, reject ) => {

     const { archivo } = files;

     // Con el metodo split corta el nombre del archivo y utiliza como separador el ('.')
     const nombreCortado = archivo.name.split('.');
 
     //Para saber la extension del archvio que se intenta subir evalua la ultima posicion del arr resultante del nombreCortado
     const extension = nombreCortado[ nombreCortado.length - 1];
 
     //Validar extensiones
     if( !extensionesValidas.includes( extension )) {
        return reject(`La extensión ${ extension } no es permitida, solo se admiten archivos ${ extensionesValidas }`)
     }
 
     //Crear un nombre unico para el archvo
     const nombreTemp = uuidv4() + '.' + extension;
 
     // Constryle el path para la img
    //  uploadPath = path.join( __dirname, '../uploads/', carpeta ,nombreTemp );

    uploadPath = path.join('E:', '/Catalogo', carpeta, nombreTemp );
 
     // Utiliza mv para mover el archivo al primer argumento que es la ruta destino
     // Segundo argumento un callback por si hay un error
     archivo.mv(uploadPath, (err) => {
         if (err) {
         return reject(err);
         }
         
         // Si todo salio bien
         resolve( uploadPath );
     });
     
    });

     
}


module.exports = {
    subirArchivo
}