import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import './Create.css';

function CreateFornecedor() {
  const [values, setValues] = useState({
    nome: '',
    telefone: '',
    email: '',
    descricao: ''
  });

  const [errors, setErrors] = useState({});
  const [alert, setAlert] = useState({ show: false, message: '' });
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateForm()) {
      axios.post('http://localhost:3000/create-fornecedor', values)
        .then(res => {
          setAlert({ show: true, message: 'Fornecedor criado com sucesso!' });
          setTimeout(() => {
            setAlert({ show: false, message: '' });
            navigate('/Back-office/pages/fornecedor');
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
    if (!values.nome) newErrors.nome = "* campo obrigatório";
    if (!values.telefone) newErrors.telefone = "* campo obrigatório";
    if (!values.email) newErrors.email = "* campo obrigatório";
    if (!values.descricao) newErrors.descricao = "* campo obrigatório";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return (
    <div className='container'>
      <div className="form-container">
        <h2>Cadastrar Fornecedor</h2>

        {alert.show && (
          <div className="alert alert-success" role="alert">
            {alert.message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="form-grid">
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="nome">Nome:</label>
              <input 
                type="text" 
                name="nome" 
                className="form-input" 
                placeholder="Digite o nome" 
                value={values.nome}
                onChange={handleChange}
              />
              {errors.nome && <small className="text-danger">{errors.nome}</small>}
            </div>
            <div className="form-group">
              <label htmlFor="telefone">Telefone:</label>
              <input 
                type="text" 
                name="telefone" 
                className="form-input" 
                placeholder="Digite o telefone" 
                value={values.telefone}
                onChange={handleChange}
              />
              {errors.telefone && <small className="text-danger">{errors.telefone}</small>}
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input 
                type="email" 
                name="email" 
                className="form-input" 
                placeholder="Digite o email" 
                value={values.email}
                onChange={handleChange}
              />
              {errors.email && <small className="text-danger">{errors.email}</small>}
            </div>
            <div className="form-group">
              <label htmlFor="descricao">Descrição:</label>
              <input 
                type="text" 
                name="descricao" 
                className="form-input" 
                placeholder="Digite a descrição" 
                value={values.descricao}
                onChange={handleChange}
              />
              {errors.descricao && <small className="text-danger">{errors.descricao}</small>}
            </div>
          </div>
          <div className="botoes">
            <button className="btn-submit">Criar</button>
            <Link to="/Back-office/pages/fornecedor" className="btn-back">Voltar</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateFornecedor;