import express from 'express';

const app = express();
app.use(express.json());

var items = [
    {
      id:1,
      item: "meu item um"
    },
    {
      id:2,
      item: "meu item dois"
    }
]

app.get("/listar", (req, res) => {
   res.status(200).json(items); 
});

app.post("/adicionar", (req, res) => {
    items.push(req.body);
    res.status(201).send("Adicionado");
 });

function buscaItem(id) {
    return items.findIndex(item => {
        return item.id === Number(id);
    });
}
app.put("/atualizar/:id", (req, res) => {
    const index = buscaItem(req.params.id);
    items[index].item = req.body.item;
    res.status(200).json(items[index]);
});
app.delete("/remover/:id", (req, res) => {
    const index = buscaItem(req.params.id);
    items.splice(index, 1);
    res.status(200).send("item removido");
  });

export default app;