import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from 'axios';

function Update() {
  const { id } = useParams();
  const [values, setValues] = useState({
    tipoConsumo: '',
    valorTotal: '',
    itemsPedido: '',
    metodoPagamento: '',
    status: '',
    numeroMesa: '',
    userName: '',
    userPhone: ''
  });

  const [mesas, setMesas] = useState([]);
  const [errors, setErrors] = useState({});
  const [showAlert, setShowAlert] = useState(false);
  const [showMetodoPagamentoField, setShowMetodoPagamentoField] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:3000/getPedidoLocalById/${id}`)
      .then(res => {
        console.log(res.data);
        if (res.data.length > 0) {
          setValues(res.data[0]);
        }
      })
      .catch(err => console.log(err));
    
    axios.get('http://localhost:3000/getAllMesas')
      .then(res => {
        setMesas(res.data);
      })
      .catch(err => console.log(err));
  }, [id]);

  const handleUpdate = (event) => {
    event.preventDefault();
    if (validateForm()) {
      axios.put(`http://localhost:3000/updatePedidoLocal/${id}`, values)
        .then(res => {
          setShowAlert(true);
          setTimeout(() => {
            setShowAlert(false);
            navigate('/Front-office/pages/Pedido');
          }, 3000);
        })
        .catch(err => console.log(err));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });

    if (name === 'metodoPagamento' && value === 'Outro') {
      setShowMetodoPagamentoField(true);
    } else if (name === 'metodoPagamento') {
      setShowMetodoPagamentoField(false);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!values.tipoConsumo) newErrors.tipoConsumo = "* campo obrigatório";
    if (!values.valorTotal) newErrors.valorTotal = "* campo obrigatório";
    if (!values.metodoPagamento) newErrors.metodoPagamento = "* campo obrigatório";
    if (!values.numeroMesa) newErrors.numeroMesa = "* campo obrigatório";
    if (!values.userName) newErrors.userName = "* campo obrigatório";
    if (!values.userPhone) newErrors.userPhone = "* campo obrigatório";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return (
    <div className='container'>
      <div className="form-container">
        <h2>Atualizar Dados do Pedido</h2>

        {showAlert && (
          <div className="alert alert-success" role="alert">
            Atualizado com sucesso!
          </div>
        )}

        <form onSubmit={handleUpdate}>
          <div className="row">
            <div className="column">
              <label htmlFor="tipoConsumo">Tipo de Consumo:</label>
              <select 
                name="tipoConsumo" 
                value={values.tipoConsumo} 
                onChange={handleChange}
              >
                <option value="">Selecione</option>
                <option value="Levar">Levar</option>
                <option value="Consumir">Consumir</option>
              </select>
              {errors.tipoConsumo && <small className="error">{errors.tipoConsumo}</small>}
            </div>
            <div className="column">
              <label htmlFor="valorTotal">Valor Total:</label>
              <input 
                type="number" 
                name="valorTotal" 
                placeholder="Digite o valor total" 
                value={values.valorTotal} 
                onChange={handleChange}
                disabled
              />
              {errors.valorTotal && <small className="error">{errors.valorTotal}</small>}
            </div>
          </div>

          <div className="row">
            <div className="column">
              <label htmlFor="itemsPedido">Items do Pedido:</label>
              <input 
                type="text" 
                name="itemsPedido" 
                placeholder="Digite os itens do pedido" 
                value={values.itemsPedido} 
                onChange={handleChange}
                disabled
              />
              {errors.itemsPedido && <small className="error">{errors.itemsPedido}</small>}
            </div>
            <div className="column">
              <label htmlFor="metodoPagamento">Método de Pagamento:</label>
              <select 
                name="metodoPagamento" 
                value={values.metodoPagamento} 
                onChange={handleChange}
              >
                <option value="">Selecione</option>
                <option value="a vista">À vista</option>
                <option value="com cartão">Com cartão</option>
                <option value="Outro">Outro</option>
              </select>
              {errors.metodoPagamento && <small className="error">{errors.metodoPagamento}</small>}
              {showMetodoPagamentoField && (
                <input 
                  type="text" 
                  name="metodoPagamentoDetalhes" 
                  placeholder="Digite o método de pagamento" 
                  onChange={handleChange} 
                />
              )}
            </div>
          </div>

          <div className="row">
            <div className="column">
              <label htmlFor="status">Status:</label>
              <input 
                type="text" 
                name="status" 
                placeholder="Digite o status do pedido" 
                value={values.status} 
                onChange={handleChange}
                disabled
              />
              {errors.status && <small className="error">{errors.status}</small>}
            </div>
            <div className="column">
                <label htmlFor="numeroMesa">Número da Mesa:</label>
                <select 
                  name="numeroMesa" 
                  value={values.numeroMesa} 
                  onChange={handleChange}
                  disabled
                >
                  <option value="">Selecione</option>
                  {mesas
                    .filter(mesa => mesa.numero !== 41)
                    .map(mesa => (
                      <option key={mesa.id} value={mesa.numero}>{mesa.numero}</option>
                    ))
                  }
                  <option value="41">A partir de casa</option>
                </select>
                {errors.numeroMesa && <small className="error">{errors.numeroMesa}</small>}
            </div>
          </div>

          <div className="row">
            <div className="column">
              <label htmlFor="userName">Nome do Usuário:</label>
              <input 
                type="text" 
                name="userName" 
                placeholder="Digite o nome do usuário" 
                value={values.userName} 
                onChange={handleChange}
              />
              {errors.userName && <small className="error">{errors.userName}</small>}
            </div>
            <div className="column">
              <label htmlFor="userPhone">Telefone do Usuário:</label>
              <input 
                type="text" 
                name="userPhone" 
                placeholder="Digite o telefone do usuário" 
                value={values.userPhone} 
                onChange={handleChange}
              />
              {errors.userPhone && <small className="error">{errors.userPhone}</small>}
            </div>
          </div>

          <button className="btn-update">Atualizar</button>
          <Link to="/Front-office/pages/Pedido" className="btn-back">Voltar</Link>
        </form>
      </div>
    </div>
  );
}

export default Update;