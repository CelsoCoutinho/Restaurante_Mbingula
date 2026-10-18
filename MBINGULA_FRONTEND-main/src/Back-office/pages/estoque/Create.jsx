import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import './Create.css';

function CreateEstoque() {
  const [values, setValues] = useState({
    quantidade: '',
    unidade: '',
    produtoId: ''
  });

  const [produtos, setProdutos] = useState([]);
  const [errors, setErrors] = useState({});
  const [alert, setAlert] = useState({ show: false, message: '' });
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:3000/getAllProduto')
      .then(response => {
        setProdutos(response.data);
      })
      .catch(error => {
        console.log("Erro ao buscar produtos:", error);
      });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateForm()) {
      axios.post('http://localhost:3000/create-estoque', values)
        .then(res => {
          setAlert({ show: true, message: 'Criado com sucesso!' });
          setTimeout(() => {
            setAlert({ show: false, message: '' });
            navigate('/Back-office/pages/estoque');
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
    if (!values.quantidade) newErrors.quantidade = "* campo obrigatório";
    if (!values.unidade) newErrors.unidade = "* campo obrigatório";
    if (!values.produtoId) newErrors.produtoId = "* campo obrigatório";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return (
    <div className='container'>
      <div className="form-container">
        <h2>Cadastrar Estoque</h2>

        {alert.show && (
          <div className="alert alert-success" role="alert">
            {alert.message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="form-grid">
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="quantidade">Quantidade:</label>
              <input 
                type="number" 
                name="quantidade" 
                className="form-input" 
                placeholder="Digite a quantidade" 
                value={values.quantidade}
                onChange={handleChange}
              />
              {errors.quantidade && <small className="text-danger">{errors.quantidade}</small>}
            </div>
            <div className="form-group">
              <label htmlFor="unidade">Unidade:</label>
              <input 
                type="text" 
                name="unidade" 
                className="form-input" 
                placeholder="Digite a unidade" 
                value={values.unidade}
                onChange={handleChange}
              />
              {errors.unidade && <small className="text-danger">{errors.unidade}</small>}
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Produto:</label>
              <select 
                className="form-input" 
                name="produtoId" 
                value={values.produtoId}
                onChange={handleChange}
              >
                <option value="">Selecione um produto</option>
                {produtos.map(produto => (
                  <option key={produto.id} value={produto.id}>
                    {produto.id} - {produto.nome}
                  </option>
                ))}
              </select>
              {errors.produtoId && <small className="text-danger">{errors.produtoId}</small>}
            </div>
          </div>
          <div className="botoes">
            <button className="btn-submit">Criar</button>
            <Link to="/Back-office/pages/estoque" className="btn-back">Voltar</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateEstoque;
