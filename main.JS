
document.getElementById('Botao-abast').addEventListener("click", function() { 
    document.getElementById('Botao-abast').disabled = true; 
    // Desativa o botão após o clique 
    formAbast(); 
}); // Desativa o botão após o clique e chama a função somarSaldos

//------ Cria uma DIV filha de MAIN----------
const main = document.querySelector("main");
//Para adicionar precisamos do elemento pai, aqui ligamos ele a variável 

const divInput = document.createElement("div")
divInput.classList.add("form");
// Cria uma div e adiciona uma classe

main.appendChild(divInput);
// Adiciona a DIV criada ao elemnto pai selecionado MAIN
//------------------------------------------

function formatoReal(valor){
    return valor.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL' });
}
// Função coverter para real 

function formAbast() {

    const tes = document.createElement("input");
    const taa_268 = document.createElement("input");
    const taa_269 = document.createElement("input");
    const taa_370 = document.createElement("input");
    const taa_278 = document.createElement("input");
    const tcx = document.createElement("input");
    const somar = document.createElement("button");
    // Cria as TAG com as caixas de texto e o botão 

    tes.classList.add("caixa");
    taa_268.classList.add("caixa");
    taa_269.classList.add("caixa");
    taa_370.classList.add("caixa");
    taa_278.classList.add("caixa");
    tcx.classList.add("caixa");
    somar.classList.add("caixa");
    //Adiciona classe aos input e ao botão

    tes.placeholder = "TESOURARIA"; 
    taa_268.placeholder = "TAA 268"; 
    taa_269.placeholder = "TAA 269"; 
    taa_370.placeholder = "TAA 370"; 
    taa_278.placeholder = "TAA 278"; 
    tcx.placeholder = "TCX"
    somar.textContent = 'SOMAR';
    // Nome do botão e placeholders das caixas de texto

    divInput.appendChild(tes);
    divInput.appendChild(taa_268);
    divInput.appendChild(taa_269);
    divInput.appendChild(taa_370);
    divInput.appendChild(taa_278);
    divInput.appendChild(tcx);
    divInput.appendChild(somar);
    // Agora sim, adiciona os elementos filhos criados 
  
    somar.addEventListener("click", function() { 
        somar.disabled = true; 
        // Desativa o botão após o clique 
        somarSaldos(); 
    }); // Desativa o botão após o clique e chama a função somarSaldos

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

        let vtotalReal = formatoReal(vtotal)
        // Formatação para o Real brasileiro

        const total = document.createElement("h3");
        total.classList.add("caixa");
        divInput.appendChild(total);
        total.textContent = vtotalReal;
        // Cria uma tag h3, adiciona uma classe, inclui a divInput, adiciona o texto de saída 

        const ddnmx = document.createElement("input")
        const ddnmin = document.createElement("input")
        const botaoDDN = document.createElement("button")
        // Cria inputs e o botão para executar o cálculo do DDN

        ddnmx.classList.add("caixa");
        ddnmin.classList.add("caixa");
        botaoDDN.classList.add("caixa");
        // Adiciona a classe ao botão e inputs DDN

        ddnmx.placeholder = "DDN Max"; 
        ddnmin.placeholder = "DDN Min";  
        botaoDDN.textContent = "CALCULAR"
        // Adiciona placeholders e nome ao botão

        divInput.appendChild(ddnmx);
        divInput.appendChild(ddnmin);
        divInput.appendChild(botaoDDN);
        // adiciona o botão e inputs DDN

        botaoDDN.addEventListener('click', function() {
            botaoDDN.disabled = true 
            DDN(tes_fecha, ddnmx, ddnmin); 
        });
        // Evento para executar a função ao clicar no botão 

        // function criarInputComFormatacao(placeholder) { 
        //     const input = document.createElement("input"); 
        //     input.classList.add("caixa"); input.placeholder = placeholder; 
        //     input.addEventListener("input", function() { 
        //         const valor = input.value.replace(/[^\d]/g, ''); 
        //         // Remove qualquer caractere não numérico 
        //         const valorFormatado = formatoReal(parseFloat(valor / 100)); 
        //         input.value = valorFormatado; 
        //         // Atualiza o valor com formatação de Real 
        //         }); 
        //     return input; 
        // }


        function DDN (tes_fecha) {
            const tes_ddnmx = parseFloat(ddnmx.value) || 0;
            const tes_ddnmin = parseFloat(ddnmin.value) || 0;
            let abastFinal = '';

            if (tes_fecha > tes_ddnmx){
                let abast = (tes_fecha+10)- tes_ddnmx
                abastFinal = `UUU ABASTECER NO MÍNIMO: ${formatoReal(abast)}`;
            } else if (tes_fecha < tes_ddnmin){
                let recolhe = tes_ddnmin - tes_fecha;
                abastFinal = `UUU RECOLHER NO MÍNIMO: ${formatoReal(recolhe)}`;
            } else {
                abastFinal = 'ESTÁ TUDO OK, PODE FECHAR A TESOURARIA';
            } 
            // IF que determina se abastece 

            const mensagAbast = document.createElement("h3");
            mensagAbast.classList.add("caixa");
            divInput.appendChild(mensagAbast);
            mensagAbast.textContent = abastFinal;
            // Mensagem de resposta ao IF

            const reiniciar = document.createElement("button");
            reiniciar.classList.add("caixa");
            reiniciar.textContent = 'REINICIAR';
            divInput.appendChild(reiniciar)
            // Botão para reiniciar o formulário
            
            reiniciar.addEventListener("click", function() { 
                divInput.innerHTML = ''; 
                // Limpa o conteúdo do divInput 
                location.reload(); 
                // Recarrega a página para reiniciar tudo 
            }); 
            // Adiciona um botão para reiniciar tudo

        }

    }

}

