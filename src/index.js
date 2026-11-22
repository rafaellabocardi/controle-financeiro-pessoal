class Usuario {
  constructor(id, nome, email) {
    this.id = id;
    this.nome = nome;
    this.email = email;
  }
}

class Categoria {
  constructor(id, nome, tipo) {
    this.id = id;
    this.nome = nome;
    this.tipo = tipo; // 'Receita' ou 'Despesa'
  }
}

class Lancamento {
  constructor(id, descricao, valor, data, tipo, categoria, usuario) {
    this.id = id;
    this.descricao = descricao;
    this.valor = valor;
    this.data = data;
    this.tipo = tipo;
    this.categoria = categoria;
    this.usuario = usuario;
  }
}

class ControleFinanceiro {
  constructor() {
    this.lancamentos = [];
  }

  adicionarLancamento(lancamento) {
    if (lancamento.valor <= 0) {
      throw new Error("O valor do lançamento deve ser positivo.");
    }
    this.lancamentos.push(lancamento);
  }

  calcularSaldo() {
    return this.lancamentos.reduce((saldo, item) => {
      return item.tipo === "Receita" ? saldo + item.valor : saldo - item.valor;
    }, 0);
  }
}

// Demonstração do Primeiro Incremento Funcional
const user = new Usuario(1, "Rafaella Bocardi", "rafaella@email.com");
const catSalario = new Categoria(1, "Salário", "Receita");
const catAlimentacao = new Categoria(2, "Alimentação", "Despesa");

const sistema = new ControleFinanceiro();
sistema.adicionarLancamento(new Lancamento(1, "Salário Mensal", 3500.00, "2026-11-05", "Receita", catSalario, user));
sistema.adicionarLancamento(new Lancamento(2, "Supermercado", 450.50, "2026-11-10", "Despesa", catAlimentacao, user));

console.log(`Utilizador: ${user.nome}`);
console.log("Lançamentos registados:", sistema.lancamentos.length);
console.log(`Saldo Atual: R$ ${sistema.calcularSaldo().toFixed(2)}`);
