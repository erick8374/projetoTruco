import pool from "../db.js";

export const getUsuarios = async (req, res) => {
    const client = await pool.connect();
    try {
        const usuarioId = req.params.id;
        const result = await client.query(`SELECT * FROM USUARIOS WHERE id_usuario = $1`,[usuarioId]);
        //const jsonData = result.rows.map(row => ({
        //    id: row.id,
        //    name: row.name
        //}));
        res.status(200).json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Erro ao buscar pessoas' });
    } finally {
        client.release();
    }
};

export const postUsuarios = async (req, res) => {
    const client = await pool.connect();
    try {
        const usuario = req.body;
        const result = await client.query(`
            INSERT INTO USUARIOS(id_usuario,nome,email,password)
            VALUES ($1,$2,$3,$4) RETURNING *`,
            [
                usuario.id,
                usuario.nome,
                usuario.email,
                usuario.password
            ]);
        res.status(201).send("Usuário adicionado com sucesso");
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Erro ao adicionar o usuário' });
    } finally {
        client.release();
    }
};

export const deleteUsuarios = async (req, res) => {
    const client = await pool.connect();
    try {
        const usuarioId = req.params.id;
        const result = await client.query(`DELETE FROM USUARIOS WHERE id_usuario=$1`,[usuarioId]);
        res.status(200).send("Usuário deletado com sucesso");
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Erro ao deletar pessoa' });
    } finally {
        client.release();
    }
};


export const updateUsuarios = async (req, res) => {
    const client = await pool.connect();
    try {
        const usuarioId = req.params.id;
        const usuarioBody = req.body;
        const result = await client.query(`UPDATE USUARIOS SET NOME = $1 WHERE id_usuario=$2`,[usuarioBody.nome,usuarioId]);
        res.status(200).send("Usuário atualizado com sucesso");
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Erro ao atualizado pessoa' });
    } finally {
        client.release();
    }
};