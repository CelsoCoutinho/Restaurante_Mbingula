import { useState } from 'react';
import axios from 'axios';
import './ReadByFilter.css';

function ReadByFilter() {
  const [searchValue, setSearchValue] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('lugares');
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
      case 'lugares':
        url = `http://localhost:3000/getMesaByLugares/${searchValue}`;
        break;
      case 'numero':
        url = `http://localhost:3000/getMesaByNumero/${searchValue}`;
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
        setFilterInfo(`${selectedFilter === 'lugares' ? 'Número de Lugares' : 'Número de Identificação'}`);
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
            value="lugares"
            checked={selectedFilter === 'lugares'}
            onChange={() => setSelectedFilter('lugares')}
          />
          Por número de lugares
        </label>
        <label>
          <input
            type="radio"
            name="filter"
            value="numero"
            checked={selectedFilter === 'numero'}
            onChange={() => setSelectedFilter('numero')}
          />
          Por número de identificação
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
                <p><strong>Número de Lugares:</strong> {d.lugares}</p>
                <p><strong>Número de Identificação:</strong> {d.numero}</p>
                <p><strong>Localização:</strong> {d.localizacao}</p>
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
