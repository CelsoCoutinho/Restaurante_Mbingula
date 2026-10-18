import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Sidebar from '../../components/SidebarBackOffice'
import { Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Home.css';

function HomeEstoque() {
  const [data, setData] = useState([]);
  const [produtos, setProdutos] = useState([]);
  const [toggle, setToggle] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:3000/getAllEstoques')
      .then(res => setData(res.data))
      .catch(err => console.log(err));

    axios.get('http://localhost:3000/getAllProduto')
      .then(res => setProdutos(res.data))
      .catch(err => console.log(err));
  }, []);

  const Toggle = () => {
    setToggle(!toggle);
  };

  useEffect(() => {
    const handleSize = () => {
      if (window.innerWidth > 768) {
        setToggle(false);
      }
    };

    window.addEventListener('resize', handleSize);

    return () => {
      window.removeEventListener('resize', handleSize);
    };
  }, []);

  const getProdutoNameById = (id) => {
    const produto = produtos.find(produto => produto.id === id);
    return produto ? produto.nome : 'Desconhecido';
  };

  const handleDelete = (id) => {
    setSelectedId(id);
    setShowConfirmModal(true);
  };

  const confirmDelete = () => {
    if (selectedId) {
      axios.delete(`http://localhost:3000/delete-estoque/${selectedId}`)
        .then(res => {
          setShowConfirmModal(false);
          setShowSuccessModal(true);
          setTimeout(() => {
            setShowSuccessModal(false);
            location.reload();
          }, 1500);
        })
        .catch(err => console.log(err));
    }
  };

  return (
    <div className="home-container">
      <div className={toggle ? "d-none" : "sidebar-container"}>
        <Sidebar />
      </div>
      <div className={toggle ? "d-none" : "sidebar-invisible"}>
        <Sidebar />
      </div>
      <div className='content'>
        <div className='content-inner'>
          <h1>Estoque</h1>
          <div className='custom-container'>
            <div className='button-container'>
              <div className='left-buttons'>
                <Link to="/Back-office/pages/estoqueFilter" className='btn btn-search'>
                  <i className="bi bi-search"></i> Pesquisar Por
                </Link>
              </div>
              <div className='right-buttons'>
                <Link to="/Back-office/pages/estoque/create" className='btn btn-success'>Criar estoque de produto +</Link>
              </div>
            </div>
            <div className="estoque-list">
              {data.map((d, i) => (
                <div key={i} className="estoque-item">
                  <p><strong>ID:</strong> {d.id}</p>
                  <p><strong>Quantidade:</strong> {d.quantidade} {d.unidade}</p>
                  <p><strong>ID do Produto:</strong> {d.Produto.id}</p>
                  <p><strong>Produto:</strong> {getProdutoNameById(d.Produto.id)}</p>
                  <div className="button-group">
                    <Link to={`/Back-office/pages/estoque/read/${d.id}`} className='btn-sm btn-info'>
                      <i className="bi bi-eye"></i>
                    </Link>
                    <Link to={`/Back-office/pages/estoque/update/${d.id}`} className='btn-sm btn-primary'>
                      <i className="bi bi-pencil"></i>
                    </Link>
                    <Link to={`/Back-office/pages/updateQtdEstoque/${d.id}`} className='btn-sm btn-store'>
                      <i className="bi bi-box-seam-fill"></i>
                    </Link>
                    <button onClick={() => handleDelete(d.id)} className='btn-sm btn-danger'>
                      <i className="bi bi-trash"></i>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Modal show={showConfirmModal} onHide={() => setShowConfirmModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar Exclusão</Modal.Title>
        </Modal.Header>
        <Modal.Body>Tem certeza que deseja deletar este produto de estoque?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowConfirmModal(false)}>Cancelar</Button>
          <Button variant="danger" onClick={confirmDelete}>Deletar</Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showSuccessModal} onHide={() => setShowSuccessModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Sucesso</Modal.Title>
        </Modal.Header>
        <Modal.Body>Produto de estoque deletado com sucesso!</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => setShowSuccessModal(false)}>Ok</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default HomeEstoque;
