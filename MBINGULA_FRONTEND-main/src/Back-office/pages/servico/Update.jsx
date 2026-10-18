import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from 'axios';
import './Update.css';

function UpdateServico() {
  const { id } = useParams();
  const [values, setValues] = useState({
    tipo: '',
    descricao: ''
  });

  const [errors, setErrors] = useState({});
  const [showAlert, setShowAlert] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:3000/getServicoById/${id}`)
      .then(res => {
        setValues(res.data);
      })
      .catch(err => console.log(err));
  }, [id]);

  const handleUpdate = (event) => {
    event.preventDefault();
    if (validateForm()) {
      axios.put(`http://localhost:3000/update-servico/${id}`, values)
        .then(res => {
          setShowAlert(true);
          setTimeout(() => {
            setShowAlert(false);
            navigate('/Back-office/pages/servico');
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
    if (!values.tipo) newErrors.tipo = "* campo obrigatório";
    if (!values.descricao) newErrors.descricao = "* campo obrigatório";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return (
    <div className='container'>
      <div className="form-container">
        <h2>Atualizar Dados do Serviço</h2>

        {showAlert && (
          <div className="alert alert-success" role="alert">
            Atualizado com sucesso!
          </div>
        )}

        <form onSubmit={handleUpdate}>
          <div className="row">
            <div className="column">
              <label htmlFor="tipo">Tipo:</label>
              <input 
                type="text" 
                name="tipo" 
                placeholder="Digite o tipo do serviço" 
                value={values.tipo} 
                onChange={handleChange}
              />
              {errors.tipo && <small className="error">{errors.tipo}</small>}
            </div>
          </div>

          <div className="row">
            <div className="column">
              <label htmlFor="descricao">Descrição:</label>
              <textarea 
                name="descricao" 
                placeholder="Digite a descrição do serviço" 
                value={values.descricao} 
                onChange={handleChange}
              />
              {errors.descricao && <small className="error">{errors.descricao}</small>}
            </div>
          </div>

          <button className="btn-update">Atualizar</button>
          <Link to="/Back-office/pages/servico" className="btn-back">Voltar</Link>
        </form>
      </div>
    </div>
  );
}

export default UpdateServico;
