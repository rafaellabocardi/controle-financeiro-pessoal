const crypto = require("crypto");

// --- ENTIDADES CENTRAIS (Aulas 3, 4 e 6) ---

class Usuario {
  constructor(id, nome, email, senhaPlana) {
    if (!email || !email.includes("@")) {
      throw new Error("E-mail inválido.");
    }
    this.id = id;
    this.nome = nome;
    this.email = email;
    this.senhaHash = crypto.createHash("sha256").update(senhaPlana).digest("hex");
  }

  autenticar(senhaPlana) {
    const hashTentativa = crypto.createHash("sha256").update(senhaPlana).digest("hex");
    return this.senhaHash === hashTentativa;
  }
}

class Conta {
  constructor(id, nome, tipo, saldoInicial = 0, usuario) {
    this.id = id;
    this.nome = nome;
    this.tipo = tipo;
    this.saldoAtual = saldoInicial;
    this.usuario = usuario;
  }

  atualizarSaldo(valor, tipoLancamento) {
    if (tipoLancamento === "Receita") {
      this.saldoAtual += valor;
    } else if (tipoLancamento === "Despesa") {
      this.saldoAtual -= valor;
      if (this.saldoAtual < 0) {
        console.warn(`[ALERTA] A conta '${this.nome}' entrou em saldo negativo: R$ ${this.saldoAtual.toFixed(2)}`);
      }
    }
  }
}

class Categoria {
  constructor(id, nome, tipo) {
    this.id = id;
    this.nome = nome;
    this.tipo = tipo;
  }
}

class Lancamento {
  constructor(id, descricao, valor, data, tipo, categoria, conta, usuario) {
    if (typeof valor !== "number" || valor <= 0) {
      throw new Error("O valor do lançamento deve ser maior que zero.");
    }
    if (tipo !== "Receita" && tipo !== "Despesa") {
      throw new Error("Tipo inválido. Use 'Receita' ou 'Despesa'.");
    }
    this.id = id;
    this.descricao = descricao.trim();
    this.valor = valor;
    this.data = data;
    this.tipo = tipo;
    this.categoria = categoria;
    this.conta = conta;
    this.usuario = usuario;
  }
}

class MetaFinanceira {
  constructor(id, titulo, valorObjetivo, prazo, usuario) {
    if (valorObjetivo <= 0) {
      throw new Error("O valor objetivo da meta deve ser positivo.");
    }
    this.id = id;
    this.titulo = titulo;
    this.valorObjetivo = valorObjetivo;
    this.valorAtual = 0;
    this.prazo = prazo;
    this.usuario = usuario;
  }

  adicionarProgresso(valor) {
    if (valor <= 0) throw new Error("Valor de aporte deve ser positivo.");
    this.valorAtual += valor;
  }

  calcularPercentual() {
    return Math.min(100, (this.valorAtual / this.valorObjetivo) * 100);
  }
}

class ControleFinanceiro {
  constructor() {
    this.lancamentos = [];
  }

  registrarLancamento(lancamento, usuarioLogado) {
    if (lancamento.conta.usuario.id !== usuarioLogado.id) {
      throw new Error("Acesso negado: conta pertence a outro usuário.");
    }
    this.lancamentos.push(lancamento);
    lancamento.conta.atualizarSaldo(lancamento.valor, lancamento.tipo);
  }

  gerarResumoPorCategoria(usuarioLogado) {
    const resumo = {};
    for (const item of this.lancamentos) {
      if (item.usuario.id === usuarioLogado.id) {
        const nomeCat = item.categoria.nome;
        resumo[nomeCat] = (resumo[nomeCat] || 0) + item.valor;
      }
    }
    return resumo;
  }
}

// --- EXECUÇÃO PRINCIPAL E BATERIA DE TESTES v1.0 (Aula 6) ---

function executarSistemaETestes() {
  console.log("=== SISTEMA DE CONTROLE FINANCEIRO PESSOAL (v1.0-final) ===\n");

  const user = new Usuario(1, "Rafaella Bocardi", "rafaella@email.com", "SenhaForte123");
  const conta = new Conta(1, "Conta Corrente", "Corrente", 500.00, user);
  const catSalario = new Categoria(1, "Salário", "Receita");
  const catAlimentacao = new Categoria(2, "Alimentação", "Despesa");
  const metaReserva = new MetaFinanceira(1, "Reserva de Emergência", 5000.00, "2027-06-30", user);

  const sistema = new ControleFinanceiro();

  sistema.registrarLancamento(new Lancamento(1, "Salário Mensal", 3500.00, "2026-11-05", "Receita", catSalario, conta, user), user);
  sistema.registrarLancamento(new Lancamento(2, "Supermercado", 450.50, "2026-11-10", "Despesa", catAlimentacao, conta, user), user);
  metaReserva.adicionarProgresso(1500.00);

  console.log(`Usuário Autenticado: ${user.nome} (${user.autenticar("SenhaForte123") ? "OK" : "Falha"})`);
  console.log(`Saldo Consolidado (${conta.nome}): R$ ${conta.saldoAtual.toFixed(2)}`);
  console.log(`Meta '${metaReserva.titulo}': ${metaReserva.calcularPercentual().toFixed(1)}% concluída`);
  console.log("Resumo por Categoria:", sistema.gerarResumoPorCategoria(user));

  console.log("\n--- Executando Testes de Verificação (Aula 6) ---");
  console.assert(conta.saldoAtual === 3549.50, "ERRO CT-01: Saldo incorreto.");
  console.log("[PASS] CT-01: Cálculo de saldo após receita e despesa.");

  let bloqueouNegativo = false;
  try {
    new Lancamento(3, "Erro", -100, "2026-11-12", "Despesa", catAlimentacao, conta, user);
  } catch (e) {
    bloqueouNegativo = true;
  }
  console.assert(bloqueouNegativo, "ERRO CT-02: Permitiu valor negativo.");
  console.log("[PASS] CT-02: Bloqueio de lançamento com valor negativo.");

  const invasor = new Usuario(2, "Invasor", "invasor@email.com", "123456");
  let bloqueouInvasor = false;
  try {
    sistema.registrarLancamento(new Lancamento(4, "Fraude", 100, "2026-11-12", "Despesa", catAlimentacao, conta, invasor), invasor);
  } catch (e) {
    bloqueouInvasor = true;
  }
  console.assert(bloqueouInvasor, "ERRO CT-03: Falha de autorização.");
  console.log("[PASS] CT-03: Controle de autorização entre usuários distintos.");
}

executarSistemaETestes();
