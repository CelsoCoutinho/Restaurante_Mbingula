import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from 'axios';
import './Update.css';

function UpdateFuncionario() {
  const { id } = useParams();
  const [values, setValues] = useState({
    name: '',
    morada: '',
    bilheteidentidade: '',
    telefone: '',
    cargo: '',
    salario: '',
    sectorId: ''
  });

  const [sectores, setSectores] = useState([]);
  const [errors, setErrors] = useState({});
  const [showAlert, setShowAlert] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:3000/get-funcionario/${id}`)
      .then(res => {
        setValues(res.data);
      })
      .catch(err => console.log(err));

    axios.get('http://localhost:3000/sectores')
      .then(response => {
        setSectores(response.data);
      })
      .catch(error => {
        console.log("Erro ao buscar sectores:", error);
      });
  }, [id]);

  const handleUpdate = (event) => {
    event.preventDefault();
    if (validateForm()) {
      axios.put(`http://localhost:3000/update-funcionario/${id}`, values)
        .then(res => {
          setShowAlert(true);
          setTimeout(() => {
            setShowAlert(false);
            navigate('/Back-office/pages/funcionario');
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
    if (!values.name) newErrors.name = "* campo obrigatório";
    if (!values.morada) newErrors.morada = "* campo obrigatório";
    if (!values.bilheteidentidade) newErrors.bilheteidentidade = "* campo obrigatório";
    if (!values.telefone) newErrors.telefone = "* campo obrigatório";
    if (!values.cargo) newErrors.cargo = "* campo obrigatório";
    if (!values.salario) newErrors.salario = "* campo obrigatório";
    if (!values.sectorId) newErrors.sectorId = "* campo obrigatório";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return (
    <div className='container'>
      <div className="form-container">
        <h2>Atualizar Dados do Funcionário</h2>

        {showAlert && (
          <div className="alert alert-success" role="alert">
            Atualizado com sucesso!
          </div>
        )}

        <form onSubmit={handleUpdate}>
          <div className="row">
            <div className="column">
              <label htmlFor="name">Nome:</label>
              <input 
                type="text" 
                name="name" 
                placeholder="Digite o nome" 
                value={values.name} 
                onChange={handleChange}
              />
              {errors.name && <small className="error">{errors.name}</small>}
            </div>
            <div className="column">
              <label htmlFor="morada">Morada:</label>
              <input 
                type="text" 
                name="morada" 
                placeholder="Digite a sua Morada" 
                value={values.morada} 
                onChange={handleChange}
              />
              {errors.morada && <small className="error">{errors.morada}</small>}
            </div>
          </div>

          <div className="row">
            <div className="column">
              <label htmlFor="bilheteidentidade">Bilhete de Identidade:</label>
              <input 
                type="text" 
                name="bilheteidentidade" 
                placeholder="Digite o número do BI" 
                value={values.bilheteidentidade} 
                onChange={handleChange}
              />
              {errors.bilheteidentidade && <small className="error">{errors.bilheteidentidade}</small>}
            </div>
            <div className="column">
              <label htmlFor="telefone">Telefone:</label>
              <input 
                type="text" 
                name="telefone" 
                placeholder="Digite seu número" 
                value={values.telefone} 
                onChange={handleChange}
              />
              {errors.telefone && <small className="error">{errors.telefone}</small>}
            </div>
          </div>

          <div className="row">
            <div className="column">
              <label htmlFor="cargo">Cargo:</label>
              <input 
                type="text" 
                name="cargo" 
                placeholder="Digite o Cargo" 
                value={values.cargo} 
                onChange={handleChange}
              />
              {errors.cargo && <small className="error">{errors.cargo}</small>}
            </div>
            <div className="column">
              <label htmlFor="salario">Salário:</label>
              <input 
                type="text" 
                name="salario" 
                placeholder="Digite o Salário" 
                value={values.salario} 
                onChange={handleChange}
              />
              {errors.salario && <small className="error">{errors.salario}</small>}
            </div>
          </div>

          <div className="row">
            <div className="column">
              <label>Sector:</label>
              <select 
                name="sectorId" 
                value={values.sectorId}
                onChange={handleChange}
              >
                <option value="">Selecione um sector</option>
                {sectores.map(sector => (
                  <option key={sector.id} value={sector.id}>
                    {sector.id} - {sector.name}
                  </option>
                ))}
              </select>
              {errors.sectorId && <small className="error">{errors.sectorId}</small>}
            </div>
          </div>

          <button className="btn-update">Atualizar</button>
          <Link to="/Back-office/pages/funcionario" className="btn-back">Voltar</Link>
        </form>
      </div>
    </div>
  );
}

export default UpdateFuncionario;