# Análise Estruturada, DFD e Dicionário de Dados (Aula 4)

## 1. Revisão do Incremento Anterior
Na etapa anterior (Aula 3), definimos 5 classes centrais (`Usuario`, `Conta`, `Lancamento`, `Categoria`, `MetaFinanceira`), mas o protótipo inicial implementou apenas `Usuario`, `Categoria` e `Lancamento` de forma simplificada em memória, sem vincular os lançamentos a uma `Conta` específica e sem validação estrita dos tipos de movimentação.

## 2. Diagrama de Contexto

```text
+---------------+   Credenciais, Dados de Conta,      +-----------------------------------+
|               |   Lançamentos e Metas               |                                   |
|               | ----------------------------------> |   0. Sistema de Controle          |
|    Usuário    |                                     |      Financeiro Pessoal           |
|               | <---------------------------------- |                                   |
+---------------+   Saldo Atualizado, Extratos,       +-----------------------------------+
                       Alertas e Relatórios
```
## 3. DFD Nível 0
```text
+---------+  1. Dados Cadastro/Login   +------------------------+  Dados Usuário   +---------------+
|         | -------------------------> | 1.0 Gerenciar Acesso e | ---------------> | D1: Usuários  |
|         | <------------------------- |     Contas             | <--------------- |     e Contas  |
|         |     Token / Status Conta   +------------------------+                  +---------------+
|         |                                        |
|         |                                        | Usuário Autenticado
|         |                                        v
| Usuário |  2. Receita / Despesa      +------------------------+  Grava/Lê        +---------------+
|         | -------------------------> | 2.0 Registrar e        | ---------------> | D2: Lançamen- |
|         | <------------------------- |     Categorizar        | <--------------- |     tos       |
|         |     Comprovante / Saldo    |     Lançamentos        |                  +---------------+
|         |                            +------------------------+                         |
|         |                                        |                                      |
|         |                                        | Valor Movimentado                    |
|         |                                        v                                      |
|         |  3. Solicita Resumo/Meta   +------------------------+  Consulta        +---------------+
|         | -------------------------> | 3.0 Calcular Saldo e   | <--------------- | D3: Categorias|
|         | <------------------------- |     Acompanhar Metas   |                  |     e Metas   |
+---------+     Relatório / Progresso  +------------------------+                  +---------------+
