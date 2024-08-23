// importacoes
const connectDB = require("./db");
const User = require("./models/User");
const bcrypt = require("bcrypt");

// express
const express = require("express");
const app = express();
const port = 8050;
// middleware
app.use(express.json())

// rotas
app.get("/users", async (req,res) => {
    try {
        const users = await User.find({});
        return res.status(200).json(users);
    } catch (error) {
        return res.status(500).send("Erro interno do servidor: ", error);
    }
})

// rota de login
app.post("/users/login", async (req,res) => {
    try {
        // acha o login passado via body
        let emailEncontrado = await User.findOne({email: req.body.email});

        if (emailEncontrado === null) {
            return res.status(500).json({message: "email invalido ou senha invalido"})
        }
        
        if(!(await bcrypt.compare(req.body.password, emailEncontrado.password))) {
            return res.status(500).json({message: "email invalido ou senha invalido"})
        }

        
        return res.status(200).json({message: "login realizado com sucesso."})
    } catch (error) {
        return res.status(500).json({message: "falha no login"})
    }
})

app.post("/users/cadastrar-usuario", async (req,res) => {
    try {
        let usuarioExiste = await User.findOne({email: req.body.email});

        if (usuarioExiste) {
            return res.status(500).send("usuario já existe");
                }
        
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        let novoUsuario = {
            email: req.body.email,
            password: hashedPassword
        }

        await User.create(novoUsuario);
        return res.status(201).json({mensagem: "Usuario criado"});
    } catch (error) {
            return res.status(500).json({mensagem: "Não foi possível criar um novo usuario."})
    }
})


// inicializa o servidor
app.listen(port, async () => {
    await connectDB();
    console.log(`Servidor express rodando em http://localhost:${port}`);
})

