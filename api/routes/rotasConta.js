import { BD } from "../db.js";

class RotasContas {
  static async novoConta(req, res) {
    const { nome, tipo_conta, saldo, ativo, conta_padrao} = req.body;

    try {
      const conta = await BD.query(
        `INSERT INTO contas (nome, tipo_conta, saldo, ativo, conta_padrao)
                 VALUES ($1, $2, $3, $4, $5)
                 RETURNING *`,
        [nome, tipo_conta, saldo, ativo, conta_padrao]
      );

      res.status(201).send(conta.rows[0]);
    } catch (error) {
      console.error("Erro ao criar conta", error);
      res
        .status(500)
        .json({ message: "Erro ao criar conta", error: error.message });
    }
  }

  static async atualizarConta(req, res) {
    const { id } = req.params;
    const { nome, tipo_conta, saldo, ativo, conta_padrao} = req.body;

    try {
      const resultado = await BD.query(
        `UPDATE conta
                 SET nome = $1, tipo_conta = $2, saldo = $3 ativo = $4 conta_padrao = $5
                 WHERE id_conta = $6
                 RETURNING *`,
        [nome, tipo_local, saldo, ativo, conta_padrao, id]
      );

      if (resultado.rows.length === 0) {
        return res
          .status(404)
          .json({ message: "conta não encontrada" });
      }

      res.status(200).json(resultado.rows[0]);
    } catch (error) {
      res
        .status(500)
        .json({
          message: "Erro ao atualizar a conta",
          error: error.message,
        });
    }
  }

  static async listarConta(req, res) {
    try {
      const contas = await BD.query("SELECT * FROM contas");
      res.status(200).json(contas.rows);
    } catch (error) {
      res
        .status(500)
        .json({
          message: "Erro ao listar as contas",
          error: error.message,
        });
    }
  }

  static async deletarConta(req, res) {
    const { id } = req.params;

    try {
      await BD.query(
        "DELETE * FROM contas WHERE id_conta = $1",
        [id]
      );
      res.status(200).json({ message: "conta deletado com sucesso" });
    } catch (error) {
      res
        .status(500)
        .json({
          message: "Erro ao deletar conta",
          error: error.message,
        });
    }
  }

  static async editar(req, res) {
    const { id } = req.params;

    const { nome, tipo_conta, saldo, ativo, conta_padrao} = req.body;
    console.log(typeof ativo);
    try {
      //inicializar arrays(vetores) para armazenar os campos e valores a serem atualizados
      const campos = [];
      const valores = [];

      if (nome !== undefined) {
        campos.push(`nome=$${valores.length + 1}`);
        valores.push(nome);
      }
      if (tipo_local !== undefined) {
        campos.push(`tipo_conta=$${valores.length + 1}`);
        valores.push(tipo_conta);
      }
      if (saldo !== undefined) {
        campos.push(`saldo=$${valores.length + 1}`);
        valores.push(saldo);
      }
      if (ativo !== undefined) {
        campos.push(`ativo = $${valores.length + 1}`);
        valores.push(ativo);
        console.log(typeof valores[0]);
        console.log(typeof valores);
      }

      if (conta_padrao !== undefined) {
        campos.push(`conta_padrao = $${valores.length + 1}`);
        valores.push(conta_padrao);
      }

      if (campos.length === 0) {
        return res
          .status(400)
          .json({ message: "nenhum campo fornecido para atualização" });
      }

      const query = `update conta set  ${campos.join(
        ","
      )} where conta = ${id} RETURNING *`;
      console.log(query);
      const conta = await BD.query(query, valores);
      //verifica se o usuario foi atualizado

      if (conta.rows.length === 0) {
        return res.status(404).json({ message: `categoria não encontrado` });
      }

      return res.status(200).json(conta.rows[0]);
    } catch (error) {
      res
        .status(500)
        .json({ message: "erro ao atualizar ", error: error.message });
    }
  }
  // filtro para rotas de contas

  static async filtrarContas (req, res) {
    const {nome} = req.query;
    try {
     const query = `SELECT * FROM contas WHERE nome LIKE = $1 AND ativo = true ORDER BY nome DESC`;
 
     const valor = [`%${nome}%`];
 
     const reposta = await BD.query(query, valor);
 
     return res.status(200).json(reposta.rows);
 
    } catch (error) {
     console.error('Erro ao filtrar contas', error);
     res.status(500).json({ message: 'Erro ao filtrar contas', error: error.message });
     
    }
 }


}

export default RotasContas;
