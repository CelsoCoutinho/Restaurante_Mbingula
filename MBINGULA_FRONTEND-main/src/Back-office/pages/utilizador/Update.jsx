import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from 'axios';

function UpdateUser() {
  const { id } = useParams();
  const [values, setValues] = useState({
    accessName: ''
  });

  const [errors, setErrors] = useState({});
  const [showAlert, setShowAlert] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:3000/get-user/${id}`)
      .then(res => {
        setValues({ accessName: res.data.accessName });
      })
      .catch(err => console.log(err));
  }, [id]);

  const handleUpdate = (event) => {
    event.preventDefault();
    if (validateForm()) {
      axios.put(`http://localhost:3000/update-userAccess/${id}`, { accessName: values.accessName })
        .then(res => {
          setShowAlert(true);
          setTimeout(() => {
            setShowAlert(false);
            navigate('/Back-office/pages/utilizador');
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
    if (!values.accessName) newErrors.accessName = "* campo obrigatório";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return (
    <div className='container'>
      <div className="form-container">
        <h2>Atualizar Acesso do Utilizador</h2>

        {showAlert && (
          <div className="alert alert-success" role="alert">
            Atualizado com sucesso!
          </div>
        )}

        <form onSubmit={handleUpdate}>
          <div className="row">
            <div className="column">
              <label htmlFor="accessName">Nome de Acesso:</label>
              <select 
                name="accessName" 
                value={values.accessName} 
                onChange={handleChange}
              >
                <option value=""></option>
                <option value="normal">Normal</option>
                <option value="adm">Admin</option>
              </select>
              {errors.accessName && <small className="error">{errors.accessName}</small>}
            </div>
          </div>

          <button className="btn-update">Atualizar</button>
          <Link to="/Back-office/pages/utilizador" className="btn-back">Voltar</Link>
        </form>
      </div>
    </div>
  );
}

export default UpdateUser;