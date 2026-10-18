import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import './Create.css';

function CreateAtividadeCasa() {
  const [values, setValues] = useState({
    tema: '',
    data: '',
    hora: '',
    descricao: ''
  });

  const [errors, setErrors] = useState({});
  const [alert, setAlert] = useState({ show: false, message: '' });
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateForm()) {
      axios.post('http://localhost:3000/create-atividade', values)
        .then(res => {
          setAlert({ show: true, message: 'Atividade criada com sucesso!' });
          setTimeout(() => {
            setAlert({ show: false, message: '' });
            navigate('/Back-office/pages/atividade');
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
    if (!values.tema) newErrors.tema = "* campo obrigatório";
    if (!values.data) newErrors.data = "* campo obrigatório";
    if (!values.hora) newErrors.hora = "* campo obrigatório";
    if (!values.descricao) newErrors.descricao = "* campo obrigatório";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return (
    <div className='container'>
      <div className="form-container">
        <h2>Cadastrar Atividade</h2>

        {alert.show && (
          <div className="alert alert-success" role="alert">
            {alert.message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="form-grid">
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="tema">Tema:</label>
              <input 
                type="text" 
                name="tema" 
                className="form-input" 
                placeholder="Digite o tema da atividade" 
                value={values.tema}
                onChange={handleChange}
              />
              {errors.tema && <small className="text-danger">{errors.tema}</small>}
            </div>
            <div className="form-group">
              <label htmlFor="data">Data:</label>
              <input 
                type="date" 
                name="data" 
                className="form-input" 
                value={values.data}
                onChange={handleChange}
              />
              {errors.data && <small className="text-danger">{errors.data}</small>}
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="hora">Hora:</label>
              <input 
                type="time" 
                name="hora" 
                className="form-input" 
                value={values.hora}
                onChange={handleChange}
              />
              {errors.hora && <small className="text-danger">{errors.hora}</small>}
            </div>
            <div className="form-group">
              <label htmlFor="descricao">Descrição:</label>
              <textarea
                name="descricao"
                className="form-input"
                placeholder="Digite a descrição da atividade"
                value={values.descricao}
                onChange={handleChange}
              />
              {errors.descricao && <small className="text-danger">{errors.descricao}</small>}
            </div>
          </div>
          <div className="botoes">
            <button className="btn-submit">Criar</button>
            <Link to="/Back-office/pages/atividade" className="btn-back">Voltar</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateAtividadeCasa;
