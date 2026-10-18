import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function Atividades() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:3000/getAllAtividades')
      .then(res => setData(res.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div className="home-container">
      <div className='content'>
        <div className='content-inner'>
          <h1>Atividades a serem realizadas</h1>
          <div className='custom-container'>
            <div className='button-container'>
              <div className='left-buttons'>
                <Link to="/" className='btn btn-search'>
                  <i className="bi bi-arrow-left-circle"></i> Voltar
                </Link>
              </div>
            </div>
            <div className="atividade-list">
              <table className="table">
                <thead>
                  <tr>
                    <th>Tema</th>
                    <th>Data</th>
                    <th>Hora</th>
                    <th>Descrição</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((atividade, i) => (
                    <tr key={i}>
                      <td>{atividade.tema}</td>
                      <td>{atividade.data}</td>
                      <td>{atividade.hora}</td>
                      <td>{atividade.descricao}</td>
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

export default Atividades;