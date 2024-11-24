let taa_268 = 100;
let taa_269 = 100;
let taa_370 = 100; 
let taa_278 = 100;
let tcx = 100;
let tesAgora = 300;


let tes_fecha = tesAgora + tcx; 
// Calculo da tesourária após o fechamento do tcx

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

