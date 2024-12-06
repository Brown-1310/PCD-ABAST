
document.getElementById('Botao-abast').addEventListener('click', formAbast);
// Faz a interação ao clique do mouse chamando a função FormAbast


function formAbast() {
    const main = document.querySelector("main");
    //Para adicionar precisamos do elemento pai, aqui ligamos ele a variável 

    const divInput = document.createElement("div")
    divInput.classList.add("form");
    // Cria uma div e nomeamos uma classe 

    const tes = document.createElement("input")
    const taa_268 = document.createElement("input")
    const taa_269 = document.createElement("input")
    const taa_370 = document.createElement("input")
    const taa_278 = document.createElement("input")
    const tcx = document.createElement("input")
    const somar = document.createElement("button")
    // Cria as TAG com as caixas de texto e o botão 

    tes.classList.add("caixa");
    taa_268.classList.add("caixa");
    taa_269.classList.add("caixa");
    taa_370.classList.add("caixa");
    taa_278.classList.add("caixa");
    tcx.classList.add("caixa");
    somar.classList.add("caixa");
    //Adiciona classe a tag e ao botão

    somar.textContent = 'SOMAR';
    // Nome do botão

    main.appendChild(divInput);
    divInput.appendChild(tes);
    divInput.appendChild(taa_268);
    divInput.appendChild(taa_269);
    divInput.appendChild(taa_370);
    divInput.appendChild(taa_278);
    divInput.appendChild(tcx);
    divInput.appendChild(somar);
    // Agora sim, adiciona os elementos filhos criados 
  
    somar.addEventListener("click", somarSaldos)
    // Faz a interação ao clique do mouse chamando a função somarSaldos

    function somarSaldos () { 
        const vtes = parseFloat(tes.value) || 0; 
        const vtaa_268 = parseFloat(taa_268.value) || 0; 
        const vtaa_269 = parseFloat(taa_269.value) || 0; 
        const vtaa_370 = parseFloat(taa_370.value) || 0; 
        const vtaa_278 = parseFloat(taa_278.value) || 0; 
        const vtcx = parseFloat(tcx.value) || 0;
        // Captura os valores iseridos e atribui as variáveis 
    
        const tes_fecha = vtes + vtcx; 
        // Calculo da tesouraria após o fechamento do tcx
        
        const vtotal = vtaa_268+vtaa_269+vtaa_278+vtaa_370+tes_fecha;
        // Calculo do saldo total


        let formatoReal = vtotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
        // Formatação para o Real brasileiro

        const total = document.createElement("h3");
        divInput.appendChild(total);
        total.classList.add("caixa");
        total.textContent = formatoReal;
        // Cria a saída com a soma dos valores inseridos

        const ddnmx = document.createElement("input")
        const ddnmin = document.createElement("input")
        const botaoDDN = document.createElement("button")
        // Cria input e caixa de texto DDN

        ddnmx.classList.add("caixa");
        ddnmin.classList.add("caixa");
        botaoDDN.classList.add("caixa");
        // Adiciona a classe a caixa de texto e inputs DDN

        botaoDDN.textContent = "Abastecimento"

        divInput.appendChild(ddnmx);
        divInput.appendChild(ddnmin);
        divInput.appendChild(botaoDDN);
        // Cria a caixa de texto e inputs DDN

        botaoDDN.addEventListener('click', DDN)

        function DDN(tes_fecha) {
            const tes_ddnmx = parseFloat(ddnmx.value) || 0;
            const tes_ddnmin = parseFloat(ddnmin.value) || 0;

            if (tes_fecha > tes_ddnmx){
                let abast = (tes_fecha+10)-tes_ddnmx;
                abastFinal = `UUU ABASTECER NO MÍNIMO: ${abast.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`;
            } else {
                if (tes_fecha < tes_ddnmin){
                    let recolhe = tes_fecha-tes_ddnmin;
                    abastFinal = `UUU RECOLHER NO MÍNIMO: ${recolhe.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`;
                } else {
                    abastFinal = 'ESTÁ TUDO OK, PODE FECHAR A TESOURARIA';
                } 
        
            }

            const mensagAbast = document.createElement("h3");
            divInput.appendChild(mensagAbast);
            mensagAbast.classList.add("caixa");
            mensagAbast.textContent = abastFinal;

        }

    }

}


/*
// -----------CALCULO PCD---------------------//
//Dados da operação

let fimDesconto = new Date('2030-01-01'); 
let dataHoje = new Date(); 
let parcelaContratada = 84; 
let valorParcela = 156.30; 
let valorEmprestado = 5775.75; 

let prazoFaltante = ((fimDesconto - dataHoje) / (1000 * 60 * 60 * 24 * 30)) + 1; 
// Calcula o prazo faltante em meses, soma 1 como margem de erro

function calcularTaxaSimples(valorEmprestado, valorParcela, parcelaContratada) { // A função vai utilizar chute para descobrir a taxa
    let taxaContrada = 0.01; // Chute inicial da taxa de juros (1%)
    let precisao = 1e-4; // Precisão desejada, representa 1 x 10 elevado a -4, igual a 0.0001
    let maxIteracoes = 1000; // Máximo de iterações
    let i = 0; // Contador de iterações

    while (i < maxIteracoes) {
        let valorFuturo = valorEmprestado * Math.pow(1 + taxaContrada, parcelaContratada) - 
                valorParcela * ((Math.pow(1 + taxaContrada, parcelaContratada) - 1) / taxaContrada);

        let fvPrime = valorEmprestado * parcelaContratada * Math.pow(1 + taxaContrada, parcelaContratada - 1) - 
                      valorParcela * ((parcelaContratada * Math.pow(1 + taxaContrada, parcelaContratada - 1)) / 
                      taxaContrada - (Math.pow(1 + taxaContrada, parcelaContratada) - 1) / Math.pow(taxaContrada, 2));

        let taxaContradaNova = taxaContrada - (valorFuturo / fvPrime);

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
    // Calcula o saldo remanescente usando a fórmula do valor presente
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

// */




