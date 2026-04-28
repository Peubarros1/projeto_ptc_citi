import { Request, Response } from "express";
import {
  countTotalParesRepo,
  createCalcadoRepo,
  deleteCalcadoRepo,
  findCalcadosByMarcaRepo,
  findCalcadosByTamanhoRepo,
  readAllCalcadosRepo,
  updateCalcadoRepo,
} from "../repositorie/CalcadosRepositorie";

// Toda rota com :id recebe texto em req.params.
// Este helper centraliza a conversao para inteiro e evita repetir parseInt em varias funcoes.
const parseId = (value: string) => Number.parseInt(value, 10);

// CREATE
// Cadastra um novo calcado no estoque.
// 1) Le os campos do body.
// 2) Valida obrigatorios.
// 3) Converte os numericos para Number antes de salvar.
// 4) Retorna 201 com o registro criado.
export const createCalcado = async (req: Request, res: Response) => {
  try {
    const { nome_produto, cor, marca, tamanho, preco, quantidade_em_estoque } = req.body;

    // Bloqueia cadastro incompleto para nao gravar dado faltando no banco.
    if (
      !nome_produto ||
      !cor ||
      !marca ||
      tamanho === undefined ||
      preco === undefined ||
      quantidade_em_estoque === undefined
    ) {
      return res.status(400).json({
        message: "Preencha todos os campos obrigatorios do calcado.",
      });
    }

    // Conversao explicita dos campos numericos evita salvar string por engano.
    const newCalcado = await createCalcadoRepo({
      nome_produto,
      cor,
      marca,
      tamanho: Number(tamanho),
      preco: Number(preco),
      quantidade_em_estoque: Number(quantidade_em_estoque),
    });

    return res.status(201).json(newCalcado);
  } catch (error) {
    return res.status(400).json({
      message: "Erro ao criar calcado.",
      error,
    });
  }
};

// READ (LISTA)
// Retorna todos os calcados cadastrados no sistema.
export const readAllCalcados = async (_req: Request, res: Response) => {
  try {
    const calcados = await readAllCalcadosRepo();

    // Mantido para preservar a logica atual do projeto.
    if (!calcados) {
      return res.status(404).json({
        message: "Nenhum calcado cadastrado ainda.",
      });
    }

    return res.status(200).json(calcados);
  } catch (error) {
    return res.status(400).json({
      message: "Erro ao buscar calcados.",
      error,
    });
  }
};

// UPDATE
// Atualiza um calcado existente pelo id.
// O body pode conter apenas os campos que devem ser alterados.
export const updateCalcado = async (req: Request, res: Response) => {
  try {
    const id = parseId(req.params.id);

    // Se o id nao for numero valido, encerra com erro 400.
    if (Number.isNaN(id)) {
      return res.status(400).json({ message: "ID invalido." });
    }

    const payload = req.body as {
      nome_produto?: string;
      cor?: string;
      marca?: string;
      tamanho?: number;
      preco?: number;
      quantidade_em_estoque?: number;
    };

    // A regra de atualizacao parcial fica no repositorio via payload parcial.
    const updatedCalcado = await updateCalcadoRepo(id, payload);

    return res.status(200).json(updatedCalcado);
  } catch (error) {
    return res.status(400).json({
      message: "Erro ao atualizar calcado.",
      error,
    });
  }
};

// DELETE
// Remove um calcado do estoque pelo id informado na rota.
export const deleteCalcado = async (req: Request, res: Response) => {
  try {
    const id = parseId(req.params.id);

    // Garante id valido antes de tentar excluir no banco.
    if (Number.isNaN(id)) {
      return res.status(400).json({ message: "ID invalido." });
    }

    await deleteCalcadoRepo(id);

    return res.status(200).json({ message: "Calcado removido com sucesso." });
  } catch (error) {
    return res.status(400).json({
      message: "Erro ao remover calcado.",
      error,
    });
  }
};

// EXTRA: BUSCA POR TAMANHO
// Lista todos os calcados com o tamanho recebido via params.
export const findCalcadosByTamanho = async (req: Request, res: Response) => {
  try {
    const tamanho = Number(req.params.tamanho);

    // Evita consulta com parametro invalido.
    if (Number.isNaN(tamanho)) {
      return res.status(400).json({ message: "Tamanho invalido." });
    }

    const calcados = await findCalcadosByTamanhoRepo(tamanho);
    return res.status(200).json(calcados);
  } catch (error) {
    return res.status(400).json({
      message: "Erro ao buscar calcados por tamanho.",
      error,
    });
  }
};

// EXTRA: BUSCA POR MARCA
// Retorna todos os calcados da marca informada.
export const findCalcadosByMarca = async (req: Request, res: Response) => {
  try {
    const { marca } = req.params;

    // Sem marca nao existe filtro valido.
    if (!marca) {
      return res.status(400).json({ message: "Marca invalida." });
    }

    const calcados = await findCalcadosByMarcaRepo(marca);
    return res.status(200).json(calcados);
  } catch (error) {
    return res.status(400).json({
      message: "Erro ao buscar calcados por marca.",
      error,
    });
  }
};

// EXTRA: TOTAL DE PARES
// Retorna um resumo com o total de pares somando todo o estoque.
export const countTotalPares = async (_req: Request, res: Response) => {
  try {
    const total = await countTotalParesRepo();
    return res.status(200).json({ total_de_pares: total });
  } catch (error) {
    return res.status(400).json({
      message: "Erro ao contar total de pares no estoque.",
      error,
    });
  }
};
