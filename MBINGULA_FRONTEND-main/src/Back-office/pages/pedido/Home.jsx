import './Home.css';
import Sidebar from '../../components/SidebarBackOffice';
import { useEffect, useState } from 'react';
import { FaCheckCircle } from "react-icons/fa";
import axios from 'axios';

function PedidoLocal() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [filter, setFilter] = useState('');

  const fetchData = () => {
    axios.get('http://localhost:3000/getAllPedidoLocal')
      .then(res => {
        setData(res.data);
        setFilteredData(res.data);
      })
      .catch(err => console.error('Erro ao buscar pedidos:', err));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDeleteFiltered = async () => {
    try {
      const pedidosParaDeletar = data.filter(pedido => pedido.status.toLowerCase().trim() === "levantado" || pedido.status.toLowerCase().trim() === "pronto a levantar");
      for (const pedido of pedidosParaDeletar) {
        await axios.delete(`http://localhost:3000/deletePedidoLocal/${pedido.id}`);
      }
      fetchData();
    } catch (err) {
      console.error('Erro ao excluir pedidos:', err);
    }
  };

  const handleUpdateStatus = async (id) => {
    try {
      await axios.put(`http://localhost:3000/updatePedidoLocal/${id}`, { status: 'pronto a levantar' });
      setData(prevData =>
        prevData.map(pedido =>
          pedido.id === id ? { ...pedido, status: 'pronto a levantar' } : pedido
        )
      );
      setFilteredData(prevData =>
        prevData.map(pedido =>
          pedido.id === id ? { ...pedido, status: 'pronto a levantar' } : pedido
        )
      );
    } catch (err) {
      console.error('Erro ao mudar status do pedido:', err);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR');
  };

  const handleFilterChange = (e) => {
    const value = e.target.value.toLowerCase();
    setFilter(value);
    setFilteredData(
      value === '' ? data : data.filter(pedido =>
        pedido.userName.toLowerCase().includes(value) || pedido.userPhone.includes(value)
      )
    );
  };

  return (
    <div className="d-flex">
      <Sidebar />
      <div className='pedido-main'>

        <h1 id='titulos-back-office'>Pedidos Locais</h1>

        <div className="div-filtro-delete">
          <input
            type="text"
            value={filter}
            onChange={handleFilterChange}
            placeholder="Filtrar por nome ou telefone"
          />
          <button className="btn-delete" onClick={handleDeleteFiltered}>Eliminar Pedidos</button>
        </div>

        <div className='content-pedido'>

          {filteredData.map((pedido) => {
            return (
              <div key={pedido.id} className='pedido-item'>

                <div className="corpo-cards-pedido">
                  <p className="titulo-card-pedido ">Pedido Nº {pedido.numeroPedido}</p>
                  <p className="info-pedido">
                    <span className='info-pedido-span'>Nome do Usuário:</span> {pedido.userName} <br />
                    <span className='info-pedido-span'>Telefone:</span> {pedido.userPhone} <br />
                    <span className='info-pedido-span'>{pedido.numeroMesa === 41 ? "Não local:" : "Mesa: "}</span>
                    {pedido.numeroMesa === 41 ? "pedido feito de casa" : pedido.numeroMesa} <br />
                    <span className='info-pedido-span'>Tipo de Consumo:</span> {pedido.tipoConsumo} <br />
                    <span className='info-pedido-span'>Data: </span>{formatDate(pedido.created_at)} <br />
                  </p>

                  <table>
                    <thead>
                      <tr>
                        <th id='titulo-tabela'>Itens do Pedido</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{typeof pedido.itemsPedido === "string"
                          ? pedido.itemsPedido.split(",").map((item, index) => (
                            <p key={index}>{item.trim()}</p>
                          ))
                          : ""
                        }</td>
                      </tr>
                    </tbody>
                  </table>

                  <p><span className={pedido.status.toLowerCase().trim() === 'em preparação' ? 'status-em-preparacao' : 'status-outro'}>
                    {pedido.status}
                  </span></p>
                  
                  <div className="total-pedido">
                    <p>Total:</p>
                    <p>{pedido.valorTotal} kz</p>
                  </div>

                  <div className="div-btn-status">
                    <button onClick={() => handleUpdateStatus(pedido.id)}
                      disabled={
                        pedido.status?.toLowerCase().trim() === "pronto a levantar" ||
                        pedido.status?.toLowerCase().trim() === "levantado"}
                      id='btn-status'>
                      <FaCheckCircle />
                    </button>
                  </div>

                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>


  );
}

export default PedidoLocal;
