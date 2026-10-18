import { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from '../../components/SidebarBackOffice';
import { MdDeleteOutline } from "react-icons/md";
import './Home.css';
function Avaliacao() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/getAvaliacoes')
      .then(res => setData(res.data))
      .catch(err => console.log(err));
  }, []);

  const handleDelete = (id) => {
    axios.delete(`http://localhost:3000/delete-avaliacao/${id}`)
      .then(() => {
        setData(prevData => prevData.filter(item => item.id !== id));
      })
      .catch(err => console.log(err));
  };

  return (
    <div className="d-flex">
      <Sidebar />

      <div className='content-avaliacoes'>

        <h1 id='titulos-avaliacoes'>Avaliações</h1>

        <div className='avaliacao-container'>

          {data.map((d, i) => (
            <div key={i} className="avaliacao-list">
              <div className='avaliacao-paragrafos'>
                <p><strong>Assunto:</strong> {d.assunto}</p>
                <p><strong>Descrição:</strong> {d.descricao}</p>
                <p><strong>Enviado em:</strong> {new Date(d.created_at).toLocaleString()}</p>
                <p><strong>Atualizado em:</strong> {new Date(d.updated_at).toLocaleString()}</p>
              </div>
              <div className="delete-avaliacao">
                <button onClick={() => handleDelete(d.id)}>
                  <MdDeleteOutline />
                </button>
              </div>
            </div>
          ))}

        </div>
      </div>
    </div>

  );
}

export default Avaliacao;
