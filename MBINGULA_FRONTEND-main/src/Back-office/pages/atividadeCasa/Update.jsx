import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from 'axios';
import './Update.css';

function UpdateAtividadeCasa() {
  const { id } = useParams();
  const [values, setValues] = useState({
    tema: '',
    data: '',
    hora: '',
    descricao: ''
  });

  const [errors, setErrors] = useState({});
  const [showAlert, setShowAlert] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:3000/getAtividadeById/${id}`)
      .then(res => {
        setValues(res.data);
      })
      .catch(err => console.log(err));
  }, [id]);

  const handleUpdate = (event) => {
    event.preventDefault();
    if (validateForm()) {
      axios.put(`http://localhost:3000/update-atividade/${id}`, values)
        .then(res => {
          setShowAlert(true);
          setTimeout(() => {
            setShowAlert(false);
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
        <h2>Atualizar Atividade</h2>

        {showAlert && (
          <div className="alert alert-success" role="alert">
            Atualizado com sucesso!
          </div>
        )}

        <form onSubmit={handleUpdate}>
          <div className="row">
            <div className="column">
              <label htmlFor="tema">Tema:</label>
              <input 
                type="text" 
                name="tema" 
                placeholder="Digite o tema" 
                value={values.tema} 
                onChange={handleChange}
              />
              {errors.tema && <small className="error">{errors.tema}</small>}
            </div>
            <div className="column">
              <label htmlFor="data">Data:</label>
              <input 
                type="date" 
                name="data" 
                value={values.data} 
                onChange={handleChange}
              />
              {errors.data && <small className="error">{errors.data}</small>}
            </div>
          </div>

          <div className="row">
            <div className="column">
              <label htmlFor="hora">Hora:</label>
              <input 
                type="time" 
                name="hora" 
                value={values.hora} 
                onChange={handleChange}
              />
              {errors.hora && <small className="error">{errors.hora}</small>}
            </div>
            <div className="column">
              <label htmlFor="descricao">Descrição:</label>
              <textarea 
                name="descricao" 
                placeholder="Digite a descrição" 
                value={values.descricao} 
                onChange={handleChange}
              />
              {errors.descricao && <small className="error">{errors.descricao}</small>}
            </div>
          </div>

          <button className="btn-update">Atualizar</button>
          <Link to="/Back-office/pages/atividade" className="btn-back">Voltar</Link>
        </form>
      </div>
    </div>
  );
}

export default UpdateAtividadeCasa;
