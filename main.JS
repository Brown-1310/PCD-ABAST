document.getElementById('Botao-abast').addEventListener("click", function() { 
    document.getElementById('Botao-abast').disabled = true;
    document.getElementById('Botao-pcd').disabled = true; 
    // Desativa o botão após o clique 
    formAbast(); 
}); // Desativa o botão após o clique e chama a função somarSaldos

document.getElementById('Botao-pcd').addEventListener("click", function() {
    document.getElementById('Botao-pcd').disabled = true;
    document.getElementById('Botao-abast').disabled = true;
    //Desativa o botão após o clique
    formPCD();
    // Chama a função PCD
});

//------ Cria uma DIV filha de MAIN----------
const main = document.querySelector("main");
//Para adicionar precisamos do elemento pai, aqui ligamos ele a variável 

const divFormulario = document.createElement("div")
divFormulario.classList.add("form");
// Cria uma div e adiciona uma classe

main.appendChild(divFormulario);
// Adiciona a DIV criada ao elemnto pai selecionado MAIN
// Dentro dessa div outras divs vão ser criadas contendo o formulário
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
  
    adicionarEventosCaixa()
    // Executa função que formata o número enquanto digita 

    somar.addEventListener("click", function() { 
        somar.disabled = true; 
        // Desativa o botão após o clique 
        somarSaldos(); 
    }); // Desativa o botão após o clique e chama a função somarSaldos

    function somarSaldos () { 
        const vtes = parseFloat(tes.value.replace(/\./g, '').replace(',', '.')) || 0; 
        const vtaa_268 = parseFloat(taa_268.value.replace(/\./g, '').replace(',', '.')) || 0; 
        const vtaa_269 = parseFloat(taa_269.value.replace(/\./g, '').replace(',', '.')) || 0; 
        const vtaa_370 = parseFloat(taa_370.value.replace(/\./g, '').replace(',', '.')) || 0; 
        const vtaa_278 = parseFloat(taa_278.value.replace(/\./g, '').replace(',', '.')) || 0; 
        const vtcx = parseFloat(tcx.value.replace(/\./g, '').replace(',', '.')) || 0
        // Os valores são inseridos no formato real, desta forma removemos os separadores de milhar antes de convertê-los para float. 
    
        const tes_fecha = vtes + vtcx; 
        // Calculo da tesouraria após o fechamento do tcx
        
        const vtotal = vtaa_268+vtaa_269+vtaa_278+vtaa_370+tes_fecha;
        // Calculo do saldo total

        let vtotalReal = formatoReal(vtotal)
        // Formatação para o Real brasileiro

        const total = document.createElement("h3");
        total.classList.add("texto");
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

        adicionarEventosCaixa()
        // Executa função que formata o número enquanto digita

        botaoDDN.addEventListener('click', function() {
            botaoDDN.disabled = true 
            DDN(tes_fecha, ddnmx, ddnmin); 
        });
        // Evento para executar a função ao clicar no botão 

        function DDN (tes_fecha) {
            const tes_ddnmx = parseFloat(ddnmx.value.replace(/\./g, '').replace(',', '.')) || 0;
            const tes_ddnmin = parseFloat(ddnmin.value.replace(/\./g, '').replace(',', '.')) || 0;
            let abastFinal = '';

            if (tes_fecha > tes_ddnmx){
                let abast = (tes_fecha+10)- tes_ddnmx
                abastFinal = `ABASTECER NO MÍNIMO: ${formatoReal(abast)}`;
            } else if (tes_fecha < tes_ddnmin){
                let recolhe = tes_ddnmin - tes_fecha;
                abastFinal = `RECOLHER NO MÍNIMO: ${formatoReal(recolhe)}`;
            } else {
                abastFinal = 'ESTÁ TUDO OK';
            } 
            // IF que determina se abastece 

            const mensagAbast = document.createElement("h3");
            mensagAbast.classList.add("texto");
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
     
function formPCD() {

    const divInput1 = document.createElement("div");
    divInput1.classList.add("form2");
    divFormulario.appendChild(divInput1);
    const divInput2 = document.createElement("div");
    divInput2.classList.add("form2");
    divFormulario.appendChild(divInput2);
    const divInput3 = document.createElement("div");
    divInput3.classList.add("form2");
    divFormulario.appendChild(divInput3);
    const divInput4 = document.createElement("div");
    divInput4.classList.add("form2");
    divFormulario.appendChild(divInput4);
    // Cria uma div para cada conjunto "nome" e "input" e adiciona uma classe
    // Adiciona essas Div a DIVFORMULÁRIO filha de MAIN 

    const nome1 = document.createElement("h3");
    nome1.classList.add("texto")
    nome1.textContent = "FIM DO DESCONTO";
    const nome2 = document.createElement("h3");
    nome2.classList.add("texto")
    nome2.textContent = "NUMERO DE PARCELAS";
    const nome3 = document.createElement("h3");
    nome3.classList.add("texto")
    nome3.textContent = "VALOR DA PARCELA";
    const nome4 = document.createElement("h3");
    nome4.classList.add("texto")
    nome4.textContent = "VALOR EMPRESTADO";
    // Cria tags h3 e inclui seus respectivos textos e adiciona classe  

    const fimDesconto = document.createElement("input");
    fimDesconto.classList.add("ncaixa");
    const parcContratada = document.createElement("input");
    parcContratada.classList.add("ncaixa");
    // Essa classe é diferente pq não quero que a função que tranforma
    // em formato real rode aqui 
    const valorParcela = document.createElement("input");
    valorParcela.classList.add("caixa");
    const valorEmprestado = document.createElement("input");
    valorEmprestado.classList.add("caixa");
    const calcular = document.createElement("button");
    calcular.classList.add("botoessecundarios");
    // Cria as TAG com as caixas de texto e o botão e adiciona classe aos input e ao botão
    
    calcular.textContent = "CALCULAR";
    // Nome do botão

    divInput1.appendChild(fimDesconto);
    divInput1.insertBefore(nome1, fimDesconto);
    divInput2.appendChild(parcContratada);
    divInput2.insertBefore(nome2, parcContratada);
    divInput3.appendChild(valorParcela);
    divInput3.insertBefore(nome3, valorParcela);
    divInput4.appendChild(valorEmprestado);
    divInput4.insertBefore(nome4, valorEmprestado);
    divFormulario.appendChild(calcular);
    //Adicionando os elementos filhos criados 

    adicionarEventosCaixa()
    // Executa função que formata o número enquanto digita

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
        const vvalorParcela = parseFloat(valorParcela.value.replace(/\./g, '').replace(',', '.')) || 0;
        const vvalorEmprestado = parseFloat(valorEmprestado.value.replace(/\./g, '').replace(',', '.')) || 0;
        // Captura os valores iseridos e atribui as variáveis

        let dataHoje = new Date();
        let prazoFaltante = ((vfimDesconto - dataHoje) / (1000 * 60 * 60 * 24 * 30)) + 1; 
        // Calcula o prazo faltante em meses, soma 1 como margem de erro

        const parcelasPagas = vparcContratada - Math.floor(prazoFaltante); 
        // Calcula o número de parcelas pagas com base no prazo faltante

        const calculoTaxa = calcularTaxaSimples(vvalorEmprestado, vvalorParcela, vparcContratada);
        const taxa = (calculoTaxa*100).toPrecision(2)
        // Chama função para calcular a taxa e tranforma em formato porcentagem 
        
        const valorRemanscente = calcularSaldoRemanescente(vvalorParcela, calculoTaxa, parcelasPagas, vparcContratada);
        const valorRemanscenteReal = formatoReal(valorRemanscente);
        //Chama função para calcular o valor remanescente, depois tranforma em formato real para exibição 

        
        //------ Cria uma NOVA DIV filha de MAIN----------

        const divFormularioRESP = document.createElement("div")
        divFormularioRESP.classList.add("form");
        // Cria uma div e adiciona uma classe

        main.appendChild(divFormularioRESP);
        // Adiciona a DIV criada ao elemnto pai selecionado MAIN
        // Dentro dessa div outras divs vão ser criadas contendo o formulário
        //------------------------------------------


        const divInput5 = document.createElement("div");
        divInput5.classList.add("form2");
        divFormularioRESP.appendChild(divInput5);
        const divInput6 = document.createElement("div");
        divInput6.classList.add("form2");
        divFormularioRESP.appendChild(divInput6);
        const divInput7 = document.createElement("div");
        divInput7.classList.add("form2");
        divFormularioRESP.appendChild(divInput7);
        // Cria uma div para cada conjunto "nome" e "input" e adiciona uma classe
        // Adiciona essas Div a DIVFORMULÁRIORESP filha de MAIN 

        const nome5 = document.createElement("h3");
        nome5.classList.add("texto")
        nome5.textContent = "SALDO DEVEDOR";
        const nome6 = document.createElement("h3");
        nome6.classList.add("texto")
        nome6.textContent = "TAXA";
        const nome7 = document.createElement("h3");
        nome7.classList.add("texto")
        nome7.textContent = "PRAZO FALTANTE";
        // Cria tags h3 e inclui seus respectivos textos e adiciona classe  
        
        const dadosSaida1 = document.createElement("h3");
        dadosSaida1.classList.add("textoresposta");
        dadosSaida1.textContent = valorRemanscenteReal;
        const dadosSaida2 = document.createElement("h3");
        dadosSaida2.classList.add("textoresposta");
        dadosSaida2.textContent = `${taxa} %`;
        const dadosSaida3 = document.createElement("h3");
        dadosSaida3.classList.add("textoresposta");
        dadosSaida3.textContent = `${parseInt(prazoFaltante)} MESES`;
        // Cria uma tag h3, adiciona uma classe com o resultado dos cálculos 

        divInput5.appendChild(dadosSaida1);
        divInput5.insertBefore(nome5, dadosSaida1)
        divInput6.appendChild(dadosSaida2);
        divInput6.insertBefore(nome6, dadosSaida2)
        divInput7.appendChild(dadosSaida3);
        divInput7.insertBefore(nome7, dadosSaida3)
        // Inclui o cálculo e o texto

        const reiniciar = document.createElement("button");
        reiniciar.classList.add("botoessecundarios");
        reiniciar.textContent = 'REINICIAR';
        divFormularioRESP.appendChild(reiniciar)
        // Botão para reiniciar o formulário
            
        reiniciar.addEventListener("click", function() { 
            divFormularioRESP.innerHTML = ''; 
            // Limpa o conteúdo do divInput 
            location.reload(); 
            // Recarrega a página para reiniciar tudo 
        }); 
        // Adiciona um botão para reiniciar tudo


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

function adicionarEventosCaixa() { 
    // Seleciona todos os elementos com a classe 'caixa'
    const elementosCaixa = document.querySelectorAll('.caixa');

    // Itera sobre cada elemento com a classe 'caixa'
    elementosCaixa.forEach(elemento => { 
        // Adiciona o evento 'input' ao elemento
        elemento.addEventListener('input', function() {
            let valorInput = this.value;

            // Remove todos os caracteres que não são dígitos ou vírgula
            valorInput = valorInput.replace(/[^\d,]/g, '');

            // Verifica se há mais de uma vírgula e permite apenas uma vírgula no valor
            const partes = valorInput.split(',');
            if (partes.length > 2) {
                valorInput = partes.slice(0, 2).join(',');
            }

            // Separa a parte inteira e a parte decimal do valor
            const [parteInteira, parteDecimal] = valorInput.split(',');

            // Formata a parte inteira com pontos como separadores de milhar
            const parteFormatada = parteInteira
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, '.');

            // Atualiza o valor do input com a parte formatada
            // e, se existir, a parte decimal, limitada a duas casas
            this.value = parteDecimal ? `${parteFormatada},${parteDecimal.substring(0, 2)}` : parteFormatada;
        });

        // Adiciona o evento 'blur' ao elemento
        elemento.addEventListener('blur', function() {
            let valorInput = this.value;

            // Remove todos os caracteres que não são dígitos ou vírgula
            valorInput = valorInput.replace(/[^\d,]/g, '');

            // Substitui a vírgula por ponto para conversão numérica
            let valorNumerico = parseFloat(valorInput.replace(',', '.')) || 0;

            // Atualiza o valor do input com a formatação de Real brasileiro,
            // incluindo pontos para separadores de milhar e duas casas decimais
            this.value = valorNumerico.toLocaleString('pt-BR', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            });
        });
    });
}

    

