import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from 'axios';

function CreateReserva() {
  const [values, setValues] = useState({
    numero: '',
    statusOcupacao: 'Reservada',
    qtd_pessoa: '',
    nome_cliente: '',
    tel_cliente: '',
    dataReserva: ''
  });

  const [errors, setErrors] = useState({});
  const [alert, setAlert] = useState({ show: false, message: '' });
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const mesa = params.get('mesa');
    if (mesa) {
      setValues((prevValues) => ({
        ...prevValues,
        numero: mesa
      }));
    }
  }, [location]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateForm()) {
      const payload = {
        statusOcupacao: values.statusOcupacao,
        qtd_pessoa: values.qtd_pessoa,
        nome_cliente: values.nome_cliente,
        tel_cliente: values.tel_cliente,
        dataReserva: values.dataReserva
      };

      axios.patch(`http://localhost:3000/create-reserva/${values.numero}`, payload)
        .then(res => {
          setAlert({ show: true, message: 'Reserva criada com sucesso!' });
          setTimeout(() => {
            setAlert({ show: false, message: '' });
            navigate('/Front-office/pages/mesaReservada');
          }, 3000);
        })
        .catch(err => {
          console.error("Erro ao criar reserva:", err);
          setAlert({ show: true, message: 'Erro ao criar reserva!' });
        });
    }
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!values.numero) newErrors.numero = "* campo obrigatório";
    if (!values.qtd_pessoa) newErrors.qtd_pessoa = "* campo obrigatório";
    if (!values.nome_cliente) newErrors.nome_cliente = "* campo obrigatório";
    if (!values.tel_cliente) newErrors.tel_cliente = "* campo obrigatório";
    if (!values.dataReserva) newErrors.dataReserva = "* campo obrigatório";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return (
    <div className='container'>
      <div className="form-container">
        <h2>Reserve uma mesa</h2>

        {alert.show && (
          <div className="alert alert-success" role="alert">
            {alert.message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="form-grid">
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="numero">Número da Mesa:</label>
              <input 
                type="number" 
                name="numero" 
                className="form-input" 
                placeholder="Número da mesa" 
                value={values.numero}
                onChange={handleChange}
                min="1"
                disabled
              />
              {errors.numero && <small className="text-danger">{errors.numero}</small>}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="qtd_pessoa">Quantidade de Pessoas:</label>
              <input 
                type="text" 
                name="qtd_pessoa" 
                className="form-input" 
                placeholder="Digite a quantidade de pessoas" 
                value={values.qtd_pessoa}
                onChange={handleChange}
                min="1"
                required
              />
              {errors.qtd_pessoa && <small className="text-danger">{errors.qtd_pessoa}</small>}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="nome_cliente">Nome do Cliente:</label>
              <input 
                type="text" 
                name="nome_cliente" 
                className="form-input" 
                placeholder="Digite o nome do cliente" 
                value={values.nome_cliente}
                onChange={handleChange}
                required
              />
              {errors.nome_cliente && <small className="text-danger">{errors.nome_cliente}</small>}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="tel_cliente">Telefone do Cliente:</label>
              <input 
                type="tel" 
                name="tel_cliente" 
                className="form-input" 
                placeholder="Digite o telefone do cliente" 
                value={values.tel_cliente}
                onChange={handleChange}
                required
              />
              {errors.tel_cliente && <small className="text-danger">{errors.tel_cliente}</small>}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="dataReserva">Data da Reserva:</label>
              <input 
                type="date" 
                name="dataReserva" 
                className="form-input" 
                value={values.dataReserva}
                onChange={handleChange}
                required
              />
              {errors.dataReserva && <small className="text-danger">{errors.dataReserva}</small>}
            </div>
          </div>

          <div className="botoes">
            <button type="submit" className="btn-submit">Reservar</button>
            <Link to="/Front-office/pages/mesaDisponivel" className="btn-back">Voltar</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateReserva;
