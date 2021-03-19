export const alteraIDC = (novoID) => ({
    type: 'ID_ALTERADO',
    payload: novoID
})


export const alteraMarcaC = (novaMarca) => ({
    type: 'MARCA_ALTERADA',
    payload: novaMarca
})


export const alteraModeloC = (novoModelo) => ({
    type: 'MODELO_ALTERADO',
    payload: novoModelo
})


export const alteraMemoriaC = (novaMemoria) => ({
    type: 'MEMORIA_ALTERADA',
    payload: novaMemoria
})

export const alteraLancamentoC = (novoLancamento) => ({
    type: 'LANCAMENTO_ALTERADO',
    payload: novoLancamento
})



//
export const alteraCelularesCS = (novosCelulares) => ({
    type: 'CELULAR_ALTERADO',
    payload: novosCelulares
})


