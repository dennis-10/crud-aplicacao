import { React, useEffect } from 'react'

import { Link } from "react-router-dom"
import { Route, useParams } from "react-router";

import { connect } from 'react-redux'
import { alteraIDC, alteraMarcaC,
    alteraModeloC, alteraLancamentoC, 
    alteraMemoriaC, 
    alteraCelularesCS } from '../store/actions/appActions'

import '../styles/NovoCelular.css'

function NovoCelular(props) {
  const { marca, modelo, memoria,lancamento, id } = props
  const API = 'http://localhost:5000'

  let { idAltera } = useParams(); // id do celular

  const editCelular = async (id) => { // Modo edição
    const res = await fetch(`${API}/celular/${id}`);
    const data = await res.json();

    props.alteraId(id);

    // Reset
    props.alteraMarca(data.marca);
    props.alteraModelo(data.modelo);
    props.alteraMemoria(data.capacidade);
    props.alteraLancamento(data.data_lancamento);
};

    const atualizaCelular = async() => { // Atualiza no backend
        let id = idAltera
        
        const res = await fetch(`${API}/celulares/${id}`, {
        method: "PUT",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify({
        marca,
        modelo,
        capacidade:memoria,
        data_lancamento:lancamento,
        }),
    });
};

const criaCelular = async() => {
    const res = await fetch(`${API}/celulares`, {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify({
        marca,
        modelo,
        capacidade:memoria,
        data_lancamento:lancamento
        }),
    });
    await res.json()
}

useEffect(() => {
    editCelular(idAltera)
},[])


//console.log(window.location.pathname)

    
  return (
        <div id="novo-celular">
            <div className='mini-menu'>
                <div className={'titulo'}>{ props.tipo ? "Editar" : "Criar"}</div>
                    <div className="bloco">
                        <label className='label' htmlFor="">Marca</label>
                        <input className='input' type="text" value={marca}
                         onChange={(e) => props.alteraMarca(e.target.value)}></input>
                    </div >
                    <div className="bloco">
                        <label className='label' htmlFor="">Modelo</label>
                        <input className='input'  type="text" value={modelo}
                         onChange={(e) => props.alteraModelo(e.target.value)}/>
                    </div>
                    <div className="bloco">
                        <label className='label' htmlFor="">Memória</label>
                        <input className='input' type="text" value={memoria}
                         onChange={(e) => props.alteraMemoria(e.target.value)}/>
                    </div>
                    <div className="bloco">
                        <label className='label' htmlFor="">Lançamento</label>
                        <input className='input' type="text" value={lancamento} 
                        onChange={(e) => props.alteraLancamento(e.target.value)}/>
                    </div>
            </div>

            { props.tipo ? 
            <div className="botoes">
                <Link to='/'>
                    <button className="btn-3" onClick={(e) => atualizaCelular(e)}>
                        <div className="btn-text">
                            Salvar
                        </div>
                    </button>
                </Link>

                <Link to='/'>
                    <button className="btn-4">
                    <div className="btn-text">
                        <a className='a-text' href='/'>Cancelar</a>
                    </div>
                    </button>
                </Link>
            </div>
            :
            <div className="botoes">
                <Link to='/'>
                    <button className="btn-3" onClick={(e) => criaCelular(e)}>
                        <div className="btn-text">
                            Salvar
                        </div>
                    </button>
                </Link>

                <Link to='/'>
                    <button className="btn-4">
                        <div className="btn-text">
                            Cancelar
                        </div>
                    </button>
                </Link>
            </div>
            }

        </div>
    )
}

function mapStateToProps(state) {
  return {
    marca : state.celular.marca,
    modelo: state.celular.modelo,
    memoria: state.celular.memoria,
    lancamento: state.celular.lancamento,
    id: state.celular.id,
      }
}

function mapDispatchToProps(dispatch) { // Chama o action creator
    return {
        alteraMarca(novaMarca) {
            const action = alteraMarcaC(novaMarca)
            dispatch(action)
        },
        alteraModelo(novoModelo) {
            const action = alteraModeloC(novoModelo)
            dispatch(action)
        },
        alteraMemoria(novaMemoria) {
            const action = alteraMemoriaC(novaMemoria)
            dispatch(action)
        },
        alteraLancamento(novoLancamento) {
            const action = alteraLancamentoC(novoLancamento)
            dispatch(action)
        },
        alteraId(novoId) {
            const action = alteraIDC(novoId)
            dispatch(action)
        },
        alteraCelulares(novosCelulares) {
            const action = alteraCelularesCS(novosCelulares)
            dispatch(action)
        }
    }
  }

export default connect(mapStateToProps,
        mapDispatchToProps)(NovoCelular)