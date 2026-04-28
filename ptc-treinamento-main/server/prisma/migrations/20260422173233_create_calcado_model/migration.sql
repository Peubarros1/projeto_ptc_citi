-- CreateTable
CREATE TABLE "Calcado" (
    "id" SERIAL NOT NULL,
    "nome_produto" TEXT NOT NULL,
    "cor" TEXT NOT NULL,
    "marca" TEXT NOT NULL,
    "tamanho" INTEGER NOT NULL,
    "preco" INTEGER NOT NULL,
    "quantidade_em_estoque" INTEGER NOT NULL,

    CONSTRAINT "Calcado_pkey" PRIMARY KEY ("id")
);
