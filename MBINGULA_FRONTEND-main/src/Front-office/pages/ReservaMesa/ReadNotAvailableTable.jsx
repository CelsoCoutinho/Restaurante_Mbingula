import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './ReadNotAvailableTable.css';

function Mesa() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:3000/getAllNotAvailableTable')
      .then(res => setData(res.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div className="home-container">
      <div className='content'>
        <div className='content-inner'>
          <h1>Mesas já reservadas</h1>
          <div className='custom-container'>
            <div className='button-container'>
              <div className='left-buttons'>
                <Link to="/" className='btn btn-search'>
                  <i className="bi bi-arrow-left-circle"></i> Voltar
                </Link>
              </div>
              <div className='right-buttons'>
                <Link to="/Front-office/pages/mesaDisponivel" className='btn btn-search'>
                  <i className="bi bi-search"></i> Ver mesas disponíveis
                </Link>
              </div>
            </div>
            <div className="mesa-list">
              <table className="table">
                <thead>
                  <tr>
                    <th>Número</th>
                    <th>Lugares</th>
                    <th>Posição</th>
                    <th>Status de Ocupação</th>
                    <th>Qtd de Pessoas</th>
                    <th>Nome do Cliente</th>
                    <th>Telefone do Cliente</th>
                    <th>Data da Reserva</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((d, i) => (
                    <tr key={i}>
                      <td>{d.numero}</td>
                      <td>{d.lugares}</td>
                      <td>{d.posicao}</td>
                      <td><p style={{ 
                            color: d.statusOcupacao === 'Reservada' ? 'red' : d.statusOcupacao === 'Disponível' ? 'green' : 'black',
                            backgroundColor: d.statusOcupacao === 'Reservada' ? 'rgba(255, 0, 0, 0.2)' : d.statusOcupacao === 'Disponível' ? 'rgba(0, 128, 0, 0.2)' : 'transparent',
                            padding: '2px',
                            borderRadius: '5px',
                            marginLeft: '4px'
                         }}> {d.statusOcupacao} </p>
                      </td>
                      <td>{d.qtd_pessoa}</td>
                      <td>{d.nome_cliente}</td>
                      <td>{d.tel_cliente}</td>
                      <td>{d.dataReserva}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Mesa;
