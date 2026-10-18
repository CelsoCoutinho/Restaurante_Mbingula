import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import './Create.css';

function CreateMesa() {
  const [values, setValues] = useState({
    lugares: '',
    posicao: ''
  });

  const [errors, setErrors] = useState({});
  const [alert, setAlert] = useState({ show: false, message: '' });
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateForm()) {
      const payload = {
        lugares: parseInt(values.lugares),
        posicao: values.posicao
      };

      axios.post('http://localhost:3000/create-mesa', payload)
        .then(res => {
          setAlert({ show: true, message: 'Mesa criada com sucesso!' });
          setTimeout(() => {
            setAlert({ show: false, message: '' });
            navigate('/Back-office/pages/mesa');
          }, 3000);
        })
        .catch(err => {
          console.error("Erro ao criar mesa:", err);
          setAlert({ show: true, message: 'Erro ao criar mesa!' });
        });
    }
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!values.lugares) newErrors.lugares = "* campo obrigatório";
    if (!values.posicao) newErrors.posicao = "* campo obrigatório";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return (
    <div className='container'>
      <div className="form-container">
        <h2>Cadastrar Mesa</h2>

        {alert.show && (
          <div className="alert alert-success" role="alert">
            {alert.message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="form-grid">
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="lugares">Lugares:</label>
              <input 
                type="number" 
                name="lugares" 
                className="form-input" 
                placeholder="Digite o número de lugares" 
                value={values.lugares}
                onChange={handleChange}
                min="1"
                required
              />
              {errors.lugares && <small className="text-danger">{errors.lugares}</small>}
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="posicao">Posição:</label>
              <input 
                type="text" 
                name="posicao" 
                className="form-input" 
                placeholder="Digite a posição" 
                value={values.posicao}
                onChange={handleChange}
              />
              {errors.posicao && <small className="text-danger">{errors.posicao}</small>}
            </div>
          </div>
          <div className="botoes">
            <button type="submit" className="btn-submit">Criar</button>
            <Link to="/Back-office/pages/mesa" className="btn-back">Voltar</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateMesa;
