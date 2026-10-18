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
        url = `http://localhost:3000/getFuncionarioByName/${searchValue}`;
        break;
      case 'phone':
        url = `http://localhost:3000/getFuncionarioByPhone/${searchValue}`;
        break;
      case 'bi':
        url = `http://localhost:3000/getFuncionarioByBI/${searchValue}`;
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
        setFilterInfo(`${selectedFilter === 'name' ? 'Nome' : selectedFilter === 'phone' ? 'Telefone' : 'BI'}`);
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
        <label>
          <input
            type="radio"
            name="filter"
            value="bi"
            checked={selectedFilter === 'bi'}
            onChange={() => setSelectedFilter('bi')}
          />
          Pelo BI
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
                <p><strong>Nome:</strong> {d.name}</p>
                <p><strong>Morada:</strong> {d.morada}</p>
                <p><strong>Bilhete Identidade:</strong> {d.bilheteidentidade}</p>
                <p><strong>Telefone:</strong> {d.telefone}</p>
                <p><strong>Cargo:</strong> {d.cargo}</p>
                <p><strong>Salário:</strong> {d.salario}</p>
                <p><strong>Setor:</strong> {d.Sector ? d.Sector.name : 'Desconhecido'}</p>
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
