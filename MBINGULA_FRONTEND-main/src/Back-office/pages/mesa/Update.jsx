import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from 'axios';
import './Update.css';

function UpdateMesa() {
  const { id } = useParams();
  const [values, setValues] = useState({
    numero: '',
    lugares: '',
    posicao: '',
    statusOcupacao: ''
  });

  const [errors, setErrors] = useState({});
  const [showAlert, setShowAlert] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:3000/getMesaById/${id}`)
      .then(res => {
        setValues(res.data);
      })
      .catch(err => console.log(err));
  }, [id]);

  const handleUpdate = (event) => {
    event.preventDefault();
    if (validateForm()) {
      axios.put(`http://localhost:3000/update-mesa/${id}`, values)
        .then(res => {
          setShowAlert(true);
          setTimeout(() => {
            setShowAlert(false);
            navigate('/Back-office/pages/mesa');
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
    if (!values.numero) newErrors.numero = "* campo obrigatório";
    if (!values.lugares) newErrors.lugares = "* campo obrigatório";
    if (!values.posicao) newErrors.posicao = "* campo obrigatório";
    if (!values.statusOcupacao) newErrors.statusOcupacao = "* campo obrigatório";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return (
    <div className='container'>
      <div className="form-container">
        <h2>Atualizar Dados da Mesa</h2>

        {showAlert && (
          <div className="alert alert-success" role="alert">
            Atualizado com sucesso!
          </div>
        )}

        <form onSubmit={handleUpdate}>
          <div className="row">
            <div className="column">
              <label htmlFor="numero">Número:</label>
              <input 
                type="number" 
                name="numero" 
                placeholder="Digite o número da mesa" 
                value={values.numero} 
                onChange={handleChange}
              />
              {errors.numero && <small className="error">{errors.numero}</small>}
            </div>
            <div className="column">
              <label htmlFor="lugares">Lugares:</label>
              <input 
                type="number" 
                name="lugares" 
                placeholder="Digite o número de lugares" 
                value={values.lugares} 
                onChange={handleChange}
              />
              {errors.lugares && <small className="error">{errors.lugares}</small>}
            </div>
          </div>

          <div className="row">
            <div className="column">
              <label htmlFor="posicao">Posição:</label>
              <input 
                type="text" 
                name="posicao" 
                placeholder="Digite a posição da mesa" 
                value={values.posicao} 
                onChange={handleChange}
              />
              {errors.posicao && <small className="error">{errors.posicao}</small>}
            </div>
            <div className="column">
              <label htmlFor="statusOcupacao">Status de Ocupação:</label>
              <input 
                type="text" 
                name="statusOcupacao" 
                placeholder="Digite o status de ocupação" 
                value={values.statusOcupacao} 
                onChange={handleChange}
              />
              {errors.statusOcupacao && <small className="error">{errors.statusOcupacao}</small>}
            </div>
          </div>

          <button className="btn-update">Atualizar</button>
          <Link to="/Back-office/pages/mesa" className="btn-back">Voltar</Link>
        </form>
      </div>
    </div>
  );
}

export default UpdateMesa;
