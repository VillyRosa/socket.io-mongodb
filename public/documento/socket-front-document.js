import { obterCookie } from "../utils/cookies.js";
import { alertarERedirecionar, atualizaTextoEditor, atualizarInterfaceUsuarios, tratarAutorizacaoSucesso } from "./documento.js";

const socket = io("/usuarios", {
  auth: {
    token: obterCookie("tokenJwt"),
  },
});

function selecionarDocumento(dadosEntrada) {
  socket.emit('selecionar_documento', dadosEntrada, (texto) => {
    atualizaTextoEditor(texto);
  });
}

function emitirTextoEditor(dados) {
  socket.emit('texto_editor', dados);
}

function emitirExcluirDocumento(nomeDocumento) {
  socket.emit('excluir_documento', nomeDocumento);
}

socket.on('usuarios_no_documento', atualizarInterfaceUsuarios);

socket.on('autorizacao_sucesso', tratarAutorizacaoSucesso);

socket.on("connect_error", (erro) => {
  alert(erro);
  window.location.href = "/login/";
});

socket.on('usuario_ja_no_documento', () => {
  alert('Documento já aberto em outra página!');
  window.location.href = '/';
});

socket.on('texto_editor_clientes', (texto) => {
  atualizaTextoEditor(texto);
});

socket.on('excluir_documento_interface', (nomeDocumento) => {
  alertarERedirecionar(nomeDocumento);
});

export { emitirTextoEditor, selecionarDocumento, emitirExcluirDocumento };