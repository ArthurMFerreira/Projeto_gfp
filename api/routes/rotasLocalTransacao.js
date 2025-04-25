import { BD } from "../db.js";

class RotasLocalTrasacao {
  static async novoLocalTrasacao(req, res) {
    const { nome, tipo_local, saldo } = req.body;

    try {
      const local_transacao = await BD.query(
        `INSERT INTO local_transacao (nome, tipo_local, saldo)
                 VALUES ($1, $2, $3)
                 RETURNING *`,
        [nome, tipo_local, saldo]
      );

      res.status(201).send(local_transacao.rows[0]);
    } catch (error) {
      console.error("Erro ao criar localtrasacao", error);
      res
        .status(500)
        .json({ message: "Erro ao criar localtrasacao", error: error.message });
    }
  }

  static async atualizarLocalTrasacao(req, res) {
    const { id } = req.params;
    const { nome, tipo_local, saldo } = req.body;

    try {
      const resultado = await BD.query(
        `UPDATE local_transacao
                 SET nome = $1, tipo_local = $2, saldo = $3
                 WHERE id_local_transacao = $4
                 RETURNING *`,
        [nome, tipo_local, saldo, id]
      );

      if (resultado.rows.length === 0) {
        return res
          .status(404)
          .json({ message: "localtrasacao não encontrada" });
      }

      res.status(200).json(resultado.rows[0]);
    } catch (error) {
      res
        .status(500)
        .json({
          message: "Erro ao atualizar a localtrasacao",
          error: error.message,
        });
    }
  }

  static async listarLocalTrasacao(req, res) {
    try {
      const local_transacao = await BD.query("SELECT * FROM local_transacao");
      res.status(200).json(local_transacao.rows);
    } catch (error) {
      res
        .status(500)
        .json({
          message: "Erro ao listar as Subcategorias",
          error: error.message,
        });
    }
  }

  static async deletarLocalTrasacao(req, res) {
    const { id } = req.params;

    try {
      await BD.query(
        "DELETE FROM local_transacao WHERE id_local_transacao = $1",
        [id]
      );
      res.status(200).json({ message: "localtrasacao deletado com sucesso" });
    } catch (error) {
      res
        .status(500)
        .json({
          message: "Erro ao deletar localtrasacao",
          error: error.message,
        });
    }
  }

  static async editar(req, res) {
    const { id } = req.params;

    const { nome, tipo_local, saldo, ativo } = req.body;
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
        campos.push(`tipo_local=$${valores.length + 1}`);
        valores.push(tipo_local);
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

      if (campos.length === 0) {
        return res
          .status(400)
          .json({ message: "nenhum campo fornecido para atualização" });
      }

      const query = `update local_transacao set  ${campos.join(
        ","
      )} where id_local_transacao = ${id} RETURNING *`;
      console.log(query);
      const local_transacao = await BD.query(query, valores);
      //verifica se o usuario foi atualizado

      if (local_transacao.rows.length === 0) {
        return res.status(404).json({ message: `categoria não encontrado` });
      }

      return res.status(200).json(local_transacao.rows[0]);
    } catch (error) {
      res
        .status(500)
        .json({ message: "erro ao atualizar categoria", error: error.message });
    }
  }
}

export default RotasLocalTrasacao;
