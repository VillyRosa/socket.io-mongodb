import { emitirCadastrarUsuario } from "./socket-front-cadastro.js";

const form = document.querySelector('#form-cadastro');

form.addEventListener('submit', function(event) {
  event.preventDefault();

  const nome = form['input-usuario'].value;
  const senha = form['input-senha'].value;

  emitirCadastrarUsuario({ nome, senha});
});