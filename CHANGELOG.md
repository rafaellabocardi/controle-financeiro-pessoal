# Changelog

Todas as alterações notáveis deste projeto estão documentadas neste ficheiro.

## [1.0.0] - 2026-11-22 (Release Final - Aula 6)
### Adicionado
- Classe `MetaFinanceira` com cálculo percentual de progresso.
- Autenticação com hash criptográfico (`crypto`) na classe `Usuario`.
- Controle de autorização por titularidade da conta em `ControleFinanceiro`.
- Suíte de testes automatizados (`CT-01` a `CT-03`) no fluxo principal.
- Documentação de processo, plano de testes e análise de segurança (`Docs/processo_qualidade_seguranca.md`).

### Corrigido
- **BUG-01:** Adicionado alerta de saldo negativo ao registrar despesa superior ao saldo disponível na conta.

## [0.2.0] - 2026-11-22 (Aula 4)
### Adicionado
- Diagrama de Contexto, DFD Nível 0 e Dicionário de Dados (`Docs/dfd_dicionario.md`).
- Entidade `Conta` associada aos lançamentos e geração de resumo por categoria.

## [0.1.0] - 2026-11-22 (Aula 3)
### Adicionado
- Estrutura inicial orientada a objetos (`src/index.js`) e diagrama de classes atualizado.
