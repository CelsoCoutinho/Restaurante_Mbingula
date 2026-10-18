import { useState } from 'react';
import axios from 'axios';

function ReadByFilter() {
  const [searchValue, setSearchValue] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('userName');
  const [data, setData] = useState([]);
  const [error, setError] = useState('');
  const [filterInfo, setFilterInfo] = useState('');

  const clearResults = () => {
    setData([]);
    setError('');
    setFilterInfo('');
  };

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
    if (!e.target.value.trim()) {
      clearResults();
    }
  };

  const handleFilterChange = (filter) => {
    setSelectedFilter(filter);
    clearResults();
  };

  const handleSearch = () => {
    if (!searchValue.trim()) {
      setError('O campo de pesquisa não pode estar vazio.');
      clearResults();
      return;
    }

    let url = '';

    switch (selectedFilter) {
      case 'userName':
        url = `http://localhost:3000/getPedidoLocalByUserName/${searchValue}`;
        break;
      case 'userPhone':
        url = `http://localhost:3000/getPedidoLocalByUserPhone/${searchValue}`;
        break;
      default:
        setError('Filtro selecionado inválido.');
        clearResults();
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
        setFilterInfo(`${selectedFilter === 'userName' ? 'Nome' : 'Telefone'}`);
      })
      .catch(err => {
        setError('Ocorreu um erro ao buscar os dados.');
        clearResults();
      });
  };

  return (
    <div className="filter-container">
      <div className="checkbox-container">
        <label>
          <input
            type="radio"
            name="filter"
            value="userName"
            checked={selectedFilter === 'userName'}
            onChange={() => handleFilterChange('userName')}
          />
          Por Nome
        </label>
        <label>
          <input
            type="radio"
            name="filter"
            value="userPhone"
            checked={selectedFilter === 'userPhone'}
            onChange={() => handleFilterChange('userPhone')}
          />
          Por Número de Telefone
        </label>
      </div>
      <div className="search-container">
        <input
          type="text"
          value={searchValue}
          onChange={handleSearchChange}
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
                <p><strong>Tipo de Consumo:</strong> {d.tipoConsumo}</p>
                <p><strong>Valor Total:</strong> {d.valorTotal}</p>
                <p><strong>Itens do Pedido:</strong> {d.itemsPedido}</p>
                <p><strong>Método de Pagamento:</strong> {d.metodoPagamento}</p>
                <p><strong>Status:</strong> 
                    <span
                      style={{
                      color: d.status === 'em preparação' ? 'yellow' : d.status === 'pronto a levantar' ? 'green' : 'black',
                      backgroundColor: d.status === 'em preparação' ? 'rgba(0, 0, 0, 0.4)' : d.status === 'pronto a levantar' ? 'rgba(0, 128, 0, 0.2)' : 'transparent',
                      padding: '5px',
                      borderRadius: '5px',
                      marginLeft: '4px'
                      }}>
                        {d.status}
                    </span>
                </p>
                {d.numeroMesa === 41 ? (
                  <p><strong>Não local:</strong> pedido feito de casa</p>
                  ) : (
                  <p><strong>Número da Mesa:</strong> {d.numeroMesa}</p>
                )}
                <p><strong>Nome do Usuário:</strong> {d.userName}</p>
                <p><strong>Telefone do Usuário:</strong> {d.userPhone}</p>
                <p><strong>Número do Pedido:</strong> {d.numeroPedido}</p>
                <p><strong>Criado em:</strong> {new Date(d.created_at).toLocaleString()}</p>
                <p><strong>Atualizado em:</strong> {new Date(d.updated_at).toLocaleString()}</p>
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
