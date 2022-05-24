const express  = require('express');
const cors     = require('cors');
const fileUpload = require('express-fileupload');

const { dbConnection } = require('../database/config');
require('dotenv').config();


class Server {


    constructor() {

        this.app   = express();
        this.port  = process.env.PORT;
        this.paths = {
            articulos:  '/api/articulos',
            auth:       '/api/auth',
            buscar:     '/api/buscar',
            categorias: '/api/categorias',
            uploads:    '/api/uploads',
            usuarios:   '/api/usuarios',
        }

        // Conectar DB
        this.dbConnection();

        this.middlewares();
        this.routes();
    }

    async dbConnection() {
        await dbConnection();
    }

    middlewares() {
        // CORS
        this.app.use( cors() );
        // Lectura y parseo del body
        this.app.use( express.json() );
        // Servir directorio publico
        this.app.use( express.static('public') );

        // Carga de archivo
        this.app.use(fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/',
            createParentPath: true
        }));

    }

    routes() {
        this.app.use( this.paths.articulos, require('../routes/articulo') );
        this.app.use( this.paths.auth, require('../routes/auth') );
        this.app.use( this.paths.buscar, require('../routes/buscar') );
        this.app.use( this.paths.categorias, require('../routes/categorias') );
        this.app.use( this.paths.uploads, require('../routes/uploads') );
        this.app.use( this.paths.usuarios, require('../routes/usuarios') );
    }

    listen() {
        this.app.listen( this.port, () => {
            console.log('Servidor corriendo en el puerto:', this.port.magenta);
        });
    }



}



module.exports = Server;