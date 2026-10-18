import { useState } from 'react';
import axios from 'axios';
import './ReadByFilter.css';

function ReadByFilter() {
  const [searchValue, setSearchValue] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('name');
  const [data, setData] = useState([]);
  const [error, setError] = useState('');
  const [filterInfo, setFilterInfo] = useState('');

  const handleSearch = () => {
    if (!searchValue.trim()) {
      setError('O campo de pesquisa não pode estar vazio.');
      return;
    }

    let url = '';

    switch (selectedFilter) {
      case 'name':
        url = `http://localhost:3000/getFornecedorByName/${searchValue}`;
        break;
      case 'phone':
        url = `http://localhost:3000/getFornecedorByPhone/${searchValue}`;
        break;
      default:
        setError('Filtro selecionado inválido.');
        return;
    }

    axios.get(url)
      .then(res => {
        if (Array.isArray(res.data)) {
          setData(res.data);
        } else {
          setData([res.data]);
        }
        setError('');
        setFilterInfo(`${selectedFilter === 'name' ? 'Nome' : 'Telefone'}`);
      })
      .catch(err => {
        setError('Ocorreu um erro ao buscar os dados.');
        setFilterInfo('');
      });
  };

  return (
    <div className="filter-container">
      <div className="checkbox-container">
        <label>
          <input
            type="radio"
            name="filter"
            value="name"
            checked={selectedFilter === 'name'}
            onChange={() => setSelectedFilter('name')}
          />
          Por nome
        </label>
        <label>
          <input
            type="radio"
            name="filter"
            value="phone"
            checked={selectedFilter === 'phone'}
            onChange={() => setSelectedFilter('phone')}
          />
          Pelo telefone
        </label>
      </div>
      <div className="search-container">
        <input
          type="text"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder="Digite o valor de pesquisa"
        />
        <button onClick={handleSearch} className="btn-search">
          <i className="bi bi-search"></i> Pesquisar
        </button>
      </div>
      {filterInfo && <p className="filter-info"><span className='filter-theme'>Filtrado por:</span> {filterInfo}</p>}
      {error && <p className="error-message">{error}</p>}
      <div className="result-container">
        {data.length > 0 ? (
          <div className="result-list">
            {data.map((d, i) => (
              <div key={i} className="result-item">
                <p><strong>ID:</strong> {d.id}</p>
                <p><strong>Nome:</strong> {d.nome}</p>
                <p><strong>Telefone:</strong> {d.telefone}</p>
                <p><strong>Email:</strong> {d.email}</p>
                <p><strong>Descrição:</strong> {d.descricao}</p>
                <p><strong>Data de criação:</strong> {new Date(d.created_at).toLocaleDateString()}</p>
                <p><strong>Data da ultima atualização:</strong> {new Date(d.updated_at).toLocaleDateString()}</p>
              </div>
            ))}
          </div>
        ) : (
          <p>Nenhum resultado encontrado.</p>
        )}
      </div>
    </div>
  );
}

export default ReadByFilter;
