import { BD } from "../db.js";

class RotasTransacao {
  static async novaTransacao(req, res) {
    const {
      valor,
      descricao,
      data_transacao,
      data_vencimento,
      data_pagamento,
      tipo_transacao,
      id_local_transacao,
      id_categoria,
      id_subcategoria,
      id_usuario,
      num_parcelas,
      parcela_atual,
    } = req.body;

    try {
      const transacao = await BD.query(
        `INSERT INTO transacoes (valor, descricao, data_transacao, data_vencimento, data_pagamento,
                 tipo_transacao, id_local_transacao, id_categoria, id_subcategoria, id_usuario, num_parcelas, parcela_atual)
                 VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
                 RETURNING *`,
        [
          valor,
          descricao,
          data_transacao,
          data_vencimento,
          data_pagamento,
          tipo_transacao,
          id_local_transacao,
          id_categoria,
          id_subcategoria,
          id_usuario,
          num_parcelas,
          parcela_atual,
        ]
      );
      res.status(201).send(transacao.rows[0]);
    } catch (error) {
      console.error("Erro ao criar trasacao", error);
      res
        .status(500)
        .json({ message: "Erro ao criar trasacao", error: error.message });
    }
  }

  static async atualizartransacao(req, res) {
    const { id } = req.params;
    const {
      valor,
      descricao,
      data_transacao,
      data_vencimento,
      data_pagamento,
      tipo_transacao,
      id_local_transacao,
      id_categoria,
      id_subcategoria,
      id_usuario,
      num_parcelas,
      parcela_atual,
    } = req.body;

    try {
      const resultado = await BD.query(
        `UPDATE transacoes
                 SET valor = $1, descricao = $2, data_transacao = $3, data_vencimento = $4, data_pagamento = $5,
                 tipo_transacao = $6, id_local_transacao = $7, id_categoria = $8,
                 id_subcategoria = $9, id_usuario = $10, num_parcelas = $11, parcela_atual = $12
                 WHERE id_transacao = $13
                 RETURNING *`,
        [
          valor,
          descricao,
          data_transacao,
          data_vencimento,
          data_pagamento,
          tipo_transacao,
          id_local_transacao,
          id_categoria,
          id_subcategoria,
          id_usuario,
          num_parcelas,
          parcela_atual,
          id,
        ]
      );

      if (resultado.rows.length === 0) {
        return res.status(404).json({ message: "transacao não encontrada" });
      }

      res.status(200).json(resultado.rows[0]);
    } catch (error) {
      res.status(500).json({
        message: "Erro ao atualizar a transacao",
        error: error.message,
      });
    }
  }

  static async listartransacao(req, res) {
    try {
      const transacao = await BD.query("SELECT * FROM transacoes");
      res.status(200).json(transacao.rows);
    } catch (error) {
      res.status(500).json({
        message: "Erro ao listar as transacoes",
        error: error.message,
      });
    }
  }

  static async deletartransacao(req, res) {
    const { id } = req.params;
    try {
      await BD.query("DELETE FROM transacoes WHERE id_transacao = $1", [id]);
      res.status(200).json({ message: "transacao deletado com sucesso" });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Erro ao deletar transacao", error: error.message });
    }
  }

