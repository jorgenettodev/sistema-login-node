// conecte ao mongodb usando o mongoose
const mongoose = require("mongoose");

// url para conectar no mongodb compass
const uri = 'mongodb+srv://jorgenetto96:8ZpcDeDkzMd63bXp@bancodedados.2g3xn.mongodb.net/';


// conecte ao mongodb
const connectDB = async () => {
    try {
        // connecta ao banco
        await mongoose.connect(uri, {
            dbName: "test"
        });
        console.log('MONGODB UP')
    } catch (error) {
        console.log('Error ao conectar no MONGODB');
    }
}

// exporta conexão ao banco
module.exports = connectDB;
