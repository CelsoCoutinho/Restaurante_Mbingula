import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from 'axios';
import './Update.css';

function UpdateProduto() {
  const { id } = useParams();
  const [values, setValues] = useState({
    nome: '',
    descricao: '',
    fornecedorId: ''
  });

  const [fornecedores, setFornecedores] = useState([]);
  const [errors, setErrors] = useState({});
  const [showAlert, setShowAlert] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:3000/getProduto/${id}`)
      .then(res => {
        setValues(res.data);
      })
      .catch(err => console.log(err));

    axios.get('http://localhost:3000/getAllFornecedor')
      .then(response => {
        setFornecedores(response.data);
      })
      .catch(error => {
        console.log("Erro ao buscar fornecedores:", error);
      });
  }, [id]);

  const handleUpdate = (event) => {
    event.preventDefault();
    if (validateForm()) {
      axios.put(`http://localhost:3000/update-produto/${id}`, values)
        .then(res => {
          setShowAlert(true);
          setTimeout(() => {
            setShowAlert(false);
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
        <h2>Atualizar Dados do Produto</h2>

        {showAlert && (
          <div className="alert alert-success" role="alert">
            Atualizado com sucesso!
          </div>
        )}

        <form onSubmit={handleUpdate}>
          <div className="row">
            <div className="column">
              <label htmlFor="nome">Nome do Produto:</label>
              <input 
                type="text" 
                name="nome" 
                placeholder="Digite o nome do produto" 
                value={values.nome} 
                onChange={handleChange}
              />
              {errors.nome && <small className="error">{errors.nome}</small>}
            </div>
            <div className="column">
              <label htmlFor="descricao">Descrição:</label>
              <input 
                type="text" 
                name="descricao" 
                placeholder="Digite a descrição do produto" 
                value={values.descricao} 
                onChange={handleChange}
              />
              {errors.descricao && <small className="error">{errors.descricao}</small>}
            </div>
          </div>

          <div className="row">
            <div className="column">
              <label>Fornecedor:</label>
              <select 
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
              {errors.fornecedorId && <small className="error">{errors.fornecedorId}</small>}
            </div>
          </div>

          <button className="btn-update">Atualizar</button>
          <Link to="/Back-office/pages/produto" className="btn-back">Voltar</Link>
        </form>
      </div>
    </div>
  );
}

export default UpdateProduto;