import { BD } from "../db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const SECRET_KEY = "chave_api_gfp";

class UsuariosController {
  static async login(req, res) {
    const { email, senha } = req.body;

    try {
      const resultado = await BD.query(
        `SELECT * FROM usuarios WHERE email = $1 and ativo = true`,
        [email]
      );

      if (resultado.rows.length === 0) {
        return res.status(401).json({ message: "Email ou senha inválidos" });
      }

      const usuarios = resultado.rows[0];
      const senhaValida = await bcrypt.compare(senha, usuarios.senha);

      if (!senhaValida) {
        return res.status(401).json({ message: "Senha inválidos" });
      }

      const token = jwt.sign(
        { id: usuarios.id_usuario, nome: usuarios.nome, email: usuarios.email },
        SECRET_KEY,
        { expiresIn: "1h" }
      );

      return res.status(200).json({
        token,
        id_usuario: usuarios.id_usuario,
        nome: usuarios.nome,
        email: usuarios.email,
        tipo_acesso: usuarios.tipo_acesso,
      });
    } catch (error) {
      console.error("Erro ao realizar login:", error);
      res
        .status(500)
        .json({ message: "Erro ao realizar login", error: error.message });
    }
  }

  static async novoUsuario(req, res) {
    const { nome, email, senha, tipo_acesso } = req.body;

    try {
      const senhaCriptografada = await bcrypt.hash(senha, 10);

      await BD.query(
        "INSERT INTO usuarios (nome, email, senha, tipo_acesso) VALUES ($1, $2, $3, $4)",
        [nome, email, senhaCriptografada, tipo_acesso]
      );

      return res
        .status(201)
        .json({ mensagem: "Usuário cadastrado com sucesso" });
    } catch (error) {
      console.error("Erro ao cadastrar o usuário:", error);
      return res
        .status(500)
        .json({ mensagem: "Erro ao cadastrar o usuário", erro: error.message });
    }
  }

  static async listarTodos(req, res) {
    try {
      const resultado = await BD.query(
        "SELECT * FROM usuarios WHERE ativo = true"
      );
      return res.status(200).json({ usuarios: resultado.rows });
    } catch (error) {
      console.error("Erro ao buscar usuários:", error);
      return res
        .status(500)
        .json({ mensagem: "Erro ao buscar usuários", erro: error.message });
    }
  }

  static async atualizarTodosCampos(req, res) {
    const { id_usuario } = req.params;
    const { nome, email, senha, tipo_acesso } = req.body;
    const senhaCriptografada = await bcrypt.hash(senha, saltRowds);

    try {
      await BD.query(
        "UPDATE usuarios SET nome = $1, email = $2, senha = $3, tipo_acesso = $4, ativo =$5 WHERE id_usuario = $6",
        [nome, email, senhaCriptografada, tipo_acesso, id_usuario]
      );
      return res
        .status(200)
        .json({ mensagem: "Usuário atualizado com sucesso" });
    } catch (error) {
      console.error("Erro ao atualizar o usuário:", error);
      return res
        .status(500)
        .json({ mensagem: "Erro ao atualizar o usuário", erro: error.message });
    }
  }

  static async atualizar(req, res) {
    const id_usuario = req.params.id; 
    const { nome, email, senha, tipo_acesso, ativo } = req.body;
  
    try {
      const valores = [];
      const campos = [];
  
      if (nome !== undefined) {
        campos.push(`nome = $${valores.length + 1}`);
        valores.push(nome);
      }
      if (email !== undefined) {
        campos.push(`email = $${valores.length + 1}`);
        valores.push(email);
      }
      if (senha !== undefined) {
        const saltRounds = 10;
        const senhaCriptografada = await bcrypt.hash(senha, saltRounds);
        campos.push(`senha = $${valores.length + 1}`);
        valores.push(senhaCriptografada);
      }
      if (tipo_acesso !== undefined) {
        campos.push(`tipo_acesso = $${valores.length + 1}`);
        valores.push(tipo_acesso);
      }
      if (ativo !== undefined) {
        campos.push(`ativo = $${valores.length + 1}`);
        valores.push(ativo);
      }
  
      if (campos.length === 0) {
        return res.status(400).json({ message: "Nenhum campo para atualizar" });
      }
  
      valores.push(id_usuario);
      const query = `UPDATE usuarios SET ${campos.join(
        ", "
      )} WHERE id_usuario = $${valores.length} RETURNING *`;
  
      const usuario = await BD.query(query, valores);
  
      if (usuario.rows.length === 0) {
        return res.status(404).json({ message: "Usuário não encontrado" });
      }
  
      res.status(200).json(usuario.rows[0]);
    } catch (error) {
      console.error("Erro ao atualizar usuário:", error);
      res
        .status(500)
        .json({ message: "Erro ao atualizar usuário", error: error.message });
    }
  }
  

  static async deletar(req, res) {
    const { id_usuario } = req.params;

    try {
      const resultado = await BD.query(
        `UPDATE usuarios SET ativo = false WHERE id_usuario = $1`, [id_usuario]);
        return res.status(200).json({ mensagem: "Usuário desativado com sucesso" });
    } catch (error) {
      console.error("Erro ao desativar o usuário:", error);
      return res.status(500).json({ mensagem: "Erro ao desativar o usuário", erro: error.message });
    }
  }
}
export function autenticarToken(req, res, next) {
  //extrair do token o cabeçalho da requisição (header)
  const token = req.headers["authorization"]; //Bearer<token>
  if (!token) return res.status(403).json({ message: "Token não fornecido" });

  //verificar se o token é validar
  //jwt.verifyque valida
  jwt.verify(token.split(" ")[1], SECRET_KEY, (err, usuario) => {
    if (err) return res.status(403).json({ message: "Token inválido" });

    // se o token for valido, adicionar os dados do usuario (decodificado no token)
    req.usuario = usuario;
    next();
  });
}

export default UsuariosController;
