class CaixaDaLanchonete {
  constructor() {
    this.cardapio = {
      cafe: 3.0,
      chantily: 1.5,
      suco: 6.2,
      sanduiche: 6.5,
      queijo: 2.0,
      salgado: 7.25,
      combo1: 9.5,
      combo2: 7.5,
    };

    this.formaDePagamento = {
      dinheiro: 0.95,
      debito: 1,
      credito: 1.03,
    };
  }

  calcularValorDaCompra(formaDePagamento, itens) {
    if (!this.formaDePagamento[formaDePagamento]) {
      return "Forma de pagamento inválida!";
    }

    if (itens.length === 0) {
      return "Não há itens no carrinho de compra!";
    }

    let total = 0;

    for (const item of itens) {
      const [codigo, quantidade] = item.split(",");

      if (!this.cardapio[codigo]) {
        return "Item inválido!";
      }

      if (codigo !== "chantily" && codigo !== "queijo") {
        total += this.cardapio[codigo] * quantidade;
      } else {
        const principal = codigo === "chantily" ? "cafe" : "sanduiche";
        const principalItem = `${principal}, 1`;

        if (itens.includes(principalItem)) {
          total += this.cardapio[codigo] * quantidade;
        } else {
          return "O item Extra não pode ser pedido sem o principal";
        }
      }
    }

    total = total * this.formaDePagamento[formaDePagamento];

    return `R$ ${total.toFixed(2).replace(".", ",")}`;
  }
}

const caixa = new CaixaDaLanchonete();
console.log(caixa.calcularValorDaCompra("debito", ["chantily, 1"]));
console.log(caixa.calcularValorDaCompra("credito", ["suco, 1"]));
console.log(
  caixa.calcularValorDaCompra("debito", [
    "cafe,4",
    "sanduiche, 3",
    "salgado, 2",
  ])
);

export { CaixaDaLanchonete };
