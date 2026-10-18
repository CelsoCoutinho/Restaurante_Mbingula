import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './ReadAvailableTable.css';

function Mesa() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:3000/getAllAvailableTable')
      .then(res => setData(res.data))
      .catch(err => console.log(err));
  }, []);

  const handleReserva = (numero) => {
    navigate(`/Front-office/pages/reservaMesa?mesa=${numero}`, { state: { url: `http://localhost:3000/create-reserva/${numero}` } });
  };

  return (
    <div className="home-container">
      <div className='content'>
        <div className='content-inner'>
          <h1>Mesas disponíveis para reservar:</h1>
          <div className='custom-container'>
            <div className='button-container'>
              <div className='left-buttons'>
                <Link to="/Front-office/pages/mesaReservada" className='btn btn-search'>
                  <i className="bi bi-arrow-left-circle"></i> Voltar
                </Link>
              </div>
            </div>
            <div className="mesa-list">
              {data.length > 0 ? (
                <table className="table">
                  <thead>
                    <tr>
                      <th>Número</th>
                      <th>Lugares</th>
                      <th>Posição</th>
                      <th>Status de Ocupação</th>
                      <th>Ações</th>
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
                        <td>
                          <button
                            className="btn btn-success"
                            onClick={() => handleReserva(d.numero)}
                          >
                            Reservar
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p>De momento não há mesa disponível.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Mesa;