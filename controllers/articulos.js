const Articulo = require('../models/articulo');



const obtenerArticulos = async( req, res ) =>{

    const { limite = 100, desde = 0 } = req.query;

    try {
        const [ total, articulos ] = await Promise.all([
            Articulo.countDocuments({ estado: true }),
            Articulo.find({ estado: true }) // Almacena en la const articulos lo que haya en el model Articulo que este en estado true
                .populate('categoria', 'nombre')
                .populate('creado', 'nombre')
                .populate('modificado', 'nombre')
                .skip(Number(desde))
                .limit(Number(limite))  // Number() transforma en numero lo que este dentro de los parentesis
        ]);
    
       res.status(200).json({
           total,
           articulos
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
      
    
}

const obtenerArticulo = async( req, res ) =>{

    // Extrae el id de los params
    const { id } = req.params;

    // // Busca en el modelo articulo un objeto con ese id con el metodo findById
    try {
        const articulo = await Articulo.findById( id )
                                .populate('categoria', 'nombre')
                                .populate('creado', 'nombre')
                                .populate('modificado', 'nombre');
    
        res.status(200).json(articulo);
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}

const guardarArticulo = async( req, res ) =>{

    // Extrae lo que venga en nombre y descripcion del body
    const { descripcion, categoria } = req.body;

    const nombre = req.body.nombre.toUpperCase();

    const creado = req.usuario._id;

    // Almacena esos valores en un objeto data
    const data = {
        nombre,
        descripcion,
        categoria,
        creado
    }

    // Crea un nueva instancia de Articulo enviando la data
    const articulo = new Articulo(data);

    //Guardar el articulo en DB
    try {
        await articulo.save();
    
        res.status(201).json({
            ok: true,
            msg: 'Articulo Creado',
            articulo
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }

}

const actualizarArticulo = async( req, res ) =>{
    
    // Extrae el id de los params
    const { id } = req.params;

    // Extrae los valores que vengan del body
    const {  categoria, descripcion } = req.body;

    const modificado = req.usuario._id;

    const nombre = req.body.nombre.toUpperCase();

    // Almacenalos en un objeto data
    const data = {
        nombre,
        categoria,
        descripcion,
        modificado
    }

    // Metodo findByIaAndUpdate para buscar por id y actualizar los datos de ese objeto enviando los nuevos datos que estan en el objeto data
    try {      
        const articulo = await Articulo.findByIdAndUpdate( id, data, { new: true } );
    
        res.status(200).json({
            ok: true,
            articulo
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }

}

const borrarArticulo = async( req, res ) =>{

    // Extrae el id de los params
    const { id } = req.params;

    // Busca un articulo con ese id y cambia el estado de true a false    
    
    try {

        const articulo = await Articulo.findByIdAndUpdate( id, { estado: false }, { new: true } );
        //const articulo = await Articulo.findByIdAndDelete( id );
        
        res.status(200).json({
            ok: true,
            articulo,
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }

}

module.exports = {
    obtenerArticulos,
    obtenerArticulo,
    guardarArticulo,
    actualizarArticulo,
    borrarArticulo
}