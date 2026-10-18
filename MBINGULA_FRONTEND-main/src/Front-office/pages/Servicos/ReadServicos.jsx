import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function Servico() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/getServico')
      .then(res => setData(res.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div className="home-container">
      <div className='content'>
        <div className='content-inner'>
          <h1>Serviços Disponibilizados</h1>
          <div className='custom-container'>
            <div className='button-container'>
              <Link to="/" className='btn btn-search'>
                <i className="bi bi-arrow-left-circle"></i> Voltar
              </Link>
            </div>
            <div className="servico-list">
              <table className="table">
                <thead>
                  <tr>
                    <th>Tipo de Serviço</th>
                    <th>Descrição</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((d, i) => (
                    <tr key={i}>
                      <td>{d.tipo}</td>
                      <td>{d.descricao}</td>
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

export default Servico;