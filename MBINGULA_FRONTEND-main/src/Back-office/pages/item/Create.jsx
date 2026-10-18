import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';

function CreateItemCardapio() {
  const [values, setValues] = useState({
    name: '',
    price: '',
    categoria: '',
    customCategoria: '',
    Image: null
  });

  const [errors, setErrors] = useState({});
  const [alert, setAlert] = useState({ show: false, message: '' });
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateForm()) {
      const formData = new FormData();
      formData.append('name', values.name);
      formData.append('price', values.price);
      formData.append('categoria', values.categoria === "Outro" ? values.customCategoria : values.categoria);
      formData.append('Image', values.Image);

      axios.post('http://localhost:3000/create-ItemCardapio', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
        .then(res => {
          setAlert({ show: true, message: 'Item criado com sucesso!' });
          setTimeout(() => {
            setAlert({ show: false, message: '' });
            navigate('/Back-office/pages/item');
          }, 3000);
        })
        .catch(err => console.log(err));
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "Image") {
      setValues({ ...values, Image: files[0] });
    } else if (name === "categoria" && value === "Outro") {
      setValues({ ...values, categoria: value, customCategoria: '' });
    } else {
      setValues({ ...values, [name]: value });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!values.name) newErrors.name = "* campo obrigatório";
    if (!values.price) newErrors.price = "* campo obrigatório";
    if (!values.categoria && !values.customCategoria) newErrors.categoria = "* campo obrigatório";
    if (!values.Image) newErrors.Image = "* campo obrigatório";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return (
    <div className='container'>
      <div className="form-container">
        <h2>Cadastrar Item do Cardápio</h2>

        {alert.show && (
          <div className="alert alert-success" role="alert">
            {alert.message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="form-grid" encType="multipart/form-data">
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="name">Nome do Item:</label>
              <input 
                type="text" 
                name="name" 
                className="form-input" 
                placeholder="Digite o nome do item" 
                value={values.name}
                onChange={handleChange}
              />
              {errors.name && <small className="text-danger">{errors.name}</small>}
            </div>
            <div className="form-group">
              <label htmlFor="price">Preço:</label>
              <input 
                type="text" 
                name="price" 
                className="form-input" 
                placeholder="Digite o preço" 
                value={values.price}
                onChange={handleChange}
              />
              {errors.price && <small className="text-danger">{errors.price}</small>}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="categoria">Categoria:</label>
              <select 
                name="categoria" 
                className="form-input" 
                value={values.categoria}
                onChange={handleChange}
              >
                <option value="">Selecione uma categoria</option>
                <option value="Comida">Comida</option>
                <option value="Bebida">Bebida</option>
                <option value="Sobremesa">Sobremesa</option>
                <option value="Outro">Outro</option>
              </select>
              {errors.categoria && <small className="text-danger">{errors.categoria}</small>}
              {values.categoria === "Outro" && (
                <input 
                  type="text" 
                  name="customCategoria" 
                  className="form-input" 
                  placeholder="Digite a nova categoria" 
                  value={values.customCategoria}
                  onChange={(e) => setValues({ ...values, customCategoria: e.target.value })}
                />
              )}
            </div>
            <div className="form-group">
              <label htmlFor="Image">Imagem do Item:</label>
              <input 
                type="file" 
                name="Image" 
                className="form-input" 
                onChange={handleChange}
              />
              {errors.Image && <small className="text-danger">{errors.Image}</small>}
            </div>
          </div>

          <div className="botoes">
            <button className="btn-submit">Criar</button>
            <Link to="/Back-office/pages/item" className="btn-back">Voltar</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateItemCardapio;