import express from "express";
import { readAllUsers } from "./controllers/UserController";
import {
	countTotalPares,
	createCalcado,
	deleteCalcado,
	findCalcadosByMarca,
	findCalcadosByTamanho,
	readAllCalcados,
	updateCalcado,
} from "./controllers/CalcadosController";

const routes = express.Router();

// Rota ja existente de usuarios.
// Mantida para nao impactar funcionalidades anteriores do projeto.
routes.get("/users", readAllUsers);

// CRUD principal de calcados.
// POST: cria item
// GET: lista itens
// PATCH: atualiza por id
// DELETE: remove por id
routes.post("/calcados", createCalcado);
routes.get("/calcados", readAllCalcados);
routes.patch("/calcados/:id", updateCalcado);
routes.delete("/calcados/:id", deleteCalcado);

// Rotas extras do desafio.
// tamanho: filtra por numero
// marca: filtra por texto
// estoque/total: retorna soma da quantidade_em_estoque
routes.get("/calcados/tamanho/:tamanho", findCalcadosByTamanho);
routes.get("/calcados/marca/:marca", findCalcadosByMarca);
routes.get("/calcados/estoque/total", countTotalPares);


export default routes;
