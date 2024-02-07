import { emitirAdicionarDocumento } from './socket-front-index.js';

const listaDocumentos = document.querySelector('#lista-documentos');
const form = document.querySelector('#form-adiciona-documento');
const inputDocumento = document.querySelector('#input-documento');

form.addEventListener('submit', (evento) => {
    evento.preventDefault();
    emitirAdicionarDocumento(inputDocumento.value);
    inputDocumento.value = '';
});

function inserirLinkDocumento(nomeDocumento) {
    listaDocumentos.innerHTML += `
    <a 
      href="documento.html?nome=${nomeDocumento}" 
      class="list-group-item list-group-item-action"
      id="documento-${nomeDocumento}"
    >
    ${nomeDocumento}
    </a>
    `;
}

function removerLinkDocumento(nomeDocumento) {
  const documento = document.querySelector(`#documento-${nomeDocumento}`);
  
  listaDocumentos.removeChild(documento);
}

export { inserirLinkDocumento, removerLinkDocumento };