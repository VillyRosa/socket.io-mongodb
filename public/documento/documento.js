import { emitirTextoEditor, selecionarDocumento, emitirExcluirDocumento } from "./socket-front-document.js";

const parametros = new URLSearchParams(window.location.search);
const nomeDocumento = parametros.get('nome');

const tituloPagina = document.querySelector('title');
const textoEditor = document.querySelector('#editor-texto');
const tituloDocumento = document.querySelector('#titulo-documento');
const botaoExcluir = document.querySelector('#excluir-documento');
const listaUsuariosConectados = document.querySelector('#usuarios-conectados');

tituloPagina.textContent = nomeDocumento || 'Documento sem título';
tituloDocumento.textContent = nomeDocumento || 'Documento sem título';

function tratarAutorizacaoSucesso(payloadToken) {
  selecionarDocumento({ nomeDocumento, nomeUsuario: payloadToken.nomeUsuario });
}

function atualizarInterfaceUsuarios(usuariosNoDocumento) {
  listaUsuariosConectados.innerHTML = '';

  usuariosNoDocumento.forEach((usuario) => {
    listaUsuariosConectados.innerHTML += `<li class="list-group-item">${usuario}</li>`;
  });
}

function atualizaTextoEditor(texto) {
  textoEditor.value = texto;
}

function alertarERedirecionar(nome) {
  if (nome === nomeDocumento) {
    alert(`O documento ${nome} excluído!`);
    window.location = '/';
  } 
}

textoEditor.addEventListener('keyup', () => {
  emitirTextoEditor({ texto: textoEditor.value, nomeDocumento: nomeDocumento });
});

botaoExcluir.addEventListener('click', () => {
  if (!confirm(`Tem certeza que deseja excluir o documento ${nomeDocumento}?`)) return;
  emitirExcluirDocumento(nomeDocumento);
});

export { atualizaTextoEditor, alertarERedirecionar, tratarAutorizacaoSucesso, atualizarInterfaceUsuarios };