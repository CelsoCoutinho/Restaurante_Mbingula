import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import './Create.css';

function CreateFuncionario() {
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
  const [alert, setAlert] = useState({ show: false, message: '' });
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:3000/sectores')
      .then(response => {
        setSectores(response.data);
      })
      .catch(error => {
        console.log("Erro ao buscar sectores:", error);
      });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateForm()) {
      axios.post('http://localhost:3000/create-funcionario', values)
        .then(res => {
          setAlert({ show: true, message: 'Criado com sucesso!' });
          setTimeout(() => {
            setAlert({ show: false, message: '' });
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
        <h2>Cadastrar Funcionário</h2>

        {alert.show && (
          <div className="alert alert-success" role="alert">
            {alert.message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="form-grid">
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="name">Nome:</label>
              <input 
                type="text" 
                name="name" 
                className="form-input" 
                placeholder="Digite o nome" 
                value={values.name}
                onChange={handleChange}
              />
              {errors.name && <small className="text-danger">{errors.name}</small>}
            </div>
            <div className="form-group">
              <label htmlFor="morada">Morada:</label>
              <input 
                type="text" 
                name="morada" 
                className="form-input" 
                placeholder="Digite a sua Morada" 
                value={values.morada}
                onChange={handleChange}
              />
              {errors.morada && <small className="text-danger">{errors.morada}</small>}
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="bilheteidentidade">Bilhete de Identidade:</label>
              <input 
                type="text" 
                name="bilheteidentidade" 
                className="form-input" 
                placeholder="Digite o número do BI" 
                value={values.bilheteidentidade}
                onChange={handleChange}
              />
              {errors.bilheteidentidade && <small className="text-danger">{errors.bilheteidentidade}</small>}
            </div>
            <div className="form-group">
              <label htmlFor="telefone">Telefone:</label>
              <input 
                type="text" 
                name="telefone" 
                className="form-input" 
                placeholder="Digite seu número" 
                value={values.telefone}
                onChange={handleChange}
              />
              {errors.telefone && <small className="text-danger">{errors.telefone}</small>}
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="cargo">Cargo:</label>
              <input 
                type="text" 
                name="cargo" 
                className="form-input" 
                placeholder="Digite o Cargo" 
                value={values.cargo}
                onChange={handleChange}
              />
              {errors.cargo && <small className="text-danger">{errors.cargo}</small>}
            </div>
            <div className="form-group">
              <label htmlFor="salario">Salário:</label>
              <input 
                type="text" 
                name="salario" 
                className="form-input" 
                placeholder="Digite o Salário" 
                value={values.salario}
                onChange={handleChange}
              />
              {errors.salario && <small className="text-danger">{errors.salario}</small>}
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Sector:</label>
              <select 
                className="form-input" 
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
              {errors.sectorId && <small className="text-danger">{errors.sectorId}</small>}
            </div>
          </div>
          <div className="botoes">
            <button className="btn-submit">Criar</button>
            <Link to="/Back-office/pages/funcionario" className="btn-back">Voltar</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateFuncionario;