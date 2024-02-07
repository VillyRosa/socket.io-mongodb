import { documentosColecao } from './dbConnect.js';

function encontrarDocumento(nome) {
  const documento = documentosColecao.findOne({ nome });
  return documento;
}

async function atualizaDocumento(nome, texto) {
  const atualizacao = await documentosColecao.updateOne({ nome }, { $set: { texto } });
  return atualizacao;
}

async function obterDocumentos() {
  const documentos = await documentosColecao.find().toArray();
  return documentos;
}

async function adicionarDocumento(nome) {
  const resultado = await documentosColecao.insertOne({ nome, texto: '' });
  return resultado;
}

async function excluirDocumento(nome) {
  const resultado = await documentosColecao.deleteOne({ nome });
  return resultado;
}

export { encontrarDocumento, atualizaDocumento, obterDocumentos, adicionarDocumento, excluirDocumento };