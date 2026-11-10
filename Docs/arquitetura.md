# Arquitetura e Modelagem do Sistema - Aula 2

## 1. Arquitetura de Alto Nível
O sistema utiliza uma arquitetura em camadas composta por:
- **Frontend (Web):** HTML/CSS/JavaScript (Interface do usuário).
- **Backend (API REST):** Processamento da lógica de negócio e regras financeiras.
- **Módulo de Autenticação:** Gestão de login e tokens de segurança.
- **Banco de Dados:** Armazenamento relacional das transações e usuários.

## 2. Diagramas UML

### Diagrama de Casos de Uso
- **Atores:** Usuário
- **Funcionalidades:** Criar Conta, Fazer Login, Cadastrar Receita/Despesa, Gerenciar Categorias, Consultar Extrato por Período, Visualizar Resumo Financeiro.

### Diagrama de Classes
- **Usuario:** id, nome, email, senhaHash | autenticar(), cadastrar()
- **Lancamento:** id, descricao, valor, data, tipo | editar(), excluir()
- **Categoria:** id, nome, tipo | listar()
