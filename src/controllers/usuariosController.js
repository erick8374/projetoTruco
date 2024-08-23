export const getUsuarios = (req,res) =>{
    try {
        res.status(200);
    } catch {
        console.error(err);
        res.status(500).json({message: 'Erro ao listar usuarios'});
    }
}