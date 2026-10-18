import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import './Create.css';

function CreateServico() {
  const [values, setValues] = useState({
    tipo: '',
    descricao: ''
  });

  const [errors, setErrors] = useState({});
  const [alert, setAlert] = useState({ show: false, message: '' });
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateForm()) {
      axios.post('http://localhost:3000/create-servico', values)
        .then(res => {
          setAlert({ show: true, message: 'Serviço criado com sucesso!' });
          setTimeout(() => {
            setAlert({ show: false, message: '' });
            navigate('/Back-office/pages/servico');
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
    if (!values.tipo) newErrors.tipo = "* campo obrigatório";
    if (!values.descricao) newErrors.descricao = "* campo obrigatório";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return (
    <div className='container'>
      <div className="form-container">
        <h2>Cadastrar Serviço</h2>

        {alert.show && (
          <div className="alert alert-success" role="alert">
            {alert.message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="form-grid">
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="tipo">Tipo:</label>
              <input 
                type="text" 
                name="tipo" 
                className="form-input" 
                placeholder="Digite o tipo de serviço" 
                value={values.tipo}
                onChange={handleChange}
              />
              {errors.tipo && <small className="text-danger">{errors.tipo}</small>}
            </div>
            <div className="form-group">
              <label htmlFor="descricao">Descrição:</label>
              <input 
                type="text" 
                name="descricao" 
                className="form-input" 
                placeholder="Digite a descrição do serviço" 
                value={values.descricao}
                onChange={handleChange}
              />
              {errors.descricao && <small className="text-danger">{errors.descricao}</small>}
            </div>
          </div>
          <div className="botoes">
            <button type="submit" className="btn-submit">Criar</button>
            <Link to="/Back-office/pages/servico" className="btn-back">Voltar</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateServico;
