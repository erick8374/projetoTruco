import pool from "../db.js";

export const getCampeonatos = async (req, res) => {
    const client = await pool.connect();
    try {
        const campeonatoId = req.params.id;
        const result = await client.query(`SELECT * FROM CAMPEONATOS WHERE Id_Campeonato = $1`,[campeonatoId]);
        //const jsonData = result.rows.map(row => ({
        //    id: row.id,
        //    name: row.name
        //}));
        res.status(200).json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Erro ao buscar campeonatos' });
    } finally {
        client.release();
    }
};

export const postCampeonatos = async (req, res) => {
    const client = await pool.connect();
    try {
        const campeonato = req.body;
        const result = await client.query(`
            INSERT INTO CAMPEONATOS(Id_Campeonato,nome,data_inicio,data_fim)
            VALUES ($1,$2,$3,$4) RETURNING *`,
            [
                campeonato.id,
                campeonato.nome,
                campeonato.data_inicio,
                campeonato.data_fim
            ]);
        res.status(201).send("Campeonato adicionado com sucesso");
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Erro ao adicionar o campeonato' });
    } finally {
        client.release();
    }
};

export const deleteCampeonatos = async (req, res) => {
    const client = await pool.connect();
    try {
        const campeonatoId = req.params.id;
        const result = await client.query(`DELETE FROM CAMPEONATOS WHERE Id_Campeonato=$1`,[campeonatoId]);
        res.status(200).send("Campeonato deletado com sucesso");
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Erro ao deletar Campeonato' });
    } finally {
        client.release();
    }
};


export const updateCampeonatos = async (req, res) => {
    const client = await pool.connect();
    try {
        const campeonatoId = req.params.id;
        const campeonatoBody = req.body;
        const result = await client.query(`UPDATE CAMPEONATOS SET NOME = $1 WHERE Id_Campeonato=$2`,[campeonatoBody.nome,campeonatoId]);
        res.status(200).send("Usuário atualizado com sucesso");
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Erro ao atualizado pessoa' });
    } finally {
        client.release();
    }
};