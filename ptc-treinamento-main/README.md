<!-- PROJECT LOGO -->
<br />
<p align="center">
  <a href="https://github.com/citi-onboarding/pta-boilerplate">
    <img src="./assets/logoCITi.png" alt="Logo" width="180px">
  </a>

  <h3 align="center">PTC</h3>

  <p align="center">
  Esse boilerplate foi criado durante o processo seletivo de 2022 do CITi e atualizado em 202612 com o intuito de aproximar as pessoas aspirantes à realidade
  dentro do CITi. O boilerplate será usado durante essa etapa do processo seletivo, a qual tem o objetivo de introduzir a subárea de dev aos aspirantes do CITi.
    <br />
    <a href="https://github.com/citi-onboarding/pta-boilerplate"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    ·
    <a href="https://github.com/citi-onboarding/pta-boilerplate/issues">Report Bug</a>
    ·
    <a href="https://github.com/citi-onboarding/pta-boilerplate/issues">Request Feature</a>
  </p>
</p>


<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary><h2 style="display: inline-block">Tabela de Conteúdo</h2></summary>
  <ol>
    <li><a href="#about-boilerplate">About Boilerplate</a></li>
    <li><a href="#server">Server</a></li></li>
    <ul>
        <li><a href="#how-to-install">How To Install</a></li></li>
        <li><a href="#how-to-run">How To Run</a></li></li>
    </ul>
    <li><a href="#add-new-dependencies">Add New Dependencies</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>

<br/> 

## About Boilerplate
<br/>

  Esse boilerplate foi criado durante o processo seletivo de 2022 do CITi e ele tem o intuito de aproximar as pessoas aspirantes à realidade
  dentro do CITi. O boilerplate será usado durante essa etapa do processo seletivo, a qual tem o objetivo de introduzir a subárea de desenvolvimento.
  O template foi criado em um monorepo e está estruturado em servidor.

<p align= "center">
    <img src = "./assets/client-server.png" width="85%" margin-top="20px"/>
</p>

O server tem uma estrutura base de código para a construção de uma API.


<br/> 

## Server

<br/>

## How To Install

<br/>

0. Certifique-se que o **node** e o **yarn** estejam devidamente instalados. 
   ```bash
   npm i -g yarn
   ```
   *note: em Windows, talvez você precise rodar esse comando para o pleno funcionamento do yarn:*
   ```bash
   Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy Unrestricted
   ```
1. Crie um novo Template:
   No canto direito supeior, clique em Use this template, depois em criar um novo repositorio, para ter um repositorio novo no seu computador
   

2. Clone o repositório

   ```sh
   git clone URL_DO_REPOSITÓRIO
   ```

3. Entre na pasta /server do repositório

4. Abra a pasta /server no vscode

5. Vá em terminal e abra o novo terminal 

6. Com o terminal aberto, escreva essa sentença abaixo e dê enter

   ```sh
   yarn install
   ```

   ou 

   ```sh
   npm install
   ```

<br/> 

## How To Run

<br/>

0. Certifique-se que o docker esteja devidamente instalado
1. Com a pasta /server aberta no vscode, crie um novo arquivo e o nomeie de ".env"
2. Dentro desse novo arquivo criado, coloque esse texto abaixo

   ```javascript
      # ###### GENERAL SETTINGS #######
      PROJECT_NAME=pta
      SERVER_PORT=3001 

      # ###### DATABASE SETTINGS #######
      DATABASE_TYPE=postgres
      DATABASE_HOST=${PROJECT_NAME}-db
      DATABASE_PORT=5432
      DATABASE_USER=postgres
      DATABASE_PASSWORD=docker
      DATABASE_DB=${PROJECT_NAME}

      DATABASE_URL=${DATABASE_TYPE}://${DATABASE_USER}:${DATABASE_PASSWORD}@${DATABASE_HOST}:${DATABASE_PORT}/${DATABASE_DB}
   ```
3. Abra um novo terminal no vscode
4. Com o terminal aberto, escreva essa sentença abaixo e dê enter

   ```sh
   docker-compose up
   ```

   ou 

   ```sh
   docker compose up
   ```

5. Espere que o terminal esteja dessa maneira

    <p align= "center"><img src= "./assets/server-status.png" width="85%"/>
        
    </p>

6. Com este terminal rodando, abra outro terminal, ainda na pasta /server, e rode essa sentença abaixo

   ```sh
   yarn migration
   ```

   ou 

   ```sh
   npm run migration
   ```

   *OBS. 1: Ao aparecer o campo "Enter a name for the new migration:", digite uma frase rápida que indique o que foi feito (ex.: add model user). A migration é como se fosse o commit do banco de dados.*
   
   *OBS. 2: É necessário que esse comando seja rodado a cada vez que você modificar o arquivo `schema.prisma`*

<br/> 


<br/>

1. Entre na pasta /client do repositório

2. Abra a pasta /client no vscode

3. Vá em terminal e abra o novo terminal 

4. Com o terminal aberto, escreva essa sentença abaixo e dê enter

   ```sh
   yarn dev
   ```

   ou 

   ```sh
   npm run dev
   ```

3. Espere que o terminal esteja dessa maneira

    <p align= "center"><img src= "./assets/client-status.png" width="85%"/>
        
    </p>

<br/> 

## Add New Dependencies

<br/>

Não instale novas dependências sem a autorização da pessoa gerente do projeto. Caso seja preciso, converse com gerentes e peça direcionamento 
de como faz para adicionar. 


<br/> 

## Contact

<br/>

- [Alex Damascena](https://github.com/apfdamascena), líder de desenvolvimento em 2022.1 - apfd@cin.ufpe.br
- [Tiago Lima](https://github.com/titi-lima), líder de desenvolvimento em 2023.2 - tmsl@cin.ufpe.br

## 2022 Boilerplate

<br/>

- [apfdamascena/pta-boilerplate](https://github.com/apfdamascena/pta-boilerplate)