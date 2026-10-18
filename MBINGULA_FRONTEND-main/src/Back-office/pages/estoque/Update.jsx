import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from 'axios';
import './Update.css';

function UpdateEstoque() {
  const { id } = useParams();
  const [values, setValues] = useState({
    quantidade: '',
    unidade: '',
    produtoId: ''
  });

  const [produtos, setProdutos] = useState([]);
  const [errors, setErrors] = useState({});
  const [showAlert, setShowAlert] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:3000/getEstoque/${id}`)
      .then(res => {
        const { quantidade, unidade, Produto } = res.data;
        setValues({
          quantidade: parseFloat(quantidade), 
          unidade,
          produtoId: Produto.id
        });
      })
      .catch(err => console.log(err));

    axios.get('http://localhost:3000/getAllProduto')
      .then(response => {
        setProdutos(response.data);
      })
      .catch(error => {
        console.log("Erro ao buscar produtos:", error);
      });
  }, [id]);

  const handleUpdate = (event) => {
    event.preventDefault();
    if (validateForm()) {
      axios.put(`http://localhost:3000/update-estoque/${id}`, values)
        .then(res => {
          setShowAlert(true);
          setTimeout(() => {
            setShowAlert(false);
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
        <h2>Atualizar Dados do Estoque</h2>

        {showAlert && (
          <div className="alert alert-success" role="alert">
            Atualizado com sucesso!
          </div>
        )}

        <form onSubmit={handleUpdate}>
          <div className="row">
            <div className="column">
              <label htmlFor="quantidade">Quantidade:</label>
              <input 
                type="number" 
                name="quantidade" 
                placeholder="Digite a quantidade" 
                value={values.quantidade} 
                onChange={handleChange}
              />
              {errors.quantidade && <small className="error">{errors.quantidade}</small>}
            </div>
            <div className="column">
              <label htmlFor="unidade">Unidade:</label>
              <input 
                type="text" 
                name="unidade" 
                placeholder="Digite a unidade" 
                value={values.unidade} 
                onChange={handleChange}
              />
              {errors.unidade && <small className="error">{errors.unidade}</small>}
            </div>
          </div>

          <div className="row">
            <div className="column">
              <label>Produto ID:</label>
              <input 
                type="text" 
                name="produtoId" 
                value={values.produtoId} 
                disabled 
              />
              {errors.produtoId && <small className="error">{errors.produtoId}</small>}
            </div>
          </div>

          <button className="btn-update">Atualizar</button>
          <Link to="/Back-office/pages/estoque" className="btn-back">Voltar</Link>
        </form>
      </div>
    </div>
  );
}

export default UpdateEstoque;
