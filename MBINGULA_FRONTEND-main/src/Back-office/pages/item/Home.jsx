import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Sidebar from '../../components/SidebarBackOffice'
import { Modal, Button } from 'react-bootstrap';
import { MdDeleteOutline, MdOutlineEdit } from "react-icons/md";
import 'bootstrap/dist/css/bootstrap.min.css';
import './Home.css';

function Home() {
  const [data, setData] = useState([]);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);


  useEffect(() => {
    axios.get('http://localhost:3000/getItemsCardapio')
      .then(res => setData(res.data))
      .catch(err => console.log(err));
  }, []);

  const handleDelete = (id) => {
    setSelectedId(id);
    setShowConfirmModal(true);
  };

  const confirmDelete = () => {
    if (selectedId) {
      axios.delete(`http://localhost:3000/delete-itemCardapio/${selectedId}`)
        .then(res => {
          setShowConfirmModal(false);
          setShowSuccessModal(true);
          setTimeout(() => {
            setShowSuccessModal(false);
            location.reload();
          });
        })
        .catch(err => console.log(err));
    }
  };

  return (
    <div className="d-flex">
      <Sidebar />
      <div className='itens-container-main'>

        <h1 id='titulos-item'>Itens do Cardápio</h1>

        <div className='div-filtro-cadastrar'>
          <Link to="/Back-office/pages/item/itemFilter" className='btn btn-search'>
            <i className="bi bi-search"></i> Filtrar
          </Link>
          <Link to="/Back-office/pages/item/create" className='btn btn-success'>Cadastrar +</Link>
        </div>

        <div className='itens-content-inner'>
          <div className="item-list">
            {data.map((d, i) => (
              <div key={i} >
                <div class="card">
                  <div className='div-image-iten'>
                    <img
                      src={`http://localhost:3000/images/${d.Image[0]?.path}`}
                      alt={d.name}
                      className="item-image"
                    />
                  </div>
                  <h3>{d.name}</h3>
                  <p><strong>Preço: </strong>{d.price} kz</p>
                  <p><strong>Categoria: </strong>{d.categoria}</p>
                  <p><strong>Disponível:</strong> {d.disponivel}</p>

                  <div className="div-buttons-itens">
                    <Link to={`/Back-office/pages/item/update/${d.id}`} className="btn-iten edit"><MdOutlineEdit /></Link>
                    <button className="btn-iten delete" onClick={() => handleDelete(d.id)}><MdDeleteOutline /></button>
                  </div>

                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Modal show={showConfirmModal} onHide={() => setShowConfirmModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar Exclusão</Modal.Title>
        </Modal.Header>
        <Modal.Body>Tem certeza que deseja deletar este item?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowConfirmModal(false)}>Cancelar</Button>
          <Button variant="danger" onClick={confirmDelete}>Deletar</Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showSuccessModal} onHide={() => setShowSuccessModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Sucesso</Modal.Title>
        </Modal.Header>
        <Modal.Body>Item deletado com sucesso!</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => setShowSuccessModal(false)}>Ok</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Home;
