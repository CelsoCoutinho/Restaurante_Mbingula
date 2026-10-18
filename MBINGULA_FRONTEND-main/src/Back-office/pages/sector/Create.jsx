import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import './Create.css';

function CreateSector() {
  const [values, setValues] = useState({
    name: '',
    descricao: ''
  });

  const [errors, setErrors] = useState({});
  const [alert, setAlert] = useState({ show: false, message: '' });
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateForm()) {
      axios.post('http://localhost:3000/create-sector', values)
        .then(res => {
          setAlert({ show: true, message: 'Setor criado com sucesso!' });
          setTimeout(() => {
            setAlert({ show: false, message: '' });
            navigate('/Back-office/pages/sector');
          }, 3000);
        })
        .catch(err => console.log(err));
    }
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!values.name) newErrors.name = "* campo obrigatório";
    if (!values.descricao) newErrors.descricao = "* campo obrigatório";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return (
    <div className='container'>
      <div className="form-container">
        <h2>Cadastrar Setor</h2>

        {alert.show && (
          <div className="alert alert-success" role="alert">
            {alert.message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="form-grid">
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="name">Nome:</label>
              <input 
                type="text" 
                name="name" 
                className="form-input" 
                placeholder="Digite o nome do setor" 
                value={values.name}
                onChange={handleChange}
              />
              {errors.name && <small className="text-danger">{errors.name}</small>}
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="descricao">Descrição:</label>
              <input 
                type="text" 
                name="descricao" 
                className="form-input" 
                placeholder="Digite a descrição do setor" 
                value={values.descricao}
                onChange={handleChange}
              />
              {errors.descricao && <small className="text-danger">{errors.descricao}</small>}
            </div>
          </div>
          <div className="botoes">
            <button className="btn-submit">Criar</button>
            <Link to="/Back-office/pages/sector" className="btn-back">Voltar</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateSector;
