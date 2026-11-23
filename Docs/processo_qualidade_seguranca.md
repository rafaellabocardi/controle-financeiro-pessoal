# Processo de Desenvolvimento, Qualidade e Segurança (Aulas 5 e 6)

## 1. Modelo de Processo Escolhido (Aula 5)
Adotou-se o **Modelo Incremental** aliado a boas práticas ágeis. A escolha justifica-se pela necessidade de entregar rapidamente um núcleo funcional validável (cadastro de lançamentos e cálculo de saldo) e evoluir o sistema em ciclos curtos sem comprometer a estabilidade das entregas anteriores.

### Plano de Incrementos
- **Incremento 1 (`v0.1.0` - Aula 3):** Estruturação das classes base (`Usuario`, `Categoria`, `Lancamento`) e cálculo simples de saldo.
- **Incremento 2 (`v0.2.0` - Aula 4):** Inclusão da entidade `Conta`, validação de tipos de movimentação e relatório por categoria alinhados ao DFD Nível 0.
- **Incremento 3 (`v1.0-final` - Aulas 5 e 6):** Inclusão de `MetaFinanceira`, hash de senha, controle de autorização por usuário, alerta de saldo negativo e suíte de testes automatizados.

---

## 2. Plano e Registro de Testes (Aula 6)

| ID | Nível | Cenário Testado | Entrada | Resultado Esperado | Status |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `CT-01` | Integração | Atualização de saldo após receita e despesa | Saldo `500`, Receita `3500`, Despesa `450.50` | Saldo final igual a `3549.50` | Aprovado |
| `CT-02` | Unitário | Bloqueio de valor negativo ou zero | `valor = -100` | Exceção de validação lançada | Aprovado |
| `CT-03` | Sistema/Segurança | Tentativa de acesso a conta de outro usuário | `usuarioLogado.id != conta.usuario.id` | Exceção `"Acesso negado"` | Aprovado |
| `CT-04` | Unitário | Cálculo de progresso de meta financeira | Objetivo `5000`, Aporte `1500` | Percentual igual a `30.0%` | Aprovado |

### Bugs Identificados e Corrigidos
- **BUG-01 (Corrigido na v1.0):** Despesas superiores ao saldo deixavam a conta negativa sem feedback visual. **Correção:** Implementado alerta explícito (`console.warn`) no método `Conta.atualizarSaldo()` sempre que `saldoAtual < 0`.

---

## 3. Análise Básica de Segurança (Aula 6)
- **Dados Sensíveis:** Senhas nunca são armazenadas em texto plano; utiliza-se hash criptográfico (`SHA-256` no protótipo, com migração prevista para `bcrypt` em produção).
- **Autenticação e Autorização:** O método `Usuario.autenticar()` valida o hash da credencial, e `ControleFinanceiro.registrarLancamento()` verifica a titularidade da conta (`conta.usuario.id === usuarioLogado.id`).
- **Validação de Entradas:** Rejeição estrita de valores não numéricos, menores ou iguais a zero e tipos de lançamento fora do domínio (`Receita` / `Despesa`).
- **Segredos e Dependências:** Nenhuma credencial fixa no código-fonte; utilização exclusiva de módulos nativos do Node.js (`crypto`), eliminando vulnerabilidades de pacotes externos de terceiros.
- **Riscos Residuais:** Ausência de persistência criptografada em banco de dados e proteção contra força bruta (rate limiting), previstos para evolução futura.
