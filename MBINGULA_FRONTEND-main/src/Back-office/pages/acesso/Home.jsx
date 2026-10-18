import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Sidebar from '../../components/SidebarBackOffice'
import 'bootstrap/dist/css/bootstrap.min.css';
import './Home.css';

function HomeAccess() {
  const [data, setData] = useState([]);
  const [toggle, setToggle] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:3000/accessess')
      .then(res => setData(res.data))
      .catch(err => console.log(err));
  }, []);

  const Toggle = () => {
    setToggle(!toggle);
  };

  useEffect(() => {
    const handleSize = () => {
      if (window.innerWidth > 768) {
        setToggle(false);
      }
    };

    window.addEventListener('resize', handleSize);

    return () => {
      window.removeEventListener('resize', handleSize);
    };
  }, []);

  return (
    <div className="home-container">
      <div className={toggle ? "d-none" : "sidebar-container"}>
        <Sidebar />
      </div>
      <div className={toggle ? "d-none" : "sidebar-invisible"}>
        <Sidebar />
      </div>
      <div className='content'>
        
        <div className='content-inner'>
          <h1>Acessos</h1>
          <div className='custom-container'>
            <div className="acesso-list">
              {data.map((d, i) => (
                <div key={i} className="acesso-item">
                  <p><strong>ID:</strong> {d.id}</p>
                  <p><strong>Nome:</strong> {d.name}</p>
                  <p><strong>Criado em:</strong> {new Date(d.created_at).toLocaleDateString()}</p>
                  <p><strong>Atualizado em:</strong> {new Date(d.updated_at).toLocaleDateString()}</p>
                  <div className="button-group">
                    <Link to={`/Back-office/pages/acesso/read/${d.id}`} className='btn-sm btn-info'>
                      <i className="bi bi-eye"></i>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeAccess;
