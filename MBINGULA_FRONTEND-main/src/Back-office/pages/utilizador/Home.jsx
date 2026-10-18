import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Sidebar from '../../components/SidebarBackOffice'
import 'bootstrap/dist/css/bootstrap.min.css';
import './Home.css';

function Usuario() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [toggle, setToggle] = useState(false);
  const [filter, setFilter] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:3000/getAllUsers')
      .then(res => {
        setData(res.data);
        setFilteredData(res.data);
      })
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

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const handleFilterChange = (e) => {
    const value = e.target.value;
    setFilter(value);
    if (value === '') {
      setFilteredData(data);
    } else {
      const filtered = data.filter(user =>
        user.name.toLowerCase().includes(value.toLowerCase()) || 
        user.phone.includes(value)
      );
      setFilteredData(filtered);
    }
  };

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
          <h1>Usuários</h1>
          <input
            type="text"
            value={filter}
            onChange={handleFilterChange}
            placeholder="Filtrar por nome ou telefone"
            className="form-control mb-3"
            style={{ width: '50%' }}
          />
          <div className='custom-container'>
            <div className="user-list">
              {filteredData.map((user, i) => (
                <div key={i} className="user-item">
                  <p><strong>ID:</strong> {user.id}</p>
                  <p><strong>Nome:</strong> {user.name}</p>
                  <p><strong>Email:</strong> {user.email}</p>
                  <p><strong>Telefone:</strong> {user.phone}</p>
                  <p><strong>Data da criação:</strong> {formatDate(user.created_at)}</p>
                  <p><strong>Data que foi alterado o último acesso:</strong> {formatDate(user.updated_at)}</p>
                  <div className="button-group">
                    <Link to={`/Back-office/pages/utilizador/update/${user.id}`} className='btn-sm btn-primary'>
                      <i className="bi bi-pencil"></i>
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

export default Usuario;
