import React, { useEffect, useState } from 'react'

import {connect} from 'react-redux'
import { alteraCelularesCS } from '../store/actions/appActions'

import '../styles/Principal.css'

function Principal(props) {
  const API = 'http://localhost:5000'

  const { celulares } = props;

  const getCelular = async() => {
      const res = await fetch(`${API}/celulares`)
      const data = await res.json(); // data tem 1 array
      props.alteraCelulares(data);
  }

  const deleteCelular = async (id) => { // Tenho que passa o id no mongo para deletar o correto
      const userResponse = window.confirm("Você tem certeza que quer apagar isso?"); // Funcao do objeto window
      if (userResponse) {
        const res = await fetch(`${API}/celulares/${id}`, {
          method: "DELETE", // fetch de deleção
        });
        const data = await res.json();
        console.log(data);
        await getCelular();
      }
    };

  useEffect(() => {
      getCelular()
  },[])

    return (
        <div>
            <button className='btn'><div className="div-btn"><a className='criar-btn' href='/criar'>Novo Celular</a></div></button>
            
            <table> 
                <tr id={"titulo"}>
                    <td>Marca</td>
                    <td>Modelo</td>
                    <td>Capacidade de Memóiria(Gb)</td>
                    <td>Data de Lançamento</td>
                    <td>Alterar</td>
                    <td>Excluir</td>
                </tr>
            {celulares.map((celular) => (
              <tr key={celular._id}> 
                <td>{celular.marca}</td>
                <td>{celular.modelo}</td>
                <td>{celular.capacidade}</td>
                <td>{celular.data_lancamento}</td>
                <td>
                      <button className="btn-2"><a href={`/editar/${celular._id}`}>Editar</a></button>
                </td>

              
                <td>
                    <button className="btn-2" onClick={(e) => deleteCelular(celular._id)}><div className='div-btn-2'>Excluir</div></button>
                </td>
              </tr>
            ))}
            </table>
            </div>
    )

}

function mapStateToProps(state) {
  return {
    celulares: state.celulares.celulares
  }
}

function mapDispatchToProps(dispatch) { // Chama o action creator
  return {
      alteraCelulares(novosCelulares) {
          const action = alteraCelularesCS(novosCelulares)
          dispatch(action)
      }
  }
}


export default connect(
  mapStateToProps, mapDispatchToProps
)(Principal)