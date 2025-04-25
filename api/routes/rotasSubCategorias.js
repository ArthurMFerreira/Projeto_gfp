import { BD } from "../db.js";

class RotasSubCategorias {
  static async novaSubcategoria(req, res) {
    const { nome, gasto_fixo, id_categoria } = req.body;

    try {
      const resultado = await BD.query(
        `INSERT INTO subcategorias (nome, gasto_fixo, id_categoria)
                 VALUES ($1, $2, $3)
                 RETURNING *`,
        [nome, gasto_fixo, id_categoria]
      );

      res.status(201).send(resultado.rows[0]);
    } catch (error) {
      console.error("Erro ao criar Subcategoria", error);
      res
        .status(500)
        .json({ message: "Erro ao criar Subcategoria", error: error.message });
    }
  }

  static async atualizarSubcategoria(req, res) {
    const { id } = req.params;
    const { nome, gasto_fixo, id_categoria } = req.body;

    try {
      const resultado = await BD.query(
        `UPDATE subcategorias
                 SET nome = $1, gasto_fixo = $2 , id_categoria = $3
                 WHERE id_subcategoria = $4
                 RETURNING *`,
        [nome, gasto_fixo, id_categoria, id]
      );

      if (resultado.rows.length === 0) {
        return res.status(404).json({ message: "Subcategoria não encontrada" });
      }

      res.status(200).json(resultado.rows[0]);
    } catch (error) {
      res
        .status(500)
        .json({
          message: "Erro ao atualizar a subcategoria",
          error: error.message,
        });
    }
  }

  static async listarSubcategorias(req, res) {
    try {
      const categorias = await BD.query("SELECT * FROM subcategorias");
      res.status(200).json(categorias.rows);
    } catch (error) {
      res
        .status(500)
        .json({
          message: "Erro ao listar as Subcategorias",
          error: error.message,
        });
    }
  }

  static async deletarcategoria(req, res) {
    const { id } = req.params;
    try {
      await BD.query("DELETE FROM subcategorias WHERE id_subcategoria = $1", [
        id,
      ]);
      res.status(200).json({ message: "subCategoria deletado com sucesso" });
    } catch (error) {
      res
        .status(500)
        .json({
          message: "Erro ao deletar subcategoria",
          error: error.message,
        });
    }
  }

  static async editar(req, res) {
    const { id } = req.params;

    const { nome, gasto_fixo, id_categoria, ativo } = req.body;
    console.log(typeof ativo);
    try {
      //inicializar arrays(vetores) para armazenar os campos e valores a serem atualizados
      const campos = [];
      const valores = [];

      if (nome !== undefined) {
        campos.push(`nome=$${valores.length + 1}`);
        valores.push(nome);
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
      if (id_categoria !== undefined) {
        campos.push(`id_usuario=$${valores.length + 1}`);
        valores.push(id_categoria);
      }

      if (campos.length === 0) {
        return res
          .status(400)
          .json({ message: "nenhum campo fornecido para atualização" });
      }

      const query = `update subcategorias set  ${campos.join(
        ","
      )} where id_subcategoria = ${id} RETURNING *`;
      console.log(query);
      const subCategoria = await BD.query(query, valores);
      //verifica se o usuario foi atualizado

      if (subCategoria.rows.length === 0) {
        return res.status(404).json({ message: `categoria não encontrado` });
      }

      return res.status(200).json(subCategoria.rows[0]);
    } catch (error) {
      res
        .status(500)
        .json({
          message: "erro ao atualizar subcategoria",
          error: error.message,
        });
    }
  }
}

export default RotasSubCategorias;
