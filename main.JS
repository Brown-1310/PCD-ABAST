//------------ABASTECIMENTO -----------------//
let taa_268 = 100;
let taa_269 = 100;
let taa_370 = 100; 
let taa_278 = 100;
let tcx = 100;
let tesAgora = 300;


let tes_fecha = tesAgora + tcx; 
// Calculo da tesouraria após o fechamento do tcx

let total = taa_268+taa_269+taa_278+taa_370+tes_fecha;
// Calculo do saldo total

let tes_ddn = 400;
// deve ser solicitado agora a realização do DDN
// e inclusão do saldo que deve ficar no fechamento

if (tes_fecha > tes_ddn){
    let abast = (tes_fecha+10)-tes_ddn;
    console.log('UUU ABASTECER NO MÍNIMO: ', abast);
} else {
    if (tes_fecha < tes_ddn){
        let recolhe = tes_ddn-tes_fecha;
        console.log('UUU RECOLHER NO MÍNIMO: ', recolhe);
    } else {
        console.log('ESTÁ TUDO OK, PODE FECHAR A TESOURARIA')
    } 

}

// -----------CALCULO PCD---------------------//
//Dados da operação

let fimDesconto = new Date('2030-01-01'); 
let dataHoje = new Date(); 
let parcelaContratada = 84; 
let valorParcela = 156.30; 
let valorEmprestado = 5775.75; 

let prazoFaltante = ((fimDesconto - dataHoje) / (1000 * 60 * 60 * 24 * 30)) + 1; 
// Calcula o prazo faltante em meses, soma 1 como márgem de erro

function calcularTaxaSimples(valorEmprestado, valorParcela, parcelaContratada) { // A função vai utilizar chute para descobrir a taxa
    let taxaContrada = 0.01; // Chute inicial da taxa de juros (1%)
    let precisao = 1e-4; // Precisão desejada, representa 1 x 10 elevado a -4, igual a 0.0001
    let maxIteracoes = 1000; // Máximo de iterações
    let i = 0; // Contador de iterações

    while (i < maxIteracoes) {
        let valorFuturo = valorEmprestado * Math.pow(1 + taxaContrada, parcelaContratada) - 
                valorParcela * ((Math.pow(1 + taxaContrada, parcelaContratada) - 1) / taxaContrada);
        // Calcula a função do valor futuro

        let fvPrime = valorEmprestado * parcelaContratada * Math.pow(1 + taxaContrada, parcelaContratada - 1) - 
                      valorParcela * ((parcelaContratada * Math.pow(1 + taxaContrada, parcelaContratada - 1)) / 
                      taxaContrada - (Math.pow(1 + taxaContrada, parcelaContratada) - 1) / Math.pow(taxaContrada, 2));
        // Calcula a derivada da função

        let taxaContradaNova = taxaContrada - (valorFuturo / fvPrime);
        // Atualiza a taxa de juros usando o método de Newton-Raphson

        if (Math.abs(taxaContradaNova - taxaContrada) < precisao) break;
        // Verifica se a nova taxa está dentro da precisão desejada

        taxaContrada = taxaContradaNova;
        // Atualiza a taxa de juros

        i++;
    }

    return taxaContrada; 
    // Retorna a taxa de juros calculada
}

function calcularSaldoRemanescente(valorParcela, taxaDeJuros, parcelasPagas, totalParcelas) {
    let parcelasRestantes = totalParcelas - parcelasPagas; 
    // Calcula o número de parcelas restantes

    return valorParcela * (1 - Math.pow(1 + taxaDeJuros, -parcelasRestantes)) / taxaDeJuros;
    // Calcula o saldo remanescente usando a fórmula do valor presente de uma anuidade
}

let taxaDeJurosContratada = calcularTaxaSimples(valorEmprestado, valorParcela, parcelaContratada);
// Calcula a taxa de juros contratada

let parcelasPagas = parcelaContratada - Math.floor(prazoFaltante); 
// Calcula o número de parcelas pagas com base no prazo faltante

let saldoRemanescente = calcularSaldoRemanescente(valorParcela, taxaDeJurosContratada, parcelasPagas, parcelaContratada);
// Calcula o saldo remanescente

console.log(`O Prazo remanescente é: ${Math.floor(prazoFaltante)} meses`); 
console.log(`A taxa de juros contratada é: ${(taxaDeJurosContratada * 100).toFixed(2)}% ao mês`); 
console.log(`O saldo remanescente é: R$ ${saldoRemanescente.toFixed(2)}`); 




