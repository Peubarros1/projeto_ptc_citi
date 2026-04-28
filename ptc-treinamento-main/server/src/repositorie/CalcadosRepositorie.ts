import prisma from "@database";

// Contrato minimo para criacao de calcado.
// Este tipo ajuda o TypeScript a garantir que o create receba todos os campos necessarios.
type CalcadoPayload = {
  nome_produto: string;
  cor: string;
  marca: string;
  tamanho: number;
  preco: number;
  quantidade_em_estoque: number;
};

// CREATE no banco de dados.
// Recebe os dados prontos e delega a insercao ao Prisma.
export const criarCalcadoRepo = async (data: CalcadoPayload) => {
  return prisma.calcado.create({ data });
};

// READ de lista.
// Ordenacao por id asc facilita visualizacao cronologica dos registros.
export const listarCalcadosRepo = async () => {
  return prisma.calcado.findMany({ orderBy: { id: "asc" } }); //equivalente em sql a SELECT * FROM calcado ORDER BY id ASC
};

// UPDATE parcial.
// O Partial permite enviar somente os campos que mudaram.
export const atualizarCalcadoRepo = async (id: number, data: Partial<CalcadoPayload>) => {
  return prisma.calcado.update({
    where: { id },//equivalente em sql a UPDATE calcado SET {data} WHERE id = {id}
    data,
  });
};

// DELETE por id.
// Remove o registro de forma definitiva na tabela de calcados.
export const removerCalcadoRepo = async (id: number) => {
  return prisma.calcado.delete({ where: { id } });//equivalente em sql a DELETE FROM calcado WHERE id = {id}
};

// Filtro por tamanho exato (extra do desafio).
export const buscarCalcadosPorTamanhoRepo = async (tamanho: number) => {
  return prisma.calcado.findMany({
    where: { tamanho },
    orderBy: { id: "asc" },//equivalente em sql a SELECT * FROM calcado WHERE tamanho = {tamanho} ORDER BY id ASC
  });
};

// Filtro por marca sem diferenciar maiusculas/minusculas (case-insensitive).
export const buscarCalcadosPorMarcaRepo = async (marca: string) => {
  return prisma.calcado.findMany({
    where: { marca: { equals: marca, mode: "insensitive" } },
    orderBy: { id: "asc" },//equivalente em sql a SELECT * FROM calcado WHERE marca = {marca} ORDER BY id ASC
  });
};

// Resumo do estoque (extra do desafio).
// Usa aggregate com _sum para retornar o total de pares no campo quantidade_em_estoque.
export const contarTotalParesRepo = async () => {
  const result = await prisma.calcado.aggregate({//equivalente em sql a SELECT SUM(quantidade_em_estoque) FROM calcado
    _sum: { quantidade_em_estoque: true },
  });

  // Se nao houver registros, o Prisma pode retornar null no sum; por isso o fallback 0.
  return result._sum.quantidade_em_estoque ?? 0;
};
