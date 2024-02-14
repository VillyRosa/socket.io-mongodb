import { encontrarDocumento, obterDocumentos, adicionarDocumento } from '../db/documentosdb.js';

function registrarEventosInicio(socket, io) {
    socket.on('obter_documentos', async (devolverDocumentos) => {
        const documentos = await obterDocumentos();

        devolverDocumentos(documentos);
    });

    socket.on('adicionar_documento', async (nomeDocumento) => {
        const documentoExiste = await (encontrarDocumento(nomeDocumento)) !== null;

        if (documentoExiste) {
            socket.emit('documento_existente', nomeDocumento);
        } else {
            const resultado = await adicionarDocumento(nomeDocumento);

            if (resultado.acknowledged) {
                io.emit('adicionar_documento_interface', nomeDocumento);
            }
        }
    });
}

export default registrarEventosInicio;