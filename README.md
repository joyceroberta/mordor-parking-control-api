# Mordor Parking Control API

Uma API criada para um serviço fictício de estacionamento chamado "Mordor Parking". Essa aplicação permite registrar entradas e saídas no estacionamento, processar pagamentos e visualizar o histórico de estacionamento com base nas placas dos veículos.

---

## Funcionalidades

- **Registrar entrada de estacionamento** por número de placa.
- **Registrar pagamento** para um veículo.
- **Registrar saída de estacionamento** por número de placa e somente após o pagamento.
- **Obter histórico de estacionamento** por placa de veículo.
- **Validar o formato da placa** (AAA-9999).

---

## Tecnologias Utilizadas

- **Node.js**: Ambiente de execução JavaScript para rodar a aplicação backend.
- **Express.js**: Framework web para construir a API REST.
- **MongoDB**: Banco de dados NoSQL para armazenar os registros de estacionamento.
- **Mongoose**: Biblioteca ODM (Object Data Modeling) para interagir com o MongoDB.
- **dotenv**: Para carregar variáveis de ambiente a partir de um arquivo `.env`.

---

## Requisitos de Sistema

Certifique-se de que você possui as seguintes ferramentas instaladas:

- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/)
- [Git](https://git-scm.com/)
- [Docker](https://www.docker.com/) e [Docker Compose](https://docs.docker.com/compose/)

---

## Como Rodar o Projeto Localmente

### 1. Clone o repositório:

```bash
git clone https://github.com/joyceroberta/mordor-parking-control-api.git
cd mordor-parking-control-api
```

### 2. Instale as dependências:

```bash
npm install
```

### 3. Configure o ambiente:

Use o arquivo `.env.example` como referência para criar seu próprio arquivo `.env`. Por exemplo:

```env
PORT=3000
MONGO_URI=mongodb://localhost:27017/mordor_parking_control
```

Se estiver utilizando uma instância do MongoDB hospedada ou em produção, substitua `localhost` pela URL do serviço.

### 4. Rode o servidor: 

Execute o servidor usando o seguinte comando:

```bash
npm run start
```

Por padrão, o servidor será iniciado na porta `3000`.

---

## Executar com Docker

O projeto possui um `Dockerfile` e um arquivo `docker-compose.yml`. Para rodar o projeto usando Docker:

### Construir e rodar o contêiner:

```bash
docker-compose up --build
```

A aplicação estará disponível em `http://localhost:3000`.

### Testar a aplicação dentro do contêiner:

```bash
docker-compose exec api npm test
```

---

## Rodar os Testes

Para rodar os testes automatizados, use o comando:

```bash
npm test
```

Certifique-se de que você configurou o ambiente de teste corretamente e que o banco de dados em memória (MongoMemoryServer) está funcionando.

---

## Endpoints da API

### **POST /parking**

- Registra uma nova entrada de estacionamento.
- **Corpo da Requisição**: `{ "plate": "AAA-9999" }`
- **Resposta**: `{ "reservation": "<id-do-estacionamento>" }`

### **GET /parking/:plate**

- Recupera o histórico de estacionamento baseado na placa do veículo.
- **Parâmetro de URL**: `plate` (ex: `AAA-9999`)
- **Resposta**:
  ```json
  [
    { "id": "676a0523a5ae9f604be6eae0", "time": "25 minutos", "paid": true, "left": false }
  ]
  ```

### **PUT /parking/:id/pay**

- Registra o pagamento para uma entrada de estacionamento.
- **Parâmetro de URL**: `id` (ID da reserva de estacionamento)
- **Resposta**: `{ "message": "Payment made successfully." }`

### **PUT /parking/:id/out**

- Marca o veículo como "saiu" (o veículo saiu do estacionamento).
- **Parâmetro de URL**: `id` (ID da reserva de estacionamento)
- **Resposta**: `{ "message": "Vehicle already left the parking." }`

---

## Estrutura de Pastas

```
/src
  /controllers    - Funções de controle para manipular as requisições HTTP
  /models         - Modelos do MongoDB
  /routes         - Rotas do Express para definir os endpoints da API
  /services       - Lógica de negócio
  /app.js         - Configuração principal do servidor
/index.js         - Inicialização do servidor
```

---

## Retornos e Erros

### Respostas de Sucesso

- **201 Created**: Quando um novo recurso é criado com sucesso.
  - Exemplo:
    ```json
    {
      "reservation": "607f1f77bcf86cd799439011"
    }
    ```

- **200 OK**: Quando a operação foi bem-sucedida.
  - Exemplo:
    ```json
    [
      { "id": "607f1f77bcf86cd799439011", "time": "25 minutos", "paid": true, "left": false }
    ]
    ```

### Respostas de Erro

- **400 Bad Request**: Quando a requisição está malformada ou algum dado obrigatório está faltando.
  - Exemplo:
    ```json
    {
      "error": "You must enter the license plate number."
    }
    ```

- **404 Not Found**: Quando não há registros encontrados, como uma placa não registrada ou um pagamento inexistente.
  - Exemplo:
    ```json
    {
      "error": "Record not found for the provided board."
    }
    ```

---

## Links Úteis

- [Documentação do Node.js](https://nodejs.org/)
- [Documentação do Express](https://expressjs.com/)
- [Documentação do MongoDB](https://www.mongodb.com/)
- [Documentação do Mongoose](https://mongoosejs.com/)
