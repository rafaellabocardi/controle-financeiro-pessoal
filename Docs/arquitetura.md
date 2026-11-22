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
## Modelagem Orientada a Objetos (Aula 3)

### Classes Centrais e Relacionamentos
- **Usuario** (`id`, `nome`, `email`, `senhaHash`): `autenticar()`, `cadastrar()`, `atualizarPerfil()`
- **Conta** (`id`, `nome`, `saldoAtual`, `tipo`): `atualizarSaldo()`, `consultarSaldo()`
- **Lancamento** (`id`, `descricao`, `valor`, `data`, `tipo`): `registrar()`, `editar()`, `excluir()`
- **Categoria** (`id`, `nome`, `tipo`): `listar()`, `criar()`
- **MetaFinanceira** (`id`, `titulo`, `valorObjetivo`, `valorAtual`, `prazo`): `adicionarProgresso()`, `calcularPercentual()`

**Relacionamentos:**
- `Usuario` (1) -> (0..*) `Conta`
- `Usuario` (1) -> (0..*) `Lancamento`
- `Usuario` (1) -> (0..*) `MetaFinanceira`
- `Conta` (1) -> (0..*) `Lancamento`
- `Categoria` (1) -> (0..*) `Lancamento`

### Manutenção Futura Prevista
- **Manutenção Evolutiva:** Integração futura com APIs de Open Finance para importação automática de extratos bancários.
