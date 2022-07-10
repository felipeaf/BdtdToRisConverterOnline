import convertBdtdToRis from "./lib/ConverterFacade.js"

let form = document.getElementById('formConverter');
form.addEventListener('submit', (e) => {
    e.preventDefault();
});

let openBdtdButton = document.getElementById('openBDTD');
let bdtdTextArea = document.getElementById('BDTDContent');
let risTextArea  = document.getElementById('RisContent');
// let downloadButton = document.getElementById("downloadRIS")
//downloadButton.onclick = downloadRIS;

openBdtdButton.onchange = async function openBdtdClick(event) {
    try {    
        bdtdTextArea.value = await loadFileAsText(event.target.files[0]);
    } catch(e) {
        alert("Erro lendo arquivo");
        console.error(e);
    }
    try {
        convert();
    } catch(e) {
        alert("Erro convertendo arquivo. Verifique se o arquivo selecionado é realmente um arquivo JSON de resultado de busca da BDTD.");
        console.error(e);
    }
}

function downloadRIS() {
    saveStringAsText(risTextArea.value, "BDTD exportado.ris")
}

async function loadFileAsText(file) {
    return new Promise( (resolve,reject) => {
        var reader = new FileReader();
        reader.onload = e => resolve(e.target.result);
        reader.readAsText(file);
    });
}

function convert() {
    risTextArea.value = '';
    let input = bdtdTextArea.value;
    let outputStreamCb = line => risTextArea.value += line + '\r\n';
    convertBdtdToRis(input, outputStreamCb, downloadRIS);
}

function saveStringAsText(data, filename) {
    var c = document.createElement("a");
    c.download = filename;
    c.href = window.URL.createObjectURL(new Blob([data], {type: "text/plain"}));
    c.click();
}
