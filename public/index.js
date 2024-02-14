import { emitirAdicionarDocumento } from './socket-front-index.js';
import { obterCookie, removerCookie } from './utils/cookies.js';

const tokenJwt = obterCookie('tokenJwt');
console.log(tokenJwt);

const listaDocumentos = document.querySelector('#lista-documentos');
const form = document.querySelector('#form-adiciona-documento');
const inputDocumento = document.querySelector('#input-documento');
const botaoLogout = document.querySelector('#botao-logout');

botaoLogout.addEventListener('click', () => {
  removerCookie('tokenJwt');
  alert('Usuário deslogado com sucesso!');
  window.location.href = '/login/';
});

form.addEventListener('submit', (evento) => {
  evento.preventDefault();
  emitirAdicionarDocumento(inputDocumento.value);
  inputDocumento.value = '';
});

function inserirLinkDocumento(nomeDocumento) {
  listaDocumentos.innerHTML += `
    <a 
      href="documento/?nome=${nomeDocumento}" 
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