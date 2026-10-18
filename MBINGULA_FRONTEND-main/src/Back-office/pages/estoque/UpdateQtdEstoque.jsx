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
  
  const [quantidadeAlterada, setQuantidadeAlterada] = useState('');
  const [isAdicionar, setIsAdicionar] = useState(false);
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
      const updatedValues = {
        ...values,
        quantidade: isAdicionar 
          ? values.quantidade + (parseFloat(quantidadeAlterada) || 0) 
          : values.quantidade - (parseFloat(quantidadeAlterada) || 0)
      };

      axios.put(`http://localhost:3000/update-estoque/${id}`, updatedValues)
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
    if (!values.produtoId) newErrors.produtoId = "* campo obrigatório";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleQuantidadeAlterada = (e) => {
    setQuantidadeAlterada(e.target.value);
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
                value={values.quantidade} 
                onChange={handleChange}
                disabled
              />
            </div>
            <div className="column">
              <label htmlFor="unidade">Unidade:</label>
              <input 
                type="text" 
                name="unidade" 
                value={values.unidade} 
                onChange={handleChange}
                disabled
              />
            </div>
          </div>

          <div className="row">
            <div className="column">
              <div className="checkbox-container">
                <input 
                  type="checkbox" 
                  checked={isAdicionar} 
                  onChange={() => {
                    setIsAdicionar(true);
                    setQuantidadeAlterada('');
                  }} 
                />
                <label>(+) Adicionar quantidade</label>
                <input 
                  type="checkbox" 
                  checked={!isAdicionar} 
                  onChange={() => {
                    setIsAdicionar(false);
                    setQuantidadeAlterada('');
                  }} 
                />
                <label>(-) Retirar quantidade</label>
              </div>
              <input 
                type="number" 
                placeholder={`Digite a quantidade a ${isAdicionar ? 'adicionar' : 'retirar'}`} 
                value={quantidadeAlterada}
                onChange={handleQuantidadeAlterada}
              />
            </div>
          </div>

          <div className="row">
            <div className="column">
              <label>Produto ID:</label>
              <input 
                type="text" 
                name="produtoId" 
                value={values.produtoId} 
                onChange={handleChange}
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