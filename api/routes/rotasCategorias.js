import { BD } from '../db.js';

class RotasCategorias {
    static async novaCategoria(req, res) {
        const { nome, tipo_transacao, gasto_fixo, id_usuario } = req.body;
   
        try {
            const resultado = await BD.query(
                `INSERT INTO categorias (nome, tipo_transacao, gasto_fixo, id_usuario)
                 VALUES ($1, $2, $3, $4)
                 RETURNING *`,
                [nome, tipo_transacao, gasto_fixo, id_usuario]
            );
   
            res.status(201).send(resultado.rows[0]);
        } catch (error) {
            console.error('Erro ao criar categoria', error);
            res.status(500).json({ message: 'Erro ao criar categoria', error: error.message });
        }
    }


    static async atualizarCategoria(req, res) {
        const { id_categoria } = req.params;
        const { nome, tipo_transacao, gasto_fixo, id_usuario } = req.body;
   
        try {
            const resultado = await BD.query(
                `UPDATE categorias
                 SET nome = $1, tipo_transacao = $2, gasto_fixo = $3
                 WHERE id_usuario = $4 AND id_categoria = $5
                 RETURNING *`,
                [nome, tipo_transacao, gasto_fixo, id_usuario, id_categoria]
            );
   
            res.status(200).json(resultado.rows[0]);
        } catch (error) {
            res.status(500).json({ message: 'Erro ao atualizar a categoria', error: error.message });
        }
    }

    static async listarCategorias(req, res) {
        try {
            const categorias = await BD.query('SELECT * FROM categorias');
            res.status(200).json(categorias.rows);
        } catch (error) {
            res.status(500).json({ message: 'Erro ao listar as categorias', error: error.message });
        }
    }

    static async deletarcategoria(req, res) {
        const { id } = req.params;

        try {
            await BD.query('DELETE FROM categorias WHERE id_categoria = $1', [id]);
            res.status(200).json({ message: 'Categoria deletado com sucesso' });
        } catch (error) {
            res.status(500).json({ message: 'Erro ao deletar categoria', error: error.message });
        }
    }

    static async editar(req, res) {
        const { id } = req.params;
   
        const { nome, tipo_transacao, gasto_fixo, ativo, id_usuario } = req.body;
        console.log(typeof ativo);
        try {
          //inicializar arrays(vetores) para armazenar os campos e valores a serem atualizados
          const campos = [];
          const valores = [];
   
          if (nome !== undefined) {
            campos.push(`nome=$${valores.length + 1}`);
            valores.push(nome);
          }
          if (tipo_transacao !== undefined) {
            campos.push(`tipo_transacao=$${valores.length + 1}`);
            valores.push(tipo_transacao);
          }
          if (gasto_fixo !== undefined) {
            campos.push(`gasto_fixo=$${valores.length + 1}`);
            valores.push(gasto_fixo);
          }
          if (ativo !== undefined) {
            campos.push(`ativo = $${valores.length + 1}`);
            valores.push(ativo);
            console.log(typeof valores[0]);
            console.log(typeof valores);
          }
          if (id_usuario !== undefined) {
            campos.push(`id_usuario=$${valores.length + 1}`);
            valores.push(id_usuario);
          }
         
          if (campos.length === 0) {
            return res
              .status(400)
              .json({ message: "nenhum campo fornecido para atualização" });
          }
   
          const query = `update categorias set  ${campos.join(
            ","
          )} where id_categoria = ${id} RETURNING *`;
          console.log(query);
          const categorias = await BD.query(query, valores);
          //verifica se o usuario foi atualizado
   
          if (categorias.rows.length === 0) {
            return res.status(404).json({ message: `categoria não encontrado` });
          }
   
          return res.status(200).json(categorias.rows[0]);
        } catch (error) {
          res
            .status(500)
            .json({ message: "erro ao atualizar categoria", error: error.message });
        }
      }
}



export default RotasCategorias;

