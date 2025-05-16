// index.js
import express from 'express';
import cors from 'cors';
import { testarConexao } from './db.js'; // se db.js estiver no mesmo diretório
import RotasUsuarios, { autenticarToken } from './routes/rotasUsuarios.js'; // se rotasUsuarios.js estiver na pasta routes
import RotasCategorias from './routes/rotasCategorias.js'; // se rotasCategorias.js estiver na pasta routes
import RotasSubCategorias from './routes/rotasSubCategorias.js';
import RotasContas from './routes/rotasConta.js';
import RotasTransacao from './routes/rotasTransacao.js';



const app = express();
testarConexao();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('API rodando');
})

// Rotas de Usuários
app.post('/usuarios', RotasUsuarios.novoUsuario);
app.get('/usuarios', autenticarToken, RotasUsuarios.listarTodos);
app.put('/usuarios/:id', autenticarToken, RotasUsuarios.atualizarTodosCampos);
app.delete('/usuarios/:id_usuario', autenticarToken, RotasUsuarios.deletar);
app.post('/usuarios/login', RotasUsuarios.login);
app.patch('/usuarios/:id',autenticarToken, RotasUsuarios.atualizar);


// Rotas de Categorias
app.post('/categorias', autenticarToken, RotasCategorias.novaCategoria);
app.get('/categorias/filtrarCategoria', RotasCategorias.filtrarCategoria);
app.put('/categorias/:id',  autenticarToken, RotasCategorias.atualizarCategoria);
app.get('/categorias', autenticarToken, RotasCategorias.listarCategorias);
app.delete('/categorias/:id', autenticarToken, RotasCategorias.deletarcategoria);
app.patch('/categorias/:id',  autenticarToken, RotasCategorias.editar);

// Rotas de SubCategorias
app.post('/subcategorias',  RotasSubCategorias.novaSubcategoria);
app.put('/subcategorias/:id', autenticarToken, RotasSubCategorias.atualizarSubcategoria);
app.get('/subcategorias', autenticarToken, RotasSubCategorias.listarSubcategorias);
app.delete('/subcategorias/:id',  autenticarToken, RotasSubCategorias.deletarcategoria);
app.patch('/subcategorias/:id', autenticarToken, RotasSubCategorias.editar);

// Rotas de Contas
app.post('/contas', RotasContas.novoConta);
app.get('/contas/filtrarContas', RotasContas.filtrarContas);
app.put('/contas/:id_conta', RotasContas.atualizarConta);
app.get('/contas', RotasContas.listarConta);
app.delete('/contas/:id', RotasContas.deletarConta);
app.patch('/contas/:id_conta', RotasContas.editar);


// Rotas de Transacao
app.post('/transacao', RotasTransacao.novaTransacao);
app.get('/transacao/filtroData', RotasTransacao.filtrarPorData);
app.get('/transacao/transacoesVencidas/:id_usuario', RotasTransacao.transacaoVencidas);
app.get('/transacao/somarTransacoes', RotasTransacao.somarTransacoes);
app.put('/transacao/:id', autenticarToken, RotasTransacao.atualizartransacao);
app.get('/transacao', autenticarToken, RotasTransacao.listartransacao);
app.delete('/transacao/:id', autenticarToken, RotasTransacao.deletartransacao);
app.patch('/transacao/:id', autenticarToken, RotasTransacao.editar);



   

const porta = 3000;
app.listen(porta, () => {
    console.log(`API rodando: http://localhost:${porta}`);
});