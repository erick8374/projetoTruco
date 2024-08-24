import pool from "../db.js";
export const getUsuarios = async (req, res) => {
    const client = await pool.connect();
    try {
        const result = await client.query('SELECT * FROM USUARIOS');
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