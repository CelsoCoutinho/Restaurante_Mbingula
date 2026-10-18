import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function Avaliacao() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/getAvaliacoes')
      .then(res => setData(res.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div className="home-container">
      <div className='content'>
        <div className='content-inner'>
          <h1>Avaliações</h1>
          <div className='custom-container'>
            <div className='button-container'>
              <Link to="/" className='btn btn-search'>
                <i className="bi bi-arrow-left-circle"></i> Voltar
              </Link>
            </div>
            <div className="avaliacao-list">
              <table className="table">
                <thead>
                  <tr>
                    <th>Assunto</th>
                    <th>Descrição</th>
                    <th>Data de Criação</th>
                    <th>Última Atualização</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((d, i) => (
                    <tr key={i}>
                      <td>{d.assunto}</td>
                      <td>{d.descricao}</td>
                      <td>{new Date(d.created_at).toLocaleDateString()}</td>
                      <td>{new Date(d.updated_at).toLocaleDateString()}</td>
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

export default Avaliacao;
