import express from 'express';
import { testarConexao } from './db.js';
import cors from 'cors';
import rotasUsuarios from './routes/rotasUsuarios.js';


const app = express();
testarConexao();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('API funcionando!');
});

//rotas usuarios 
app.post('/usuarios', rotasUsuarios.novoUsuario);
//leitora
app.get('/usuarios', rotasUsuarios.listarTodos);
//login
app.post('/usuarios/login', rotasUsuarios.login);
//atualizar todos os campos
app.put('/usuarios/:id_usuario', rotasUsuarios.atualizarTodosCampos);
//atualizar 
app.patch('/usuarios/:id_usuario', rotasUsuarios.atualizar);
//deletar usuario
app.patch('/usuarios/:id_usuario', rotasUsuarios.deletar);

//
const porta = 3000;
app.listen(porta, () => {
    console.log(`Api http://localhost:${porta}`);
});
