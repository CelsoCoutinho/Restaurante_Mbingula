import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from 'axios';

function UpdateItem() {
  const { id } = useParams();
  const [values, setValues] = useState({
    name: '',
    price: '',
    categoria: '',
    disponivel: ''
  });

  const [errors, setErrors] = useState({});
  const [showAlert, setShowAlert] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:3000/getItemById/${id}`)
      .then(res => {
        setValues(res.data);
      })
      .catch(err => console.log(err));
  }, [id]);

  const handleUpdate = (event) => {
    event.preventDefault();
    if (validateForm()) {
      axios.put(`http://localhost:3000/update-itemCardapio/${id}`, values)
        .then(res => {
          setShowAlert(true);
          setTimeout(() => {
            setShowAlert(false);
            navigate('/Back-office/pages/item');
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
    if (!values.price) newErrors.price = "* campo obrigatório";
    if (!values.categoria) newErrors.categoria = "* campo obrigatório";
    if (!values.disponivel) newErrors.disponivel = "* campo obrigatório";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return (
    <div className='container'>
      <div className="form-container">
        <h2>Atualizar Item do Cardápio</h2>

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
                placeholder="Digite o nome do item" 
                value={values.name} 
                onChange={handleChange}
              />
              {errors.name && <small className="error">{errors.name}</small>}
            </div>
            <div className="column">
              <label htmlFor="price">Preço:</label>
              <input 
                type="text" 
                name="price" 
                placeholder="Digite o preço" 
                value={values.price} 
                onChange={handleChange}
              />
              {errors.price && <small className="error">{errors.price}</small>}
            </div>
          </div>

          <div className="row">
            <div className="column">
              <label htmlFor="categoria">Categoria:</label>
              <input 
                type="text" 
                name="categoria" 
                placeholder="Digite a categoria" 
                value={values.categoria} 
                onChange={handleChange}
              />
              {errors.categoria && <small className="error">{errors.categoria}</small>}
            </div>
            <div className="column">
              <label htmlFor="disponivel">Disponível:</label>
              <select 
                name="disponivel" 
                value={values.disponivel} 
                onChange={handleChange}
              >
                <option value="">Selecione</option>
                <option value="Sim">Sim</option>
                <option value="Não">Não</option>
              </select>
              {errors.disponivel && <small className="error">{errors.disponivel}</small>}
            </div>
          </div>

          <button className="btn-update">Atualizar</button>
          <Link to="/Back-office/pages/item" className="btn-back">Voltar</Link>
        </form>
      </div>
    </div>
  );
}

export default UpdateItem;