import { useState } from 'react';
import axios from 'axios';

function ReadByFilter() {
  const [searchValue, setSearchValue] = useState('Sim');
  const [minValue, setMinValue] = useState('');
  const [maxValue, setMaxValue] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('disponivel');
  const [categoria, setCategoria] = useState('Comida');
  const [data, setData] = useState([]);
  const [error, setError] = useState('');
  const [filterInfo, setFilterInfo] = useState('');

  const handleSearch = () => {
    if (selectedFilter === 'intervalo' && (!minValue.trim() || !maxValue.trim())) {
      setError('Os campos de preço mínimo e máximo não podem estar vazios.');
      return;
    }

    let url = '';

    switch (selectedFilter) {
      case 'disponivel':
        url = `http://localhost:3000/getItemByAvailable/${searchValue}`;
        break;
      case 'intervalo':
        url = `http://localhost:3000/getItemsCardapioByInterval/${minValue}/${maxValue}`;
        break;
      case 'categoria':
        url = `http://localhost:3000/getItemByCategoria/${categoria}`;
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
        setFilterInfo(
          selectedFilter === 'disponivel'
            ? 'Disponibilidade'
            : selectedFilter === 'intervalo'
            ? `Intervalo de Preço: ${minValue} - ${maxValue}`
            : `Categoria: ${categoria}`
        );
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
            value="disponivel"
            checked={selectedFilter === 'disponivel'}
            onChange={() => setSelectedFilter('disponivel')}
          />
          Por disponibilidade
        </label>
        <label>
          <input
            type="radio"
            name="filter"
            value="intervalo"
            checked={selectedFilter === 'intervalo'}
            onChange={() => setSelectedFilter('intervalo')}
          />
          Por intervalo de preço
        </label>
        <label>
          <input
            type="radio"
            name="filter"
            value="categoria"
            checked={selectedFilter === 'categoria'}
            onChange={() => setSelectedFilter('categoria')}
          />
          Por categoria
        </label>
      </div>

      {selectedFilter === 'disponivel' ? (
        <div className="search-container">
          <select
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className="availability-select"
          >
            <option value="Sim">Sim</option>
            <option value="Não">Não</option>
          </select>
          <button onClick={handleSearch} className="btn-search">
            <i className="bi bi-search"></i> Pesquisar
          </button>
        </div>
      ) : selectedFilter === 'intervalo' ? (
        <div className="price-interval-container">
          <input
            type="number"
            value={minValue}
            onChange={(e) => setMinValue(e.target.value)}
            placeholder="Preço mínimo"
          />
          <input
            type="number"
            value={maxValue}
            onChange={(e) => setMaxValue(e.target.value)}
            placeholder="Preço máximo"
          />
          <button onClick={handleSearch} className="btn-search">
            <i className="bi bi-search"></i> Pesquisar
          </button>
        </div>
      ) : (
        <div className="category-container">
          <select
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
            className="category-select"
          >
            <option value="Comida">Comida</option>
            <option value="Bebida">Bebida</option>
            <option value="Sobremesa">Sobremesa</option>
          </select>
          <button onClick={handleSearch} className="btn-search">
            <i className="bi bi-search"></i> Pesquisar
          </button>
        </div>
      )}

      {filterInfo && <p className="filter-info"><span className='filter-theme'>Filtrado por:</span> {filterInfo}</p>}
      {error && <p className="error-message">{error}</p>}
      <div className="result-container">
        {data.length > 0 ? (
          <div className="result-list">
            {data.map((d, i) => (
              <div key={i} className="result-item">
                <p>{d.Image && d.Image.length > 0 ? <img src={`http://localhost:3000/images/${d.Image[0].path}`} alt={d.name} style={{ maxWidth: '260px', maxHeight: '180px' }} /> : 'Sem imagem'}</p>
                <p><strong>ID:</strong> {d.id}</p>
                <p><strong>Nome:</strong> {d.name}</p>
                <p><strong>Preço:</strong> {d.price}</p>
                <p><strong>Categoria:</strong> {d.categoria}</p>
                <p><strong>Disponível:</strong> {d.disponivel}</p>
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