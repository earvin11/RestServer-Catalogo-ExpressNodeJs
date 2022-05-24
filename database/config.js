const mongoose = require('mongoose');
const colors   = require('colors');
require('dotenv').config();

const dbURL = process.env.MONGODB_LOCAL;


const dbConnection = async() =>{

    try {

       await mongoose.connect(dbURL);
        console.log('Base de datos onine'.blue);
        
    } catch (error) {
        console.log(error);
        throw new Error('Error al iniciar la base de datos');
    }

}

module.exports = {
    dbConnection,
}