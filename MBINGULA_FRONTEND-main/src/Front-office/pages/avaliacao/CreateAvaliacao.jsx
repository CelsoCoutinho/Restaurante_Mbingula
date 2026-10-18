import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';

function CreateAvaliacao() {
  const [values, setValues] = useState({
    assunto: '',
    descricao: ''
  });

  const [errors, setErrors] = useState({});
  const [alert, setAlert] = useState({ show: false, message: '' });
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateForm()) {
      const payload = {
        assunto: values.assunto,
        descricao: values.descricao
      };

      axios.post('http://localhost:3000/create-avaliacao', payload)
        .then(res => {
          setAlert({ show: true, message: 'Avaliação enviada com sucesso!' });
          setTimeout(() => {
            setAlert({ show: false, message: '' });
            navigate('/');
          }, 3000);
        })
        .catch(err => {
          console.error("Erro ao enviar avaliação:", err);
          setAlert({ show: true, message: 'Erro ao enviar avaliação!' });
        });
    }
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!values.assunto) newErrors.assunto = "* campo obrigatório";
    if (!values.descricao) newErrors.descricao = "* campo obrigatório";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return (
    <div className='container'>
      <div className="form-container">
        <h2>Avalie o nosso serviço</h2>

        {alert.show && (
          <div className="alert alert-success" role="alert">
            {alert.message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="form-grid">
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="assunto">Assunto:</label>
              <input 
                type="text" 
                name="assunto" 
                className="form-input" 
                placeholder="Assunto da avaliação" 
                value={values.assunto}
                onChange={handleChange}
                required
              />
              {errors.assunto && <small className="text-danger">{errors.assunto}</small>}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="descricao">Descrição:</label>
              <textarea 
                name="descricao" 
                className="form-input" 
                placeholder="Descreva sua avaliação" 
                value={values.descricao}
                onChange={handleChange}
                required
              />
              {errors.descricao && <small className="text-danger">{errors.descricao}</small>}
            </div>
          </div>

          <div className="botoes">
            <button type="submit" className="btn-submit">Submeter</button>
            <Link to="/" className="btn-back">Voltar</Link>
            <Link 
                to="/Front-office/pages/pages/avaliacao/read" 
                style={{
                  width: '200px', 
                  textAlign: 'center', 
                  padding: '10px', 
                  backgroundColor: '#4CAF50', 
                  color: 'white', 
                  border: 'none', 
                  borderRadius: '5px', 
                  cursor: 'pointer', 
                  display: 'inline-block',
                  marginLeft: '10px', 
                  transition: 'background-color 0.3s ease'
                }}
                onMouseEnter={e => e.target.style.backgroundColor = '#45a049'}
                onMouseLeave={e => e.target.style.backgroundColor = '#4CAF50'}
            >
              Ver Avaliações feitas
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateAvaliacao;