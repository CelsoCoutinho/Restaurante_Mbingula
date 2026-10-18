import { useState } from 'react';
import axios from 'axios';
import './ReadByFilter.css';

function ReadByFilter() {
  const [searchValue, setSearchValue] = useState('');
  const [data, setData] = useState([]);
  const [error, setError] = useState('');
  const [filterInfo, setFilterInfo] = useState('');

  const handleSearch = () => {
    if (!searchValue.trim()) {
      setError('O campo de pesquisa não pode estar vazio.');
      return;
    }

    const url = `http://localhost:3000/getProdutoByName/${searchValue}`;

    axios.get(url)
      .then(res => {
        if (Array.isArray(res.data)) {
          setData(res.data);
        } else {
          setData([res.data]);
        }
        setError('');
        setFilterInfo('Nome');
      })
      .catch(err => {
        setError('Ocorreu um erro ao buscar os dados.');
        setFilterInfo('');
      });
  };

  return (
    <div className="filter-container">
      <div className="search-container">
        <input
          type="text"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder="Digite o nome do produto"
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
                <p><strong>Descrição:</strong> {d.descricao}</p>
                <p><strong>ID do Fornecedor:</strong> {d.Fornecedor ? d.Fornecedor.nome : 'Desconhecido'}</p>
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
