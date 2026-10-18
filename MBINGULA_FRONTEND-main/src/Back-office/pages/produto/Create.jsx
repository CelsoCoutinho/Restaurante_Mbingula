import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import './Create.css';

function CreateProduto() {
  const [values, setValues] = useState({
    nome: '',
    descricao: '',
    fornecedorId: ''
  });

  const [fornecedores, setFornecedores] = useState([]);
  const [errors, setErrors] = useState({});
  const [alert, setAlert] = useState({ show: false, message: '' });
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:3000/getAllFornecedor')
      .then(response => {
        setFornecedores(response.data);
      })
      .catch(error => {
        console.log("Erro ao buscar fornecedores:", error);
      });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateForm()) {
      axios.post('http://localhost:3000/create-produto', values)
        .then(res => {
          setAlert({ show: true, message: 'Produto criado com sucesso!' });
          setTimeout(() => {
            setAlert({ show: false, message: '' });
            navigate('/Back-office/pages/produto');
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
    if (!values.descricao) newErrors.descricao = "* campo obrigatório";
    if (!values.fornecedorId) newErrors.fornecedorId = "* campo obrigatório";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return (
    <div className='container'>
      <div className="form-container">
        <h2>Cadastrar Produto</h2>

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
                placeholder="Digite o nome do produto" 
                value={values.nome}
                onChange={handleChange}
              />
              {errors.nome && <small className="text-danger">{errors.nome}</small>}
            </div>
            <div className="form-group">
              <label htmlFor="descricao">Descrição:</label>
              <input 
                type="text" 
                name="descricao" 
                className="form-input" 
                placeholder="Digite a descrição do produto" 
                value={values.descricao}
                onChange={handleChange}
              />
              {errors.descricao && <small className="text-danger">{errors.descricao}</small>}
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Fornecedor:</label>
              <select 
                className="form-input" 
                name="fornecedorId" 
                value={values.fornecedorId}
                onChange={handleChange}
              >
                <option value="">Selecione um fornecedor</option>
                {fornecedores.map(fornecedor => (
                  <option key={fornecedor.id} value={fornecedor.id}>
                    {fornecedor.id} - {fornecedor.nome}
                  </option>
                ))}
              </select>
              {errors.fornecedorId && <small className="text-danger">{errors.fornecedorId}</small>}
            </div>
          </div>
          <div className="botoes">
            <button className="btn-submit">Criar</button>
            <Link to="/Back-office/pages/produto" className="btn-back">Voltar</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateProduto;