document.getElementById('Botao-pcd').addEventListener("click", function() {
    document.getElementById('Botao-pcd').disabled = true;
    //Desativa o botão após o clique
    formPCD();
    // Chama a função PCD
});
     
function formPCD() {
    const fimDesconto = document.createElement("input");
    const parcContratada = document.createElement("input");
    const valorParcela = document.createElement("input");
    const valorEmprestado = document.createElement("input");
    const calcular = document.createElement("button");
    // Cria as TAG com as caixas de texto e o botão 

    fimDesconto.classList.add("caixa");
    parcContratada.classList.add("caixa");
    valorParcela.classList.add("caixa");
    valorEmprestado.classList.add("caixa");
    calcular.classList.add("caixa");
    //Adiciona classe aos input e ao botão

    fimDesconto.placeholder = "FIM DO DESCONTO";
    parcContratada.placeholder = "NUMERO DE PARCELAS";
    valorParcela.placeholder = "VALOR DA PARCELA";
    valorEmprestado.placeholder = "VALOR EMPRESTADO";
    calcular.textContent = "CALCULAR";
    // Nome do botão e placeholders das caixas de texto

    divInput.appendChild(fimDesconto);
    divInput.appendChild(parcContratada);
    divInput.appendChild(valorParcela);
    divInput.appendChild(valorEmprestado);
    divInput.appendChild(calcular);
    //Adicionando os elemntos filhos

    //------Modo data do imput "Fim desconto"
    fimDesconto.addEventListener('focus', function(){
        this.type = 'date';
    });

    fimDesconto.addEventListener('blur', function(){
        if(this.value === '') {
            this.type = 'text';
        }
    })
    //------ Quando o campo de entrada é focado (focus), 
    // o tipo do input é alterado para date, exibindo o calendário 
    // popup. 
    //------ Quando o campo perde o foco (blur), o tipo do input 
    // volta para text se o valor estiver vazio, para mostrar o 
    // placeholder novamente.

    calcular.addEventListener("click", function() {
        calcular.disabled = true;
        fazerCalculo();
    });
    // Desativa o botão Calcular e chama a função

    function fazerCalculo () {
        const vfimDesconto = new Date(fimDesconto.value) || 0;
        const vparcContratada = parseFloat(parcContratada.value) || 0;
        const vvalorParcela = parseFloat(valorParcela.value) || 0;
        const vvalorEmprestado = parseFloat(valorEmprestado) || 0;
        // Captura os valores iseridos e atribui as variáveis

        let dataHoje = new Date();
        let prazoFaltante = ((vfimDesconto - dataHoje) / (1000 * 60 * 60 * 24 * 30)) + 1; 
        // Calcula o prazo faltante em meses, soma 1 como margem de erro

        const parcelasPagas = vparcContratada - Math.floor(prazoFaltante); 
        // Calcula o número de parcelas pagas com base no prazo faltante

        const taxa = calcularTaxaSimples(vvalorEmprestado, vvalorParcela, vparcContratada);
        // Chama função para calcular a taxa
        
        const valorRemanscente = calcularSaldoRemanescente(valorParcela, taxa, parcelasPagas, vparcContratada);
        const valorRemanscenteReal = formatoReal(valorRemanscente);
        //Chama função para calcular o valor remanescente

        console.log(prazoFaltante)
        console.log(taxa)
        console.log(valorRemanscente)

        const dadosSaida1 = document.createElement("h3");
        dadosSaida1.classList.add("caixa");
        divInput.appendChild(dadosSaida1);
        dadosSaida1.textContent = valorRemanscenteReal;

        
        const dadosSaida2 = document.createElement("h3");
        dadosSaida2.classList.add("caixa");
        divInput.appendChild(dadosSaida2);
        dadosSaida2.textContent = taxa;

        
        const dadosSaida3 = document.createElement("h3");
        dadosSaida3.classList.add("caixa");
        divInput.appendChild(dadosSaida3);
        dadosSaida3.textContent = prazoFaltante;
        // Cria uma tag h3, adiciona uma classe, inclui a divInput, adiciona o texto de saída 

    }

}

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