  static async editar(req, res) {
    const { id } = req.params;

    const {
      valor,
      descricao,
      data_transacao,
      data_vencimento,
      data_pagamento,
      tipo_transacao,
      id_local_transacao,
      id_categoria,
      id_subcategoria,
      id_usuario,
      num_parcelas,
      parcela_atual,
    } = req.body;

    try {
      //inicializar arrays(vetores) para armazenar os campos e valores a serem atualizados
      const campos = [];
      const valores = [];

      if (valor !== undefined) {
        campos.push(`valor=$${valores.length + 1}`);
        valores.push(valor);
      }
      if (descricao !== undefined) {
        campos.push(`descricao = $${valores.length + 1}`);
        valores.push(descricao);
      }
      if (data_transacao !== undefined) {
        campos.push(`data_transacao = $${valores.length + 1}`);
        valores.push(data_transacao);
      }
      if (data_vencimento !== undefined) {
        campos.push(`data_vencimento=$${valores.length + 1}`);
        valores.push(data_vencimento);
      }
      if (data_pagamento !== undefined) {
        campos.push(`data_pagamento=$${valores.length + 1}`);
        valores.push(data_pagamento);
      }
      if (tipo_transacao !== undefined) {
        campos.push(`tipo_transacao=$${valores.length + 1}`);
        valores.push(tipo_transacao);
      }
      if (id_local_transacao !== undefined) {
        campos.push(`id_local_transacao=$${valores.length + 1}`);
        valores.push(id_local_transacao);
      }
      if (id_categoria !== undefined) {
        campos.push(`id_categoria=$${valores.length + 1}`);
        valores.push(id_categoria);
      }
      if (id_subcategoria !== undefined) {
        campos.push(`id_subcategoria=$${valores.length + 1}`);
        valores.push(id_subcategoria);
      }
      if (id_usuario !== undefined) {
        campos.push(`id_usuario=$${valores.length + 1}`);
        valores.push(id_usuario);
      }
      if (num_parcelas !== undefined) {
        campos.push(`num_parcelas=$${valores.length + 1}`);
        valores.push(num_parcelas);
      }
      if (parcela_atual !== undefined) {
        campos.push(`parcela_atual=$${valores.length + 1}`);
        valores.push(parcela_atual);
      }
      if (campos.length === 0) {
        return res
          .status(400)
          .json({ message: "nenhum campo fornecido para atualização" });
      }

      const query = `update transacoes set  ${campos.join(
        ","
      )} where id_transacao = ${id} RETURNING *`;
      console.log(query);
      const transacao = await BD.query(query, valores);
      //verifica se o usuario foi atualizado

      if (transacao.rows.length === 0) {
        return res.status(404).json({ message: `transacao não encontrado` });
      }

      return res.status(200).json(transacao.rows[0]);
    } catch (error) {
      res.status(500).json({
        message: "erro ao atualizar subcategoria",
        error: error.message,
      });
    }
  }
  transacao;
  // criar uma rota que permite filtrar transações por data de vencimento ou data de pagamento
  static async filtrarPorData(req, res) {
    const { data_inicio, data_fim, tipo_data } = req.query;

    let colunaData;
    if (tipo_data == "vencimento") {
      colunaData = "data_vencimento";
    } else if (tipo_data == "pagamento") {
      colunaData = "data_pagamento";
    } else {
      return res.status(400).json({
        message: "Tipo de data inválido, use vencimento ou pagamento",
      });
    }
    try {
      const query = `
    SELECT t.*, u.nome AS nome_usuario, ct.nome AS nome From transacoes AS t
    LEFT JOIN usuarios AS u ON t.id_usuario = u.id_usuario
    JOIN contas ct ON t.id_conta = ct.id_conta
    where ${colunaData} BETWEEN $1 AND $2
    ORDER BY ${colunaData} ASC
    `;
      const transacoes = await BD.query(query, [data_inicio, data_fim]);

      res.status(200).json(transacoes.rows);
    } catch (error) {
      console.error("Erro ao filtrar transações por data", error);
      res.status(500).json({
        message: "erro ao atualizar subcategoria",
        error: error.message,
      });
    }
  }

  // somando transacoes entrada ou saida
  static async somarTransacoes(req, res) {
    const { tipo, id_usuario } = req.query;
    try {
      const tipoTransacao = tipo.toUpperCase();

      const query = `SELECT SUM(valor) AS total
         FROM transacoes
          WHERE tipo_transacao = $1 AND id_usuario = $2
        `
      const resultado = await BD.query(query, [tipoTransacao, id_usuario]);

      let total = resultado.rows[0].total;
      if (total === null) {
        total = 0;
      }
      res.status(200).json({ total: parseFloat(total) });
    } catch (error) {
      console.error("Erro ao somar transações", error);
      res.status(500).json({
        message: "Erro ao somar transações",
        error: error.message,
      });
    }
  }

  static async transacaoVencidas(req, res) {
    const { id_usuario } = req.params;

    try {
      const query = `
      SELECT t.valor, t.data_transacao, t.data_vencimento, t.data_pagamento,
       u.nome AS nome_usuario, 
      c.nome AS nome_conta
      ct.nome AS nome_categoria,
      s.nome AS nome_subcategoria
      FROM transacoes AS t
      LEFT JOIN usuarios AS u ON t.id_usuario = u.id_usuario
      LEFT JOIN contas AS u ON t.id_consta = u.id_conta
      LEFT JOIN categorias AS c ON t.id_categoria = c.id_categoria
      LEFT JOIN subcategorias AS s ON t.id_subcategoria = s.id_subcategoria
      WHERE t.data_vencimento < CURRENT_DATE -- Filtra transações vencidas
      AND t.id_usuario = $1
      ORDER BY t.data_vencimento ASC
`
const resultado = await BD.query(query, [id_usuario]);

// função para formatar data 
const formatarDataBr = (data) => {
  if (!data) return null;
  return new Date(data).toLocaleDateString("pt-BR", )
}
  const dadosFormatada = resultado.rows.map(transacao => {{
    const dataTransacao = formatarDataBr(transacao.data_transacao);
    const dataVencimento = formatarDataBr(transacao.data_vencimento);
    const dataPagamento = formatarDataBr(transacao.data_pagamento);
  }})
  return res.status(200).json(dadosFormatada);

    } catch (error) {
      
    }
  }

}

export default RotasTransacao;
