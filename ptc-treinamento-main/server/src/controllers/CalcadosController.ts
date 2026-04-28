import { Request, Response } from "express";
import {
  contarTotalParesRepo,
  criarCalcadoRepo,
  removerCalcadoRepo,
  buscarCalcadosPorMarcaRepo,
  buscarCalcadosPorTamanhoRepo,
  listarCalcadosRepo,
  atualizarCalcadoRepo,
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
export const criarCalcado = async (req: Request, res: Response) => {
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
        message: "Preenche todos os campos obrigatórios do calçado, por favor.",
      });
    }

    // Conversao explicita dos campos numericos evita salvar string por engano.
    const newCalcado = await criarCalcadoRepo({
      nome_produto,
      cor,
      marca,
      tamanho: Number(tamanho), //força ser um numero mesmo que venha string
      preco: Number(preco),
      quantidade_em_estoque: Number(quantidade_em_estoque),
    });

    return res.status(201).json(newCalcado);
  } catch (error) {
    return res.status(400).json({
      message: "Não foi possível criar o calçado.",
      error,
    });
  }
};

// READ (LISTA)
// Retorna todos os calcados cadastrados no sistema.
export const listarCalcados = async (_req: Request, res: Response) => {
  try {
    const calcados = await listarCalcadosRepo();

    // Mantido para preservar a logica atual do projeto.
    if (!calcados) {
      return res.status(404).json({
        message: "Ainda não tem calçado cadastrado.",
      });
    }

    return res.status(200).json(calcados);
  } catch (error) {
    return res.status(400).json({
      message: "Não foi possível buscar os calçados.",
      error,
    });
  }
};

// UPDATE
// Atualiza um calcado existente pelo id.
// O body pode conter apenas os campos que devem ser alterados.
export const atualizarCalcado = async (req: Request, res: Response) => {
  try {
    const id = parseId(req.params.id);

    // Se o id nao for numero valido, encerra com erro 400,ou seja, evita erro no banco caso o id não seja numérico
    if (Number.isNaN(id)) {
      return res.status(400).json({ message: "ID inválido." });
    }

    const payload = req.body as { // payload(dados da requisição) permite que o body seja parcial, ou seja, pode conter apenas os campos a serem atualizados.
      nome_produto?: string;
      cor?: string;
      marca?: string;
      tamanho?: number;
      preco?: number;
      quantidade_em_estoque?: number;
    };

    // A regra de atualizacao parcial fica no repositorio via payload parcial.
    const updatedCalcado = await atualizarCalcadoRepo(id, payload);

    return res.status(200).json(updatedCalcado);// Retorna o registro atualizado para confirmar as mudanças.
  } catch (error) {
    return res.status(400).json({
      message: "Não foi possível atualizar o calçado.",
      error,
    });
  }
};

// DELETE
// Remove um calcado do estoque pelo id informado na rota.
export const removerCalcado = async (req: Request, res: Response) => {
  try {
    const id = parseId(req.params.id);

    // Garante id valido antes de tentar excluir no banco.
    if (Number.isNaN(id)) {
      return res.status(400).json({ message: "ID inválido." });
    }

    await removerCalcadoRepo(id);

    return res.status(200).json({ message: "Calçado removido com sucesso." });
  } catch (error) {
    return res.status(400).json({
      message: "Não deu pra remover o calçado.",
      error,
    });
  }
};

// EXTRA: BUSCA POR TAMANHO
// Lista todos os calcados com o tamanho recebido via params.
export const buscarCalcadosPorTamanho = async (req: Request, res: Response) => {
  try {
    const tamanho = Number(req.params.tamanho);

    // Evita consulta com parametro invalido.
    if (Number.isNaN(tamanho)) {
      return res.status(400).json({ message: "Tamanho inválido." });
    }

    const calcados = await buscarCalcadosPorTamanhoRepo(tamanho);
    return res.status(200).json(calcados);
  } catch (error) {
    return res.status(400).json({
      message: "Não foi possível buscar os calçados por tamanho.",
      error,
    });
  }
};

// EXTRA: BUSCA POR MARCA
// Retorna todos os calcados da marca informada.
export const buscarCalcadosPorMarca = async (req: Request, res: Response) => {
  try {
    const { marca } = req.params;

    // Sem marca nao existe filtro valido.
    if (!marca) {
      return res.status(400).json({ message: "Marca inválida." });
    }

    const calcados = await buscarCalcadosPorMarcaRepo(marca);
    return res.status(200).json(calcados);
  } catch (error) {
    return res.status(400).json({
      message: "Não foi possível buscar calçados por marca.",
      error,
    });
  }
};

// EXTRA: TOTAL DE PARES
// Retorna um resumo com o total de pares somando todo o estoque.
export const contarTotalPares = async (_req: Request, res: Response) => {
  try {
    const total = await contarTotalParesRepo();
    return res.status(200).json({ total_de_pares: total });
  } catch (error) {
    return res.status(400).json({
      message: "Não foi possível contar o total de pares no estoque.",
      error,
    });
  }
};
