import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from 'axios';
import './Update.css';

function UpdateFornecedor() {
  const { id } = useParams();
  const [values, setValues] = useState({
    nome: '',
    telefone: '',
    email: '',
    descricao: ''
  });

  const [errors, setErrors] = useState({});
  const [showAlert, setShowAlert] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:3000/getFornecedor/${id}`)
      .then(res => {
        setValues(res.data);
      })
      .catch(err => console.log(err));
  }, [id]);

  const handleUpdate = (event) => {
    event.preventDefault();
    if (validateForm()) {
      axios.put(`http://localhost:3000/update-fornecedor/${id}`, values)
        .then(res => {
          setShowAlert(true);
          setTimeout(() => {
            setShowAlert(false);
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
        <h2>Atualizar Dados do Fornecedor</h2>

        {showAlert && (
          <div className="alert alert-success" role="alert">
            Atualizado com sucesso!
          </div>
        )}

        <form onSubmit={handleUpdate}>
          <div className="row">
            <div className="column">
              <label htmlFor="nome">Nome:</label>
              <input 
                type="text" 
                name="nome" 
                placeholder="Digite o nome" 
                value={values.nome} 
                onChange={handleChange}
              />
              {errors.nome && <small className="error">{errors.nome}</small>}
            </div>
            <div className="column">
              <label htmlFor="telefone">Telefone:</label>
              <input 
                type="text" 
                name="telefone" 
                placeholder="Digite o telefone" 
                value={values.telefone} 
                onChange={handleChange}
              />
              {errors.telefone && <small className="error">{errors.telefone}</small>}
            </div>
          </div>

          <div className="row">
            <div className="column">
              <label htmlFor="email">Email:</label>
              <input 
                type="email" 
                name="email" 
                placeholder="Digite o email" 
                value={values.email} 
                onChange={handleChange}
              />
              {errors.email && <small className="error">{errors.email}</small>}
            </div>
            <div className="column">
              <label htmlFor="descricao">Descrição:</label>
              <input 
                type="text" 
                name="descricao" 
                placeholder="Digite a descrição" 
                value={values.descricao} 
                onChange={handleChange}
              />
              {errors.descricao && <small className="error">{errors.descricao}</small>}
            </div>
          </div>

          <button className="btn-update">Atualizar</button>
          <Link to="/Back-office/pages/fornecedor" className="btn-back">Voltar</Link>
        </form>
      </div>
    </div>
  );
}

export default UpdateFornecedor;
