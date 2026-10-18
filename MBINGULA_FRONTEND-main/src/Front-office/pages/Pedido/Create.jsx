import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';

function CreatePedido() {
  const [values, setValues] = useState({
    tipoConsumo: '',
    valorTotal: '',
    itemsPedido: '',
    metodoPagamento: '',
    numeroMesa: '',
    userName: '',
    userPhone: ''
  });

  const [errors, setErrors] = useState({});
  const [alert, setAlert] = useState({ show: false, message: '' });
  const [mesas, setMesas] = useState([]);
  const [otherPaymentMethod, setOtherPaymentMethod] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:3000/getAllMesas')
      .then(res => {
        setMesas(res.data);
      })
      .catch(err => {
        console.error("Erro ao buscar mesas:", err);
      });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateForm()) {
      const payload = {
        tipoConsumo: values.tipoConsumo,
        valorTotal: parseInt(values.valorTotal),
        itemsPedido: values.itemsPedido,
        metodoPagamento: values.metodoPagamento === "outro" ? otherPaymentMethod : values.metodoPagamento,
        numeroMesa: parseInt(values.numeroMesa),
        userName: values.userName,
        userPhone: values.userPhone
      };

      axios.post('http://localhost:3000/create-pedidoLocal', payload)
        .then(res => {
          setAlert({ show: true, message: 'Pedido criado com sucesso!' });
          setTimeout(() => {
            setAlert({ show: false, message: '' });
            navigate('/Front-office/pages/Pedido');
          }, 3000);
        })
        .catch(err => {
          console.error("Erro ao criar pedido:", err);
          setAlert({ show: true, message: 'Erro ao criar pedido!' });
        });
    }
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!values.tipoConsumo) newErrors.tipoConsumo = "* campo obrigatório";
    if (!values.valorTotal) newErrors.valorTotal = "* campo obrigatório";
    if (!values.itemsPedido) newErrors.itemsPedido = "* campo obrigatório";
    if (!values.numeroMesa) newErrors.numeroMesa = "* campo obrigatório";
    if (!values.metodoPagamento) newErrors.metodoPagamento = "* campo obrigatório";
    if (values.metodoPagamento === "outro" && !otherPaymentMethod) {
      newErrors.metodoPagamento = "* campo obrigatório";
    }
    if (!values.userName) newErrors.userName = "* campo obrigatório";
    if (!values.userPhone) newErrors.userPhone = "* campo obrigatório";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return (
    <div className='container'>
      <div className="form-container">
        <h2>Fazer pedido</h2>

        {alert.show && (
          <div className="alert alert-success" role="alert">
            {alert.message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="form-grid">
          <div className="form-row">
            <div className="form-group col-md-6">
              <label htmlFor="tipoConsumo">Tipo de Consumo:</label>
              <select
                name="tipoConsumo"
                className="form-input"
                value={values.tipoConsumo}
                onChange={handleChange}
                required
              >
                <option value="">Selecione</option>
                <option value="Para levar">Para levar</option>
                <option value="Para consumir">Para consumir</option>
              </select>
              {errors.tipoConsumo && <small className="text-danger">{errors.tipoConsumo}</small>}
            </div>

            <div className="form-group col-md-6">
              <label htmlFor="valorTotal">Valor Total:</label>
              <input 
                type="number" 
                name="valorTotal" 
                className="form-input" 
                placeholder="Digite o valor total" 
                value={values.valorTotal}
                onChange={handleChange}
                min="0"
                required
              />
              {errors.valorTotal && <small className="text-danger">{errors.valorTotal}</small>}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group col-md-6">
              <label htmlFor="metodoPagamento">Método de Pagamento:</label>
              <select
                name="metodoPagamento"
                className="form-input"
                value={values.metodoPagamento}
                onChange={(e) => {
                  handleChange(e);
                  if (e.target.value !== "outro") {
                    setOtherPaymentMethod('');
                  }
                }}
              >
                <option value="">Selecione</option>
                <option value="Pagamento à vista">Pagamento à vista</option>
                <option value="Pagamento com cartão">Pagamento com cartão</option>
                <option value="outro">Outro</option>
              </select>
              {errors.metodoPagamento && <small className="text-danger">{errors.metodoPagamento}</small>}
              {values.metodoPagamento === "outro" && (
                <input
                  type="text"
                  placeholder="Digite o método de pagamento"
                  value={otherPaymentMethod}
                  onChange={(e) => setOtherPaymentMethod(e.target.value)}
                  className="form-input"
                  required
                />
              )}
            </div>

            <div className="form-group col-md-6">
              <label htmlFor="numeroMesa">Número da Mesa:</label>
              <select
                name="numeroMesa"
                className="form-input"
                value={values.numeroMesa}
                onChange={handleChange}
                required
              >
                <option value="">Selecione</option>
                {mesas.map(mesa => (
                  <option key={mesa.id} value={mesa.numero}>{mesa.numero}</option>
                ))}
              </select>
              {errors.numeroMesa && <small className="text-danger">{errors.numeroMesa}</small>}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group col-md-6">
              <label htmlFor="userName">Nome:</label>
              <input
                type="text"
                name="userName"
                className="form-input"
                placeholder="Digite o nome do usuário"
                value={values.userName}
                onChange={handleChange}
                required
              />
              {errors.userName && <small className="text-danger">{errors.userName}</small>}
            </div>

            <div className="form-group col-md-6">
              <label htmlFor="userPhone">Telefone:</label>
              <input
                type="tel"
                name="userPhone"
                className="form-input"
                placeholder="Digite o telefone do usuário"
                value={values.userPhone}
                onChange={handleChange}
                required
              />
              {errors.userPhone && <small className="text-danger">{errors.userPhone}</small>}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group col-md-12">
              <label htmlFor="itemsPedido">Items Pedido:</label>
              <textarea
                name="itemsPedido"
                className="form-input"
                placeholder="Digite os itens do pedido"
                value={values.itemsPedido}
                onChange={handleChange}
                required
              />
              {errors.itemsPedido && <small className="text-danger">{errors.itemsPedido}</small>}
            </div>
          </div>

          <div className="botoes">
            <button type="submit" className="btn-submit">Criar</button>
            <Link to="/Front-office/pages/Pedido" className="btn-back">Voltar</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreatePedido;
