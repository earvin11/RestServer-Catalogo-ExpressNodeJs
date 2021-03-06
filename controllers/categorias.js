const { Categoria } = require("../models");


const obtenerCategorias = async( req, res ) => {

    const { limite = 5 } = req.query;

    const [ total, categorias ] = await Promise.all([
        Categoria.countDocuments({ estado: true }),
        Categoria.find({ estado: true })
                 .limit(Number(limite))
    ]);

    res.status(200).json({
        total,
        categorias
    });
}


const obtenerCategoria = async( req, res ) => {

    const { id } = req.params;

    const categoria = await Categoria.findById( id );

    res.status(200).json({
        categoria
    })

}


const crearCategoria = async( req, res ) => {

    const nombre = req.body.nombre.toUpperCase();

    const categoriaDB = await Categoria.findOne({ nombre });

    if( categoriaDB ){
       
        return res.status(400).json({
            msg: `La categoria ${nombre} ya existe`
        });

    }

    const categoria = new Categoria({ nombre });

    try {
        await categoria.save();
    
        res.status(201).json(categoria);
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }

}

const actualizarCategoria = async( req, res ) => {

    const { id } = req.params;

    const { estado, ...data } = req.body;

    data.nombre = data.nombre.toUpperCase();

    try {
        const categoria = await Categoria.findByIdAndUpdate( id, data, {new: true});
    
        res.status(200).json(categoria);
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }


}

const borrarCategoria = async( req, res ) => {

    const { id } = req.params;

    try {
        const categoria = await Categoria.findByIdAndUpdate( id, { estado:false} );
    
        res.status(200).json( categoria );
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}


module.exports = {
    obtenerCategoria,
    obtenerCategorias,
    crearCategoria,
    actualizarCategoria,
    borrarCategoria
}
