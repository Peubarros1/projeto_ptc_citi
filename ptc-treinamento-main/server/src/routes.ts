import express from "express";
import { readAllUsers } from "./controllers/UserController";
import {
	contarTotalPares,
	criarCalcado,
	removerCalcado,
	buscarCalcadosPorMarca,
	buscarCalcadosPorTamanho,
	listarCalcados,
	atualizarCalcado,
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
routes.post("/calcados", criarCalcado);
routes.get("/calcados", listarCalcados);
routes.patch("/calcados/:id", atualizarCalcado);
routes.delete("/calcados/:id", removerCalcado);

// Rotas extras do desafio.
// tamanho: filtra por numero
// marca: filtra por texto
// estoque/total: retorna soma da quantidade_em_estoque
routes.get("/calcados/tamanho/:tamanho", buscarCalcadosPorTamanho);
routes.get("/calcados/marca/:marca", buscarCalcadosPorMarca);
routes.get("/calcados/estoque/total", contarTotalPares);


export default routes;
