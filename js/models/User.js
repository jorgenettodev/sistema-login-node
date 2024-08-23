// instala dependencias
const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

// cria a pasta dentro do db
const user = mongoose.model('users', userSchema);


module.exports = user;