const Articulo = require("../models/articulo");


const getArticleByCategory = async( req, res ) => {

    const { coleccion } = req.params;
      
    const [ total, articulos ] = await Promise.all([
        Articulo.countDocuments({ categoria: coleccion, estado: true }),
        Articulo.find({ categoria: coleccion, estado: true })
    ]);

   res.status(200).json({
       total,
       articulos
    });
    
}

const articleByName = async( req, res ) => {

    const nombre = req.body.nombre.toUpperCase();

    const { limite = 100, desde = 0 } = req.query;
      
    const [ total, articulos ] = await Promise.all([
        Articulo.countDocuments({ nombre, estado: true }),
        Articulo.find({ nombre, estado: true }) // Almacena en la const articulos lo que haya en el model Articulo que este en estado true
            .populate('categoria', 'nombre')
            .skip(Number(desde))
            .limit(Number(limite))  // Number() transforma en numero lo que este dentro de los parentesis
    ]);

   res.status(200).json({
       total,
       articulos
    });

}


module.exports = {
    getArticleByCategory,
    articleByName
}